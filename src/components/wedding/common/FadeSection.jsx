import { useEffect, useRef, useState } from "react";

export default function FadeSection({ children, bgColor }) {
  const ref = useRef(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setActive(true);
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className={`fade-section ${active ? "active" : ""}`}
      style={{ backgroundColor: bgColor || "#181818" }}
    >
      <div className="fade-content">{children}</div>
    </section>
  );
}
