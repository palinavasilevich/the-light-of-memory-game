import type { ButtonHTMLAttributes } from "react";

import cls from "./ActionButton.module.css";

interface ActionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
}

export function ActionButton({ text, ...props }: ActionButtonProps) {
  return (
    <button className={cls["action-btn"]} {...props}>
      <h5 className={cls.text}>{text}</h5>
      <span className={cls.label}>BDA249</span>
    </button>
  );
}
