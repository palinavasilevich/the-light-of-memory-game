import React, { useCallback, useEffect, useRef, useState } from "react";

/**
 * LaserPuzzle.tsx
 *
 * Grid laser puzzle (10x10) — React + TypeScript + Canvas.
 *
 * Controls:
 * - Arrow keys or WASD to move hero and push mirrors
 * - Buttons: Reset, Hint
 *
 * Grid coords: (0,0) top-left. x grows right, y grows down.
 *
 * Initial layout (chosen):
 * - Source (moon) at (0,5) pointing right
 * - Crystal at (9,3)
 * - Hero at (3,6)
 * - Mirrors:
 *    { x:4,y:5, type: "/" }
 *    { x:5,y:4, type: "\" }
 *    { x:6,y:3, type: "/" }
 */

type Pos = { x: number; y: number };
type Mirror = { x: number; y: number; type: "/" | "\\" };

const GRID_W = 10;
const GRID_H = 10;
const CELL = 60; // px cell size
const CANVAS_W = GRID_W * CELL;
const CANVAS_H = GRID_H * CELL;

const source = { pos: { x: 0, y: 5 }, dir: { x: 1, y: 0 } }; // starts pointing right
const crystalPos = { x: 9, y: 3 };
const initialHero = { x: 3, y: 6 };
const initialMirrors: Mirror[] = [
  { x: 4, y: 5, type: "/" },
  { x: 5, y: 4, type: "\\" },
  { x: 6, y: 3, type: "/" },
];

const DIRS: Record<string, Pos> = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
};

function inBounds(p: Pos) {
  return p.x >= 0 && p.x < GRID_W && p.y >= 0 && p.y < GRID_H;
}

function posEq(a: Pos, b: Pos) {
  return a.x === b.x && a.y === b.y;
}

// reflect mapping for grid directions (cardinal) when hitting mirror types
const reflectMap: Record<string, Record<string, Pos>> = {
  "/": {
    "1,0": { x: 0, y: -1 }, // right -> up
    "0,-1": { x: 1, y: 0 }, // up -> right
    "-1,0": { x: 0, y: 1 }, // left -> down
    "0,1": { x: -1, y: 0 }, // down -> left
  },
  "\\": {
    "1,0": { x: 0, y: 1 }, // right -> down
    "0,1": { x: 1, y: 0 }, // down -> right
    "-1,0": { x: 0, y: -1 }, // left -> up
    "0,-1": { x: -1, y: 0 }, // up -> left
  },
};

type Props = {
  onSolved: () => void;
};

export function PuzzleLantern({ onSolved }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [mirrors, setMirrors] = useState<Mirror[]>(() =>
    initialMirrors.map((m) => ({ ...m }))
  );
  const [hero, setHero] = useState<Pos>(() => ({ ...initialHero }));
  const [attempts, setAttempts] = useState<number>(0);
  const [solved, setSolved] = useState<boolean>(false);

  // find mirror at cell
  const mirrorAt = useCallback(
    (p: Pos) => mirrors.find((m) => m.x === p.x && m.y === p.y),
    [mirrors]
  );

  // whether a cell is free for pushing/moving (not mirror, not source, not crystal)
  const cellFree = useCallback(
    (p: Pos) => {
      if (!inBounds(p)) return false;
      if (p.x === source.pos.x && p.y === source.pos.y) return false;
      if (p.x === crystalPos.x && p.y === crystalPos.y) return false;
      if (mirrorAt(p)) return false;
      return true;
    },
    [mirrorAt]
  );

  // compute beam path discrete (grid steps). returns array of positions (cells) and hit boolean
  const computeBeam = useCallback(() => {
    const path: Pos[] = [];
    let pos = { ...source.pos };
    let dir = { ...source.dir };
    path.push({ ...pos });

    const MAX_STEPS = 500;
    for (let step = 0; step < MAX_STEPS; step++) {
      pos = { x: pos.x + dir.x, y: pos.y + dir.y };
      path.push({ ...pos });

      if (!inBounds(pos)) break;

      // hit crystal?
      if (posEq(pos, crystalPos)) {
        return { path, hit: true };
      }

      // hit mirror?
      const m = mirrorAt(pos);
      if (m) {
        const key = `${dir.x},${dir.y}`;
        const mapping = reflectMap[m.type][key];
        if (!mapping) {
          // if direction not covered (shouldn't happen), stop
          break;
        }
        dir = { ...mapping };
        continue;
      }

      // else continue
    }

    return { path, hit: false };
  }, [mirrorAt]);

  // draw loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;

    const draw = () => {
      // clear
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // background
      const bg = ctx.createLinearGradient(0, 0, 0, canvas.height);
      bg.addColorStop(0, "#071127");
      bg.addColorStop(1, "#071a22");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // grid
      ctx.strokeStyle = "rgba(255,255,255,0.03)";
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

      // draw source (moon) with arrow
      const srcCX = source.pos.x * CELL + CELL / 2;
      const srcCY = source.pos.y * CELL + CELL / 2;
      ctx.beginPath();
      ctx.fillStyle = "#7dd3fc";
      ctx.shadowColor = "rgba(125,211,252,0.6)";
      ctx.shadowBlur = 14;
      ctx.arc(srcCX, srcCY, CELL * 0.2, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
      // arrow
      ctx.fillStyle = "#022627";
      ctx.beginPath();
      // small triangle pointing right
      ctx.moveTo(srcCX + 12, srcCY);
      ctx.lineTo(srcCX - 6, srcCY - 6);
      ctx.lineTo(srcCX - 6, srcCY + 6);
      ctx.fill();

      // draw crystal
      const cryCX = crystalPos.x * CELL + CELL / 2;
      const cryCY = crystalPos.y * CELL + CELL / 2;
      ctx.save();
      ctx.translate(cryCX, cryCY);
      ctx.rotate((45 * Math.PI) / 180);
      ctx.fillStyle = solved ? "#fff1b8" : "#cde7ff";
      ctx.shadowColor = solved
        ? "rgba(255,215,120,0.6)"
        : "rgba(120,170,255,0.12)";
      ctx.shadowBlur = solved ? 20 : 6;
      ctx.fillRect(-CELL * 0.18, -CELL * 0.18, CELL * 0.36, CELL * 0.36);
      ctx.restore();
      ctx.shadowBlur = 0;

      // draw mirrors
      mirrors.forEach((m) => {
        const cx = m.x * CELL + CELL / 2;
        const cy = m.y * CELL + CELL / 2;
        ctx.save();
        ctx.translate(cx, cy);
        ctx.lineWidth = 6;
        ctx.strokeStyle = "#9aa4b2";
        ctx.beginPath();
        if (m.type === "/") {
          ctx.moveTo(-CELL * 0.25, CELL * 0.25);
          ctx.lineTo(CELL * 0.25, -CELL * 0.25);
        } else {
          ctx.moveTo(-CELL * 0.25, -CELL * 0.25);
          ctx.lineTo(CELL * 0.25, CELL * 0.25);
        }
        ctx.stroke();
        ctx.restore();
      });

      // draw hero
      const heroCX = hero.x * CELL + CELL / 2;
      const heroCY = hero.y * CELL + CELL / 2;
      ctx.beginPath();
      ctx.fillStyle = "#fde68a";
      ctx.shadowColor = "rgba(253,230,138,0.4)";
      ctx.shadowBlur = 8;
      ctx.arc(heroCX, heroCY, CELL * 0.26, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      // beam
      const { path, hit } = computeBeam();
      ctx.beginPath();
      ctx.lineWidth = 4;
      ctx.strokeStyle = hit ? "#fff5b3" : "rgba(255,230,160,0.9)";
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.shadowColor = "rgba(255,220,120,0.35)";
      ctx.shadowBlur = 10;
      for (let i = 0; i < path.length; i++) {
        const p = path[i];
        const px = p.x * CELL + CELL / 2;
        const py = p.y * CELL + CELL / 2;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.stroke();
      ctx.shadowBlur = 0;

      // small nodes
      ctx.fillStyle = "#fff7d6";
      for (let i = 0; i < path.length; i++) {
        const p = path[i];
        const px = p.x * CELL + CELL / 2;
        const py = p.y * CELL + CELL / 2;
        ctx.beginPath();
        ctx.arc(px, py, 3, 0, Math.PI * 2);
        ctx.fill();
      }

      // HUD: attempts and instructions
      ctx.fillStyle = "rgba(255,255,255,0.9)";
      ctx.font = "14px Inter, system-ui, sans-serif";
      // ctx.fillText(`Attempts: ${attempts}`, 10, 18);
      ctx.fillStyle = "rgba(255,255,255,0.6)";
      // ctx.font = "12px Inter, system-ui, sans-serif";
      // ctx.fillText(`Move: Arrows / WASD — Push mirrors`, 10, 36);

      // solved tag
      if (hit) {
        setSolved(true);
        onSolved();
      } else {
        setSolved(false);
      }

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, [mirrors, hero, attempts, computeBeam, solved, onSolved]);

  // movement + push logic
  useEffect(() => {
    const onKey = (ev: KeyboardEvent) => {
      const key = ev.key;
      let dir: Pos | null = null;
      if (key === "ArrowUp" || key === "w" || key === "W") dir = DIRS.up;
      else if (key === "ArrowDown" || key === "s" || key === "S")
        dir = DIRS.down;
      else if (key === "ArrowLeft" || key === "a" || key === "A")
        dir = DIRS.left;
      else if (key === "ArrowRight" || key === "d" || key === "D")
        dir = DIRS.right;
      else return;

      ev.preventDefault();
      if (dir) {
        const next = { x: hero.x + dir.x, y: hero.y + dir.y };
        if (!inBounds(next)) return;
        // cannot step onto source or crystal
        if (posEq(next, source.pos) || posEq(next, crystalPos)) return;
        const m = mirrorAt(next);
        if (!m) {
          // free => move
          setHero(next);
        } else {
          // try push
          const pushTo = { x: m.x + dir.x, y: m.y + dir.y };
          if (!inBounds(pushTo)) return;
          if (!cellFree(pushTo)) return;
          // perform push
          setMirrors((prev) =>
            prev.map((mm) =>
              mm.x === m.x && mm.y === m.y
                ? { ...mm, x: pushTo.x, y: pushTo.y }
                : mm
            )
          );
          setHero(next);
        }
        setAttempts((a) => a + 1);
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [hero, mirrorAt, cellFree]);

  // Reset and hint
  const reset = () => {
    setMirrors(initialMirrors.map((m) => ({ ...m })));
    setHero({ ...initialHero });
    setAttempts(0);
    setSolved(false);
  };

  // const hint = () => {
  //   // set a working configuration (keeps same for now)
  //   setMirrors([
  //     { x: 4, y: 5, type: "/" },
  //     { x: 5, y: 4, type: "\\" },
  //     { x: 6, y: 3, type: "/" },
  //   ]);
  //   setAttempts((a) => a + 1);
  // };

  return (
    <div className="inline-block select-none">
      <div className="relative flex flex-col items-center text-amber-100 p-4">
        <h3 className="text-xl font-semibold mb-2">
          🔆 Direct the moonlight to the altar
        </h3>
        <h3 className="text-xl font-semibold mb-2">
          Move: Arrows / WASD — Push mirrors
        </h3>
        {/* <p className="mb-2 text-sm text-amber-300">
          Attempts: {attempts}
        </p> */}

        <button
          onClick={reset}
          className="px-3 py-1 rounded bg-amber-600 cursor-pointer"
        >
          Restart game
        </button>
        {/* <button onClick={hint} style={btnStyle}>
          Hint
        </button> */}
        {/* <div style={{ color: "white", alignSelf: "center", marginLeft: 8 }}>
          Attempts: {attempts}
        </div> */}
        {/* <div
          style={{
            color: solved ? "#fde68a" : "#93c5fd",
            marginLeft: 12,
            alignSelf: "center",
          }}
        >
          Status: {solved ? "Solved" : "Playing"}
        </div> */}
      </div>

      <canvas
        ref={canvasRef}
        width={CANVAS_W}
        height={CANVAS_H}
        style={{
          width: CANVAS_W,
          height: CANVAS_H,
          borderRadius: 12,
          display: "block",
          boxShadow: "0 12px 30px rgba(2,6,23,0.7)",
        }}
      />
    </div>
  );
}

// const btnStyle: React.CSSProperties = {
//   background: "#0ea5a6",
//   color: "white",
//   border: "none",
//   padding: "8px 12px",
//   borderRadius: 8,
//   cursor: "pointer",
//   boxShadow: "0 6px 14px rgba(14,165,166,0.14)",
// };
