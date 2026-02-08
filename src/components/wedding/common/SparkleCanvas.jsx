import { useEffect, useRef } from "react";

export default function SparkleCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const sparkles = Array.from({ length: 55 }).map(() => ({
      x: Math.random() * w,
      y: Math.random() * h,
      size: Math.random() * 3 + 1.5, // ⭐️ 크기 랜덤 크게
      baseOpacity: Math.random() * 0.4 + 0.3,
      phase: Math.random() * Math.PI * 2, // twinkle 위상
      speed: Math.random() * 0.015 + 0.005,
      vy: Math.random() * 0.25 + 0.1,
      vx: (Math.random() - 0.5) * 0.1,
      rotation: Math.random() * Math.PI,
      rotateSpeed: (Math.random() - 0.5) * 0.01,
    }));

    function drawPlus(x, y, size, opacity, rotation) {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);

      ctx.strokeStyle = `rgba(255,255,255,${opacity})`;
      ctx.lineWidth = size * 0.35;
      ctx.lineCap = "round";

      const half = size;

      // 세로 선
      ctx.beginPath();
      ctx.moveTo(0, -half);
      ctx.lineTo(0, half);
      ctx.stroke();

      // 가로 선
      ctx.beginPath();
      ctx.moveTo(-half, 0);
      ctx.lineTo(half, 0);
      ctx.stroke();

      ctx.restore();
    }

    function animate() {
      ctx.clearRect(0, 0, w, h);

      sparkles.forEach((s) => {
        // ✨ twinkle (sin 파형)
        const twinkle = s.baseOpacity + Math.sin(s.phase) * s.baseOpacity * 0.6;

        drawPlus(s.x, s.y, s.size, twinkle, s.rotation);

        s.y += s.vy;
        s.x += s.vx;
        s.phase += s.speed;
        s.rotation += s.rotateSpeed;

        if (s.y > h + 20 || s.x < -20 || s.x > w + 20) {
          s.x = Math.random() * w;
          s.y = -20;
        }
      });

      requestAnimationFrame(animate);
    }

    animate();

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  return <canvas ref={canvasRef} className="sparkle-canvas" />;
}
