import { Volume2, VolumeX } from "lucide-react";
import { useGameStore } from "../../store/gameStore";

export function SoundToggleButton() {
  const { isSoundEnabled, toggleSound } = useGameStore();

  return (
    <button
      onClick={toggleSound}
      className="p-3 rounded-full bg-black/50 hover:bg-black/70 border border-white/20 transition cursor-pointer"
      title={isSoundEnabled ? "Mute" : "Unmute"}
    >
      {isSoundEnabled ? <Volume2 size={22} /> : <VolumeX size={22} />}
    </button>
  );
}
