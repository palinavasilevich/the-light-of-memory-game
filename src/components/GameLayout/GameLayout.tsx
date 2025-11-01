// components/Layout/GameLayout.tsx
import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FullscreenButton } from "../FullscreenButton/FullscreenButton";

type Props = {
  backgroundImg?: string;
  children: React.ReactNode;
  sceneKey?: string;
};

export const GameLayout: React.FC<Props> = ({
  backgroundImg,
  children,
  sceneKey,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [sceneKey]);

  return (
    <div
      ref={ref}
      className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-black text-gray-100"
    >
      {backgroundImg && (
        <motion.img
          key={backgroundImg}
          src={backgroundImg}
          alt="background"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent pointer-events-none" />

      <div className="z-10 w-full max-w-3xl px-6 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={sceneKey}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
            className="bg-black/60 backdrop-blur-md rounded-2xl shadow-2xl p-6 border border-white/10"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute top-4 right-4 z-20">
        <FullscreenButton />
      </div>
    </div>
  );
};
