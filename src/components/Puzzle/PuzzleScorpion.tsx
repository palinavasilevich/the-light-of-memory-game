import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import scorpionImg from "../../assets/images/scorpion.png";

type Props = {
  rows?: number;
  cols?: number;
  onSolved: () => void;
};

export function PuzzleScorpion({ rows = 4, cols = 4, onSolved }: Props) {
  const totalPieces = rows * cols;
  const [positions, setPositions] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);
  const [isSolved, setIsSolved] = useState(false);

  useEffect(() => {
    // Случайное перемешивание кусочков при старте
    const shuffled = [...Array(totalPieces).keys()].sort(
      () => Math.random() - 0.5
    );
    setPositions(shuffled);
  }, [totalPieces]);

  useEffect(() => {
    if (isSolved) return;
    const timer = setInterval(() => setTime((t) => t + 1), 1000);
    return () => clearInterval(timer);
  }, [isSolved]);

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    index: number
  ) => {
    e.dataTransfer.setData("text/plain", index.toString());
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    e.preventDefault();
    const originalIndex = parseInt(e.dataTransfer.getData("text"), 10);
    setMoves((m) => m + 1);

    setPositions((prev) => {
      const newPos = [...prev];
      [newPos[originalIndex], newPos[index]] = [
        newPos[index],
        newPos[originalIndex],
      ];

      // Проверка победы
      if (newPos.every((p, i) => p === i)) {
        setIsSolved(true);
        setTimeout(() => {
          onSolved();
        }, 2000);
      }

      return newPos;
    });
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) =>
    e.preventDefault();

  const pieceSize = 100;

  return (
    <div className="flex flex-col items-center text-center mt-4 relative">
      <h2 className="text-3xl font-semibold text-yellow-500 mb-2">
        ⚙️ Assemble mechanical scorpion
      </h2>

      <p className="text-xl text-gray-400 italic animate-pulse">
        Drag and drop parts to restore the device
      </p>

      <div className="mt-8 flex gap-8">
        <div className="relative flex flex-col items-center">
          <div className="relative border border-yellow-800 p-1 rounded-md shadow-inner shadow-yellow-900">
            <img
              src={scorpionImg}
              alt="Reference"
              width={pieceSize * 2}
              height={pieceSize * 2}
              className="object-cover opacity-70 sepia-[0.5] contrast-[0.9]"
            />

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,0,0,0.3)_0%,rgba(0,0,0,0)_60%)] pointer-events-none rounded-md" />
          </div>
        </div>

        <div
          className="relative grid border-2 border-amber-700 shadow-md"
          style={{
            gridTemplateColumns: `repeat(${cols}, ${pieceSize}px)`,
            gridTemplateRows: `repeat(${rows}, ${pieceSize}px)`,
          }}
        >
          {positions.map((pos, index) => {
            const x = (pos % cols) * pieceSize;
            const y = Math.floor(pos / cols) * pieceSize;
            return (
              <motion.div
                key={index}
                className="puzzle-piece border border-amber-800 cursor-grab active:cursor-grabbing"
                draggable={!isSolved}
                onDragStart={(e) => handleDragStart(e, index)}
                onDrop={(e) => handleDrop(e, index)}
                onDragOver={handleDragOver}
                whileHover={
                  !isSolved ? { scale: 1.05, boxShadow: "0 0 10px gold" } : {}
                }
                style={{
                  width: pieceSize,
                  height: pieceSize,
                  backgroundImage: `url(${scorpionImg})`,
                  backgroundSize: `${cols * pieceSize}px ${rows * pieceSize}px`,
                  backgroundPosition: `-${x}px -${y}px`,
                  transition: "transform 0.2s ease",
                }}
              />
            );
          })}

          {/* Вспышка активации */}
          {isSolved && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1.2 }}
              className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,215,0,0.5)_0%,rgba(0,0,0,0)_70%)] pointer-events-none rounded-md"
            />
          )}

          {/* Дым */}
          {isSolved && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: [0.4, 0.7, 0], y: [-5, -15, -25] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 0.5 }}
              className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-yellow-200/10 to-transparent blur-xl"
            />
          )}
        </div>
      </div>

      {/* {isSolved && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: [1.2, 1], opacity: [0, 1] }}
          transition={{ duration: 0.8 }}
          className="mt-4 text-lg font-bold text-yellow-400 drop-shadow-[0_0_6px_rgba(255,200,0,0.8)]"
        >
          ⚙️ The mechanism is activated!
        </motion.div>
      )} */}

      <AnimatePresence>
        {isSolved && (
          <>
            <motion.div
              key="flash"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2 }}
              className="absolute inset-0 bg-yellow-300/60 rounded-md pointer-events-none"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl font-bold text-amber-400 text-center  drop-shadow-[0_0_6px_rgba(255,200,0,0.8)]"
            >
              THE MECHANISM IS ACTIVATED!
              {/* <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                transition={{ repeat: 2, duration: 1.5 }}
                className="text-6xl mt-4"
              >
                🦂
              </motion.div> */}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
