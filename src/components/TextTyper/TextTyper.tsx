import { useEffect, useRef, useState } from "react";

interface TextTyperProps {
  text: string;
  speed?: number;
  onComplete?: () => void;
}

export function TextTyper({ text, speed = 35, onComplete }: TextTyperProps) {
  const [displayed, setDisplayed] = useState("");
  const onCompleteRef = useRef(onComplete);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    const src = text || "";
    let i = 0;
    let output = "";

    function step() {
      if (i >= src.length) {
        clearInterval(intervalRef.current!);
        intervalRef.current = null;
        onCompleteRef.current?.();
        return;
      }

      // Если встречаем открывающий тег — добавляем весь HTML как единое целое
      if (src[i] === "<") {
        const closeIndex = src.indexOf(">", i);
        if (closeIndex !== -1) {
          output += src.slice(i, closeIndex + 1);
          i = closeIndex + 1;
        }
      } else {
        // Обычный символ
        output += src[i];
        i += 1;
      }

      setDisplayed(output);
    }

    intervalRef.current = window.setInterval(step, speed);

    return () => clearInterval(intervalRef.current!);
  }, [text, speed]);

  return (
    <p
      className="text-2xl text-center"
      dangerouslySetInnerHTML={{ __html: displayed }}
    />
  );
}
