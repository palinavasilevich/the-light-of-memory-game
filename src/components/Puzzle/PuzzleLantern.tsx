import { useEffect, useRef, useState } from "react";

import heroSrc from "../../assets/images/batmanSprites.png";
import scorpionSrc from "../../assets/images/puzzleScorpion.png";
import crystalSrc from "../../assets/images/puzzleCrystal.png";

const GRID_W = 20;
const GRID_H = 12;
const CELL = 72; // 48
const CANVAS_W = GRID_W * CELL;
const CANVAS_H = GRID_H * CELL;

type Pos = { x: number; y: number };
type Mirror = { x: number; y: number; kind: "/" | "\\" };

const SOURCE: { pos: Pos; dir: Pos } = {
  pos: { x: 1, y: 6 },
  dir: { x: 1, y: 0 },
};
const CRYSTAL_POS: Pos = { x: 18, y: 4 };

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
  const heroTarget = useRef<Pos>({ ...INITIAL_HERO });
  const heroScreen = useRef<{ x: number; y: number }>({
    x: INITIAL_HERO.x * CELL,
    y: INITIAL_HERO.y * CELL,
  });

  const [mirrors, setMirrors] = useState<Mirror[]>(() =>
    INITIAL_MIRRORS.map((m) => ({ ...m }))
  );
  const [attempts, setAttempts] = useState<number>(0);
  const solvedRef = useRef(false);
  const [solved, setSolved] = useState(false);

  // Images
  const scorpionImg = useRef<HTMLImageElement | null>(null);
  const heroImg = useRef<HTMLImageElement | null>(null);
  const crystalImg = useRef<HTMLImageElement | null>(null);
  const imagesLoaded = useRef({ scorpion: false, hero: false, crystal: false });

  // Sprite animation refs
  const heroFrame = useRef(0);
  const frameTimer = useRef(0);
  const heroDir = useRef<"down" | "up" | "left" | "right">("down");
  const FRAMES_COUNT = 18;
  const FRAME_INTERVAL = 150;

  const LERP_SPEED = 0.18;

  useEffect(() => {
    const s = new Image();
    s.src = scorpionSrc;
    s.onload = () => {
      scorpionImg.current = s;
      imagesLoaded.current.scorpion = true;
    };
    const h = new Image();
    h.src = heroSrc;
    h.onload = () => {
      heroImg.current = h;
      imagesLoaded.current.hero = true;
    };
    const c = new Image();
    c.src = crystalSrc;
    c.onload = () => {
      crystalImg.current = c;
      imagesLoaded.current.crystal = true;
    };
  }, []);

  const inBounds = (p: Pos) =>
    p.x >= 0 && p.x < GRID_W && p.y >= 0 && p.y < GRID_H;
  const posEq = (a: Pos, b: Pos) => a.x === b.x && a.y === b.y;
  const mirrorAt = (p: Pos) => mirrors.find((m) => m.x === p.x && m.y === p.y);
  const cellFree = (p: Pos) =>
    inBounds(p) &&
    !mirrorAt(p) &&
    !posEq(p, SOURCE.pos) &&
    !posEq(p, CRYSTAL_POS);

  function traceBeam(): { path: Pos[]; hit: boolean } {
    const path: Pos[] = [];
    let p = { ...SOURCE.pos };
    let dir = { ...SOURCE.dir };
    path.push({ ...p });

    for (let i = 0; i < 1000; i++) {
      p = { x: p.x + dir.x, y: p.y + dir.y };
      path.push({ ...p });
      if (!inBounds(p)) break;
      if (posEq(p, CRYSTAL_POS)) return { path, hit: true };
      const m = mirrorAt(p);
      if (m) {
        if (m.kind === "/") {
          if (dir.x === 1 && dir.y === 0) dir = { x: 0, y: -1 };
          else if (dir.x === 0 && dir.y === -1) dir = { x: 1, y: 0 };
          else if (dir.x === -1 && dir.y === 0) dir = { x: 0, y: 1 };
          else if (dir.x === 0 && dir.y === 1) dir = { x: -1, y: 0 };
        } else {
          if (dir.x === 1 && dir.y === 0) dir = { x: 0, y: 1 };
          else if (dir.x === 0 && dir.y === 1) dir = { x: 1, y: 0 };
          else if (dir.x === -1 && dir.y === 0) dir = { x: 0, y: -1 };
          else if (dir.x === 0 && dir.y === -1) dir = { x: -1, y: 0 };
        }
      }
    }
    return { path, hit: false };
  }

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let raf = 0;
    let last = performance.now();
    let crystalRise = 0;

    function draw(now: number) {
      const dt = now - last;
      last = now;

      // LERP hero
      const targetX = heroTarget.current.x * CELL;
      const targetY = heroTarget.current.y * CELL;
      const dx = targetX - heroScreen.current.x;
      const dy = targetY - heroScreen.current.y;

      heroScreen.current.x += dx * Math.min(1, LERP_SPEED * (dt / 16));
      heroScreen.current.y += dy * Math.min(1, LERP_SPEED * (dt / 16));

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // background
      const g = ctx.createLinearGradient(0, 0, 0, canvas.height);
      g.addColorStop(0, "#051323");
      g.addColorStop(1, "#071a22");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // grid
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

      // scorpion
      const scX = SOURCE.pos.x * CELL;
      const scY = SOURCE.pos.y * CELL;
      if (imagesLoaded.current.scorpion && scorpionImg.current?.complete) {
        const size = CELL * 1.2;
        ctx.drawImage(
          scorpionImg.current,
          scX + (CELL - size) / 2,
          // scY + (CELL - size) / 2,
          scY + (CELL - size) * -0.5,
          size,
          size
        );
      }

      // mirrors
      mirrors.forEach((m) => {
        const cx = m.x * CELL + CELL / 2;
        const cy = m.y * CELL + CELL / 2;
        ctx.beginPath();
        ctx.fillStyle = "rgba(160,180,200,0.04)";
        ctx.arc(cx, cy, CELL * 0.45, 0, Math.PI * 2);
        ctx.fill();
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

      // crystal
      const cryBaseX = CRYSTAL_POS.x * CELL + CELL / 2;
      const cryBaseY = CRYSTAL_POS.y * CELL + CELL / 2;
      crystalRise = solvedRef.current
        ? Math.min(1, crystalRise + dt / 700)
        : Math.max(0, crystalRise - dt / 400);
      const cryY = cryBaseY - crystalRise * CELL * 0.9;
      if (imagesLoaded.current.crystal && crystalImg.current?.complete) {
        const size = CELL * 0.9;
        ctx.drawImage(
          crystalImg.current,
          cryBaseX - size / 2,
          cryY - size / 2,
          size,
          size
        );
      }

      // hero
      const heroPx = heroScreen.current.x;
      const heroPy = heroScreen.current.y;
      if (imagesLoaded.current.hero && heroImg.current?.complete) {
        if (Math.abs(dx) > 0.5 || Math.abs(dy) > 0.5) {
          frameTimer.current += dt;
          if (frameTimer.current > FRAME_INTERVAL) {
            heroFrame.current = (heroFrame.current + 1) % FRAMES_COUNT;
            frameTimer.current = 0;
          }
        } else {
          heroFrame.current = 0;
          frameTimer.current = 0;
        }
        const frameWidth = heroImg.current.width / FRAMES_COUNT;
        const frameHeight = heroImg.current.height;
        const heroSize = CELL * 1.2;
        ctx.drawImage(
          heroImg.current,
          frameWidth * heroFrame.current,
          0,
          frameWidth,
          frameHeight,
          heroPx + (CELL - heroSize) / 2,
          heroPy + (CELL - heroSize) / 2,
          heroSize,
          heroSize
        );
      }

      // laser
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
      ctx.fillStyle = hit ? "#f4fff8" : "#e6fff0";
      for (let i = 0; i < path.length; i++) {
        const p = path[i];
        const px = p.x * CELL + CELL / 2;
        const py = p.y * CELL + CELL / 2;
        ctx.beginPath();
        ctx.arc(px, py, 2.5, 0, Math.PI * 2);
        ctx.fill();
      }

      if (hit && !solvedRef.current) {
        solvedRef.current = true;
        setSolved(true);
        setTimeout(() => onSolved?.(), 700);
      } else if (!hit && solvedRef.current) {
        solvedRef.current = false;
        setSolved(false);
      }

      raf = requestAnimationFrame(draw);
    }

    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, [mirrors, heroCell, attempts, onSolved]);

  useEffect(() => {
    const onKey = (ev: KeyboardEvent) => {
      let dir: Pos | null = null;
      if (ev.key === "ArrowUp" || ev.key === "w" || ev.key === "W") {
        dir = { x: 0, y: -1 };
        heroDir.current = "up";
      } else if (ev.key === "ArrowDown" || ev.key === "s" || ev.key === "S") {
        dir = { x: 0, y: 1 };
        heroDir.current = "down";
      } else if (ev.key === "ArrowLeft" || ev.key === "a" || ev.key === "A") {
        dir = { x: -1, y: 0 };
        heroDir.current = "left";
      } else if (ev.key === "ArrowRight" || ev.key === "d" || ev.key === "D") {
        dir = { x: 1, y: 0 };
        heroDir.current = "right";
      } else return;

      ev.preventDefault();
      if (!dir) return;

      const next = { x: heroCell.x + dir.x, y: heroCell.y + dir.y };
      if (!inBounds(next)) return;
      if (posEq(next, SOURCE.pos) || posEq(next, CRYSTAL_POS)) return;

      const m = mirrorAt(next);
      if (!m) {
        heroTarget.current = next;
        setHeroCell(next);
        setAttempts((a) => a + 1);
      } else {
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
        heroTarget.current = next;
        setHeroCell(next);
        setAttempts((a) => a + 1);
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [heroCell, mirrors]);

  const reset = () => {
    setMirrors(INITIAL_MIRRORS.map((m) => ({ ...m })));
    setHeroCell({ ...INITIAL_HERO });
    heroTarget.current = { ...INITIAL_HERO };
    heroScreen.current = { x: INITIAL_HERO.x * CELL, y: INITIAL_HERO.y * CELL };
    setAttempts(0);
    solvedRef.current = false;
    setSolved(false);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center gap-3">
      <div className="flex flex-col items-center justify-center mb-4 gap-3">
        <h2 className="text-3xl md:text-3xl font-semibold text-amber-100">
          🔆 Point the green beam at the crystal to activate the mechanism
        </h2>
        <p className="text-md text-slate-300 mt-1">
          Move using the arrow keys or WASD
        </p>
        <div className="flex items-center gap-3">
          <button
            onClick={reset}
            className="px-3 py-1 rounded bg-amber-600 hover:bg-amber-500 text-shadow-white font-medium cursor-pointer"
          >
            Restart
          </button>
        </div>
      </div>

      <div className="bg-slate-900/60 rounded-xl inline-block shadow-xl border border-slate-800">
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
