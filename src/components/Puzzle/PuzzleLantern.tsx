import React, {
  useState,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  onSolved?: () => void;
};

export const PuzzleLantern: React.FC<Props> = ({ onSolved }) => {
  const [angles, setAngles] = useState([0, 0, 0]); // углы зеркал
  const [attempts, setAttempts] = useState(0);
  const [isSolved, setIsSolved] = useState(false);
  const completedRef = useRef(false);

  const rotateMirror = useCallback((index: number, step = 45) => {
    setAngles((prev) => {
      const next = [...prev];
      next[index] = (next[index] + step) % 360;
      return next;
    });
    setAttempts((a) => a + 1);
  }, []);

  // Параметры сцены
  const mirrors = useMemo(
    () => [
      { x: 200, y: 140, angle: angles[0] },
      { x: 360, y: 200, angle: angles[1] },
      { x: 520, y: 140, angle: angles[2] },
    ],
    [angles]
  );
  const start = { x: 80, y: 300 };
  const altar = { x: 650, y: 160, r: 20 };

  // Трассировка луча
  const beamPath = useMemo(() => {
    let pos = { ...start };
    let dir = {
      x: Math.cos((-45 * Math.PI) / 180),
      y: -Math.sin((-45 * Math.PI) / 180),
    };
    const path = [`M ${pos.x} ${pos.y}`];

    for (const m of mirrors) {
      const dx = m.x - pos.x;
      const dy = m.y - pos.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      pos = { x: m.x, y: m.y };
      path.push(`L ${pos.x} ${pos.y}`);

      // отражение по нормали прямоугольного зеркала
      const normal = {
        x: Math.cos((m.angle + 90) * (Math.PI / 180)),
        y: Math.sin((m.angle + 90) * (Math.PI / 180)),
      };
      const dot = dir.x * normal.x + dir.y * normal.y;
      dir = { x: dir.x - 2 * dot * normal.x, y: dir.y - 2 * dot * normal.y };
    }

    const end = { x: pos.x + dir.x * 300, y: pos.y + dir.y * 300 };
    path.push(`L ${end.x} ${end.y}`);
    return { d: path.join(" "), end };
  }, [angles, mirrors]);

  // Проверка попадания в алтарь
  useEffect(() => {
    const dx = beamPath.end.x - altar.x;
    const dy = beamPath.end.y - altar.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const hit = dist < altar.r * 1.5;

    if (hit && !completedRef.current) {
      completedRef.current = true;
      setIsSolved(true);
      setTimeout(() => onSolved?.(), 1200);
    } else if (!hit) {
      setIsSolved(false);
      completedRef.current = false;
    }
  }, [beamPath, altar, onComplete]);

  const [pulse, setPulse] = useState(false);
  useEffect(() => {
    setPulse(true);
    const t = setTimeout(() => setPulse(false), 200);
    return () => clearTimeout(t);
  }, [angles]);

  return (
    <div className="relative flex flex-col items-center text-amber-100 p-4">
      <h3 className="text-xl font-semibold mb-2">🔆 Направь свет к алтарю</h3>
      <div className="mb-2 text-sm text-amber-300">Попытки: {attempts}</div>

      <div
        className="relative bg-gray-900 border-2 border-amber-700 rounded-md overflow-hidden"
        style={{ width: 700, height: 380 }}
      >
        <svg
          width="700"
          height="380"
          className="absolute inset-0 pointer-events-none"
        >
          <motion.path
            key={beamPath.d}
            d={beamPath.d}
            stroke={isSolved ? "#fff5b3" : pulse ? "#fff7cc" : "#ffe9a870"}
            strokeWidth={3.5}
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.6 }}
            strokeLinecap="round"
            style={{ filter: "drop-shadow(0 0 10px rgba(255,220,120,0.7))" }}
          />
        </svg>

        {/* Источник света */}
        <motion.div
          className="absolute left-[60px] top-[280px] flex flex-col items-center"
          animate={{ opacity: [0.9, 1, 0.9], scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 1.6 }}
        >
          <div className="w-8 h-8 bg-cyan-400 rounded-full shadow-[0_0_15px_#22d3ee]" />
          <div className="text-xs text-cyan-300 mt-1">Источник</div>
        </motion.div>

        {/* Прямоугольные зеркала */}
        {mirrors.map((m, i) => (
          <motion.div
            key={i}
            className="absolute cursor-pointer select-none"
            style={{ left: m.x - 15, top: m.y - 25 }}
            onClick={() => rotateMirror(i)}
            animate={{ rotate: m.angle }}
            transition={{ type: "spring", stiffness: 260, damping: 18 }}
          >
            <div className="w-6 h-24 bg-zinc-400 border border-gray-600 rounded-sm" />
            <div className="text-[10px] text-amber-200 text-center mt-1">
              Зеркало {i + 1}
            </div>
          </motion.div>
        ))}

        {/* Алтарь */}
        <motion.div
          className="absolute"
          style={{ left: altar.x - 20, top: altar.y - 20 }}
          animate={
            isSolved ? { scale: [1, 1.15, 1], opacity: [0.9, 1, 0.9] } : {}
          }
          transition={{ repeat: isSolved ? Infinity : 0, duration: 2 }}
        >
          <div className="w-10 h-10 bg-stone-700 border border-amber-700 rounded-md shadow-inner" />
          <div className="text-xs text-amber-200 mt-1 text-center">Алтарь</div>
        </motion.div>

        {/* Эффект победы */}
        <AnimatePresence>
          {isSolved && (
            <>
              <motion.div
                key="flash"
                className="absolute inset-0 pointer-events-none rounded-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1.2 }}
                style={{
                  background:
                    "radial-gradient(circle, #fff5c2 0%, rgba(255,215,0,0.1) 30%, transparent 60%)",
                }}
              />
              <motion.div
                key="lantern"
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-6xl pointer-events-none"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [0, 1.2, 1], opacity: 1 }}
                transition={{ duration: 1.2 }}
              >
                🕯️
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>

      {/* Кнопки */}
      <div className="mt-3 flex gap-3 items-center">
        <button
          className="px-3 py-1 rounded bg-gray-700 text-white"
          onClick={() => {
            setAngles([0, 0, 0]);
            setAttempts(0);
            setIsSolved(false);
            completedRef.current = false;
          }}
        >
          Сбросить
        </button>
        <button
          className="px-3 py-1 rounded bg-amber-600"
          onClick={() => setAngles([45, 135, 45])}
        >
          Подсказка
        </button>
      </div>
    </div>
  );
};

export default React.memo(PuzzleLantern);
