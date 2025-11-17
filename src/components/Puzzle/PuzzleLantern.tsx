import { useEffect, useRef, useState } from "react";

/**
 * LaserPuzzleGame.tsx
 *
 * - Grid: 20 x 12
 * - 3 mirrors (fixed orientations '/' or '\'), pushable by the hero (Sokoban-style)
 * - Source: scorpion.png at fixed pos, emits green grid-aligned laser to the right initially
 * - Hero: hero.png sprite (fallback circle)
 * - Crystal: crystal.png, rises / glows when laser hits
 * - Tailwind used for UI (buttons, layout). Canvas used for drawing.
 *
 * Controls:
 * - Arrow keys or WASD to move and push mirrors
 * - Reset button
 *
 * Notes:
 * - All coordinates are integers on grid cells
 * - Laser is grid-based (only cardinal directions): correct and stable
 */

const GRID_W = 20;
const GRID_H = 12;
const CELL = 48; // px per cell (tweak if you want bigger)
const CANVAS_W = GRID_W * CELL;
const CANVAS_H = GRID_H * CELL;

type Pos = { x: number; y: number };
type Mirror = { x: number; y: number; kind: "/" | "\\" };

const SOURCE: { pos: Pos; dir: Pos } = {
  pos: { x: 1, y: 6 },
  dir: { x: 1, y: 0 },
}; // scorpion -> right
const CRYSTAL_POS: Pos = { x: 18, y: 4 };

// initial hero + 3 mirrors
const INITIAL_HERO: Pos = { x: 4, y: 8 };
const INITIAL_MIRRORS: Mirror[] = [
  { x: 7, y: 6, kind: "/" },
  { x: 10, y: 4, kind: "\\" },
  { x: 13, y: 6, kind: "/" },
];

type Props = { onSolved?: () => void };

export function PuzzleLantern({ onSolved }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [heroCell, setHeroCell] = useState<Pos>({ ...INITIAL_HERO });
  const heroScreen = useRef<{ x: number; y: number }>({
    x: heroCell.x * CELL,
    y: heroCell.y * CELL,
  }); // for lerp
  const heroTargetRef = useRef<Pos>({ ...INITIAL_HERO });

  const [mirrors, setMirrors] = useState<Mirror[]>(() =>
    INITIAL_MIRRORS.map((m) => ({ ...m }))
  );
  const [attempts, setAttempts] = useState<number>(0);
  const solvedRef = useRef(false);
  const [solved, setSolved] = useState(false);

  // images
  const scorpionImg = useRef<HTMLImageElement | null>(null);
  const heroImg = useRef<HTMLImageElement | null>(null);
  const crystalImg = useRef<HTMLImageElement | null>(null);
  const imagesLoaded = useRef({ scorpion: false, hero: false, crystal: false });

  useEffect(() => {
    const s = new Image();
    s.src = "/scorpion.png";
    s.onload = () => {
      scorpionImg.current = s;
      imagesLoaded.current.scorpion = true;
    };
    s.onerror = () => {
      imagesLoaded.current.scorpion = false;
    };

    const h = new Image();
    h.src = "/hero.png";
    h.onload = () => {
      heroImg.current = h;
      imagesLoaded.current.hero = true;
    };
    h.onerror = () => {
      imagesLoaded.current.hero = false;
    };

    const c = new Image();
    c.src = "/crystal.png";
    c.onload = () => {
      crystalImg.current = c;
      imagesLoaded.current.crystal = true;
    };
    c.onerror = () => {
      imagesLoaded.current.crystal = false;
    };

    // keep refs assigned even if not loaded
    scorpionImg.current = scorpionImg.current ?? s;
    heroImg.current = heroImg.current ?? h;
    crystalImg.current = crystalImg.current ?? c;
  }, []);

  // helpers
  const inBounds = (p: Pos) =>
    p.x >= 0 && p.x < GRID_W && p.y >= 0 && p.y < GRID_H;
  const posEq = (a: Pos, b: Pos) => a.x === b.x && a.y === b.y;
  const mirrorAt = (p: Pos) => mirrors.find((m) => m.x === p.x && m.y === p.y);
  const cellFree = (p: Pos) =>
    inBounds(p) &&
    !mirrorAt(p) &&
    !posEq(p, SOURCE.pos) &&
    !posEq(p, CRYSTAL_POS);

  // grid-based beam trace: returns path (array of cell centers) and hit boolean
  function traceBeam(): { path: Pos[]; hit: boolean } {
    const path: Pos[] = [];
    let p = { ...SOURCE.pos };
    let dir = { ...SOURCE.dir };

    path.push({ ...p });
    const MAX_STEPS = 1000;
    for (let i = 0; i < MAX_STEPS; i++) {
      p = { x: p.x + dir.x, y: p.y + dir.y };
      path.push({ ...p });

      if (!inBounds(p)) break;
      if (posEq(p, CRYSTAL_POS)) return { path, hit: true };

      const m = mirrorAt(p);
      if (m) {
        // reflect rules (grid)
        if (m.kind === "/") {
          // "/" mapping: right->up, up->right, left->down, down->left
          if (dir.x === 1 && dir.y === 0) dir = { x: 0, y: -1 };
          else if (dir.x === 0 && dir.y === -1) dir = { x: 1, y: 0 };
          else if (dir.x === -1 && dir.y === 0) dir = { x: 0, y: 1 };
          else if (dir.x === 0 && dir.y === 1) dir = { x: -1, y: 0 };
        } else {
          // "\" mapping: right->down, down->right, left->up, up->left
          if (dir.x === 1 && dir.y === 0) dir = { x: 0, y: 1 };
          else if (dir.x === 0 && dir.y === 1) dir = { x: 1, y: 0 };
          else if (dir.x === -1 && dir.y === 0) dir = { x: 0, y: -1 };
          else if (dir.x === 0 && dir.y === -1) dir = { x: -1, y: 0 };
        }
        continue;
      }
      // else continue
    }
    return { path, hit: false };
  }

  // hero lerp params
  const LERP_SPEED = 0.18; // 0..1, higher = faster

  // draw loop
  useEffect(() => {
    const canvas = canvasRef.current!;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let raf = 0;
    let last = performance.now();
    let crystalRise = 0; // 0..1 animation progress when solved
    function draw(now: number) {
      const dt = now - last;
      last = now;

      // LERP heroScreen towards heroCell
      const targetX = heroCell.x * CELL;
      const targetY = heroCell.y * CELL;
      heroScreen.current.x +=
        (targetX - heroScreen.current.x) * Math.min(1, LERP_SPEED * (dt / 16));
      heroScreen.current.y +=
        (targetY - heroScreen.current.y) * Math.min(1, LERP_SPEED * (dt / 16));
      // clear
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // background gradient
      const g = ctx.createLinearGradient(0, 0, 0, canvas.height);
      g.addColorStop(0, "#051323");
      g.addColorStop(1, "#071a22");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // subtle grid
      ctx.strokeStyle = "rgba(255,255,255,0.03)";
      ctx.lineWidth = 1;
      for (let i = 0; i <= GRID_W; i++) {
        ctx.beginPath();
        ctx.moveTo(i * CELL, 0);
        ctx.lineTo(i * CELL, CANVAS_H);
        ctx.stroke();
      }
      for (let j = 0; j <= GRID_H; j++) {
        ctx.beginPath();
        ctx.moveTo(0, j * CELL);
        ctx.lineTo(CANVAS_W, j * CELL);
        ctx.stroke();
      }

      // draw scorpion (source)
      const scX = SOURCE.pos.x * CELL;
      const scY = SOURCE.pos.y * CELL;
      if (
        imagesLoaded.current.scorpion &&
        scorpionImg.current &&
        scorpionImg.current.complete
      ) {
        const size = CELL * 0.9;
        ctx.drawImage(
          scorpionImg.current,
          scX + (CELL - size) / 2,
          scY + (CELL - size) / 2,
          size,
          size
        );
      } else {
        // fallback small green circle + arrow
        const cx = scX + CELL / 2,
          cy = scY + CELL / 2;
        ctx.beginPath();
        ctx.fillStyle = "#6ee7b7";
        ctx.shadowColor = "rgba(110,231,183,0.5)";
        ctx.shadowBlur = 14;
        ctx.arc(cx, cy, CELL * 0.22, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.fillStyle = "#033627";
        ctx.beginPath();
        ctx.moveTo(cx + 12, cy);
        ctx.lineTo(cx - 6, cy - 6);
        ctx.lineTo(cx - 6, cy + 6);
        ctx.fill();
      }

      // draw mirrors (glow + line)
      mirrors.forEach((m) => {
        const cx = m.x * CELL + CELL / 2;
        const cy = m.y * CELL + CELL / 2;
        // glow
        ctx.beginPath();
        ctx.fillStyle = "rgba(160,180,200,0.04)";
        ctx.arc(cx, cy, CELL * 0.45, 0, Math.PI * 2);
        ctx.fill();
        // mirror stroke
        ctx.save();
        ctx.translate(cx, cy);
        ctx.lineWidth = 6;
        ctx.strokeStyle = "#9aa4b2";
        ctx.beginPath();
        if (m.kind === "/") {
          ctx.moveTo(-CELL * 0.25, CELL * 0.25);
          ctx.lineTo(CELL * 0.25, -CELL * 0.25);
        } else {
          ctx.moveTo(-CELL * 0.25, -CELL * 0.25);
          ctx.lineTo(CELL * 0.25, CELL * 0.25);
        }
        ctx.stroke();
        ctx.restore();
      });

      // draw crystal (with rise animation if solved)
      const cryBaseX = CRYSTAL_POS.x * CELL + CELL / 2;
      const cryBaseY = CRYSTAL_POS.y * CELL + CELL / 2;
      if (solvedRef.current) {
        crystalRise = Math.min(1, crystalRise + dt / 700); // ~700ms rise
      } else {
        crystalRise = Math.max(0, crystalRise - dt / 400);
      }
      const cryY = cryBaseY - crystalRise * CELL * 0.9;
      if (
        imagesLoaded.current.crystal &&
        crystalImg.current &&
        crystalImg.current.complete
      ) {
        const size = CELL * 0.9;
        ctx.drawImage(
          crystalImg.current,
          cryBaseX - size / 2,
          cryY - size / 2,
          size,
          size
        );
      } else {
        ctx.save();
        ctx.translate(cryBaseX, cryY);
        ctx.rotate((45 * Math.PI) / 180);
        ctx.fillStyle = solvedRef.current ? "#dff7dd" : "#cde7ff";
        ctx.shadowColor = solvedRef.current
          ? "rgba(160,230,140,0.6)"
          : "rgba(120,170,255,0.12)";
        ctx.shadowBlur = solvedRef.current ? 20 : 6;
        ctx.fillRect(-CELL * 0.18, -CELL * 0.18, CELL * 0.36, CELL * 0.36);
        ctx.restore();
        ctx.shadowBlur = 0;
      }

      // draw hero (lerped position)
      const heroPx = heroScreen.current.x;
      const heroPy = heroScreen.current.y;
      if (
        imagesLoaded.current.hero &&
        heroImg.current &&
        heroImg.current.complete
      ) {
        const size = CELL * 0.9;
        ctx.drawImage(
          heroImg.current,
          heroPx + (CELL - size) / 2,
          heroPy + (CELL - size) / 2,
          size,
          size
        );
      } else {
        const hc = { x: heroPx + CELL / 2, y: heroPy + CELL / 2 };
        ctx.beginPath();
        ctx.fillStyle = "#fde68a";
        ctx.shadowColor = "rgba(253,230,138,0.4)";
        ctx.shadowBlur = 8;
        ctx.arc(hc.x, hc.y, CELL * 0.28, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // trace beam & draw green laser with glow
      const { path, hit } = traceBeam();
      ctx.beginPath();
      ctx.lineWidth = 4.5;
      ctx.strokeStyle = hit ? "#b4fca2" : "#78ffb3";
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.shadowColor = hit
        ? "rgba(180,252,162,0.65)"
        : "rgba(120,255,180,0.35)";
      ctx.shadowBlur = 14;
      for (let i = 0; i < path.length; i++) {
        const p = path[i];
        const px = p.x * CELL + CELL / 2;
        const py = p.y * CELL + CELL / 2;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.stroke();
      ctx.shadowBlur = 0;

      // small glowing nodes on beam centers
      ctx.fillStyle = hit ? "#f4fff8" : "#e6fff0";
      for (let i = 0; i < path.length; i++) {
        const p = path[i];
        const px = p.x * CELL + CELL / 2;
        const py = p.y * CELL + CELL / 2;
        ctx.beginPath();
        ctx.arc(px, py, 2.5, 0, Math.PI * 2);
        ctx.fill();
      }

      // // HUD text
      // ctx.fillStyle = "rgba(255,255,255,0.92)";
      // ctx.font = "13px Inter, system-ui, sans-serif";
      // ctx.fillText(`Attempts: ${attempts}`, 10, 18);
      // // status
      // ctx.fillStyle = solvedRef.current ? "#b4fca2" : "rgba(147,197,253,0.9)";
      // ctx.fillText(solvedRef.current ? "Solved" : "Playing", 10, 36);

      // solved detection once
      if (hit) {
        if (!solvedRef.current) {
          solvedRef.current = true;
          setSolved(true);
          setTimeout(() => onSolved?.(), 700);
        }
      } else {
        if (solvedRef.current) {
          solvedRef.current = false;
          setSolved(false);
        }
      }

      raf = requestAnimationFrame(draw);
    }

    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, [mirrors, heroCell, attempts, onSolved]);

  // movement + push (arrow keys / WASD)
  useEffect(() => {
    const onKey = (ev: KeyboardEvent) => {
      let dir: Pos | null = null;
      if (ev.key === "ArrowUp" || ev.key === "w" || ev.key === "W")
        dir = { x: 0, y: -1 };
      else if (ev.key === "ArrowDown" || ev.key === "s" || ev.key === "S")
        dir = { x: 0, y: 1 };
      else if (ev.key === "ArrowLeft" || ev.key === "a" || ev.key === "A")
        dir = { x: -1, y: 0 };
      else if (ev.key === "ArrowRight" || ev.key === "d" || ev.key === "D")
        dir = { x: 1, y: 0 };
      else return;

      ev.preventDefault();
      if (!dir) return;

      const next = { x: heroCell.x + dir.x, y: heroCell.y + dir.y };
      if (!inBounds(next)) return;
      // can't step on source or crystal
      if (posEq(next, SOURCE.pos) || posEq(next, CRYSTAL_POS)) return;

      const m = mirrorAt(next);
      if (!m) {
        // move hero
        heroTargetRef.current = next;
        setHeroCell(next);
        setAttempts((a) => a + 1);
      } else {
        // try push
        const pushTo = { x: m.x + dir.x, y: m.y + dir.y };
        if (!inBounds(pushTo)) return;
        if (!cellFree(pushTo)) return;
        setMirrors((prev) =>
          prev.map((mm) =>
            mm.x === m.x && mm.y === m.y
              ? { ...mm, x: pushTo.x, y: pushTo.y }
              : mm
          )
        );
        heroTargetRef.current = next;
        setHeroCell(next);
        setAttempts((a) => a + 1);
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [heroCell, mirrors]);

  // Reset button
  const reset = () => {
    setMirrors(INITIAL_MIRRORS.map((m) => ({ ...m })));
    setHeroCell({ ...INITIAL_HERO });
    heroScreen.current = { x: INITIAL_HERO.x * CELL, y: INITIAL_HERO.y * CELL };
    heroTargetRef.current = { ...INITIAL_HERO };
    setAttempts(0);
    solvedRef.current = false;
    setSolved(false);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center gap-3">
      <div className="flex flex-col items-center justify-center mb-4 gap-3">
        <h3 className="text-2xl md:text-3xl font-semibold text-amber-100">
          🔆 Push mirrors to guide the green beam to the crystal
        </h3>
        <p className="text-sm text-slate-300 mt-1">Move with Arrows / WASD</p>

        <div className="flex items-center gap-3">
          <button
            onClick={reset}
            className="px-3 py-1 rounded bg-amber-600 hover:bg-amber-500 text-shadow-white font-medium cursor-pointer"
          >
            Restart
          </button>
          {/* <div className="text-sm text-slate-300">
              Attempts:{" "}
              <span className="font-medium text-white">{attempts}</span>
            </div>
            <div
              className={`px-2 py-1 rounded ${
                solved
                  ? "bg-green-700 text-green-100"
                  : "bg-slate-700 text-slate-200"
              }`}
            >
              {solved ? "Solved" : "Playing"}
            </div> */}
        </div>
      </div>

      <div className="bg-slate-900/60 rounded-xl p-2 inline-block shadow-xl border border-slate-800">
        <canvas
          ref={canvasRef}
          width={CANVAS_W}
          height={CANVAS_H}
          className="block rounded-md w-full h-auto"
          style={{ aspectRatio: `${CANVAS_W}/${CANVAS_H}` }}
        />
      </div>
    </div>
  );
}
