import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SENTENCES } from "../../constants/game";

interface PuzzleSentenceBuilderProps {
  onSolved: () => void;
}

export const PuzzleSentenceBuilder: React.FC<PuzzleSentenceBuilderProps> = ({
  onSolved,
}) => {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number[]>([]);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const sentence = SENTENCES[current];

  // Разбиваем на объекты { id, text }
  const words = useMemo(() => {
    return sentence.german
      .split(" ")
      .map((w, i) => ({ id: i, text: w }))
      .sort(() => Math.random() - 0.5);
  }, [sentence.german]);

  const handleSelect = (id: number) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((w) => w !== id) : [...prev, id]
    );
  };

  const handleCheck = () => {
    const assembled = selected
      .map((id) => words.find((w) => w.id === id)?.text)
      .join(" ");
    if (assembled === sentence.german) {
      setIsCorrect(true);
      setTimeout(() => {
        if (current < SENTENCES.length - 1) {
          setCurrent((prev) => prev + 1);
          setSelected([]);
          setIsCorrect(null);
        } else {
          onSolved();
        }
      }, 1200);
    } else {
      setIsCorrect(false);
      setTimeout(() => {
        setSelected([]);
        setIsCorrect(null);
      }, 800);
    }
  };

  const handleReset = () => {
    setSelected([]);
  };

  return (
    <div className="relative h-full w-full">
      {/* Вспышка при успехе */}
      <AnimatePresence>
        {isCorrect && (
          <motion.div
            key="flash"
            className="fixed inset-0 z-999 bg-green-500/40 pointer-events-none rounded-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          />
        )}
      </AnimatePresence>

      <h2 className="text-xl font-semibold mb-2 text-amber-400 text-center">
        🧩 Bilde einen Satz aus den Wörtern
      </h2>
      <p className="text-gray-400 mb-4 italic text-center">
        ({sentence.translation})
      </p>

      {/* Область выбора */}
      <div className="flex flex-wrap gap-2 mb-4 justify-center">
        {words.map((word) => (
          <motion.button
            key={word.id}
            onClick={() => handleSelect(word.id)}
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.05 }}
            className={`px-3 py-1 rounded-lg border transition-color duration-200 ${
              selected.includes(word.id)
                ? "bg-amber-600 border-amber-500 shadow-[0_0_8px_rgba(255,200,0,0.4)]"
                : "bg-gray-800 border-gray-700 hover:bg-gray-700"
            }`}
          >
            {word.text}
          </motion.button>
        ))}
      </div>

      {/* Собранное предложение */}
      <motion.div
        key={selected.join(" ")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`min-h-[2rem] mb-4 text-center text-lg font-medium ${
          isCorrect === true
            ? "text-green-400"
            : isCorrect === false
            ? "text-red-400"
            : "text-amber-200"
        }`}
      >
        {selected
          .map((id) => words.find((w) => w.id === id)?.text)
          .filter(Boolean)
          .join(" ")}
      </motion.div>

      {/* Кнопки */}
      <div className="flex justify-center gap-3">
        <motion.button
          onClick={handleReset}
          disabled={selected.length === 0}
          whileTap={{ scale: 0.95 }}
          className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 cursor-pointer"
        >
          Zurücksetzen
        </motion.button>
        <motion.button
          onClick={handleCheck}
          disabled={selected.length === 0}
          whileTap={{ scale: 0.95 }}
          className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 cursor-pointer"
        >
          Überprüfen
        </motion.button>
      </div>

      {/* Прогресс */}
      <div className="mt-4 text-sm text-center text-gray-400">
        {current + 1} / {SENTENCES.length}
      </div>

      {/* Ошибка */}
      <AnimatePresence>
        {isCorrect === false && (
          <motion.div
            key="error"
            className="fixed inset-0 z-999 bg-red-600/20 backdrop-blur-[2px] pointer-events-none rounded-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
