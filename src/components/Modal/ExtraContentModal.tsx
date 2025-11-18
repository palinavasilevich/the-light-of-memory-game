// components/ExtraContentModal/ExtraContentModal.tsx
import React from "react";
import { ActionButton } from "../ActionButton/ActionButton";

interface Props {
  image?: string;
  text?: string;
  onContinue: () => void;
}

export const ExtraContentModal: React.FC<Props> = ({
  image,
  text,
  onContinue,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="bg-black/90 text-white p-6 rounded-xl max-w-3xl text-center flex flex-col items-center gap-6">
        {image && (
          <img
            src={image}
            alt="extra content"
            className="w-full h-full object-cover rounded-lg"
          />
        )}
        {text && <p className="text-white text-lg">text </p>}
        <ActionButton text="Continue" onClick={onContinue} />
      </div>
    </div>
  );
};
