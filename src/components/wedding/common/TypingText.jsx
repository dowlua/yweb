import { useEffect, useRef, useState } from "react";

export default function TypingText({ start }) {
  const text = "모든 것이 새로워지는 봄날,\n저희 결혼합니다.";
  const [value, setValue] = useState("");
  const indexRef = useRef(0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!start || startedRef.current) return;

    startedRef.current = true;

    const timer = setInterval(() => {
      if (indexRef.current >= text.length) {
        clearInterval(timer);
        return;
      }

      setValue((prev) => prev + text[indexRef.current]);
      indexRef.current += 1;
    }, 80);

    return () => clearInterval(timer);
  }, [start]);

  return <p className="typing">{value}</p>;
}
