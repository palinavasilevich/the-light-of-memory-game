import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FullscreenButton } from "../FullscreenButton/FullscreenButton";
import { AmbientParticles } from "../Background/AmbientParticles";
import { SoundToggleButton } from "../SoundToggleButton/SoundToggleButton";

type Props = {
  backgroundImg?: string;
  children: React.ReactNode;
  sceneKey?: string;
  isPuzzle?: boolean;
};

export const GameLayout: React.FC<Props> = ({
  backgroundImg,
  children,
  sceneKey,
  isPuzzle,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [sceneKey]);

  const contentBlockWidthClasses = !isPuzzle ? "max-w-2xl" : "max-w-3xl";

  return (
    <div className="relative w-full h-screen flex items-center justify-center bg-black text-gray-100 overflow-hidden">
      {backgroundImg && (
        <motion.img
          key={backgroundImg}
          src={backgroundImg}
          alt="background"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      <AmbientParticles />

      {/* <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/50 to-black/90" /> */}
      {/* <div className="absolute inset-0 bg-linear-to-b from-black/50 via-black/20 to-black/60" /> */}

      <div
        className={`z-10 w-full px-6 py-8 text-shadow-lg ${contentBlockWidthClasses}`}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={sceneKey}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8 }}
            className={`bg-black/60 backdrop-blur-md rounded-2xl shadow-2xl p-12 border border-white/10 flex flex-col items-center ${
              isPuzzle ? "px-2" : ""
            }`}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute top-4 right-4 z-20 flex gap-3">
        <SoundToggleButton />
        <FullscreenButton />
      </div>
    </div>
  );
};
