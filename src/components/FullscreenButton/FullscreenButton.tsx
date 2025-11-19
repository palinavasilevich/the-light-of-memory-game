// components/FullscreenButton/FullscreenButton.tsx
import { useState, useCallback } from "react";
import { Maximize2, Minimize2 } from "lucide-react";

export const FullscreenButton = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  }, []);

  return (
    <button
      onClick={toggleFullscreen}
      className="p-3 rounded-full bg-black/50 hover:bg-black/70 border border-white/20 transition cursor-pointer"
      title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
    >
      {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
    </button>
  );
};
