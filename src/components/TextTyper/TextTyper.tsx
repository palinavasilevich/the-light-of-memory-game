import { useEffect, useRef, useState } from "react";

interface TextTyperProps {
  text: string;
  speed?: number;
  onComplete?: () => void;
}

export function TextTyper({ text, speed = 35, onComplete }: TextTyperProps) {
  const [displayed, setDisplayed] = useState("");
  const intervalRef = useRef<number | null>(null);
  const onCompleteRef = useRef<(() => void) | undefined>(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    const src = String(text ?? "");
    if (!src) {
      setDisplayed("");
      return;
    }

    setDisplayed("");
    let idx = 0;

    intervalRef.current = window.setInterval(() => {
      idx += 1;

      if (idx <= src.length) {
        setDisplayed(src.slice(0, idx));
      }

      if (idx >= src.length) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }

        const cb = onCompleteRef.current;
        if (cb) {
          setTimeout(() => cb(), 0);
        }
      }
    }, Math.max(1, speed));

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [text, speed]);

  return (
    <p
      className="text-2xl text-center"
      dangerouslySetInnerHTML={{ __html: displayed }}
    />
  );
}
