import { useEffect, useState } from "react";
import { HangulMotion } from "react-hangul-motion";
import SparkleCanvas from "./common/SparkleCanvas";

export default function IntroOverlay({ onFinish }) {
  const [step, setStep] = useState(0);
  const [showGetting, setShowGetting] = useState(false);
  const [showMarried, setShowMarried] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // 현재 스크롤 위치 저장
    const scrollY = window.scrollY;

    // body 고정
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.overflow = "hidden";
    document.body.style.width = "100%";

    const timers = [
      setTimeout(() => setStep(1), 100),
      setTimeout(() => setStep(2), 200),
      setTimeout(() => setShowGetting(true), 3000),
      setTimeout(() => setShowMarried(true), 4000),
      setTimeout(() => {
        // 종료 전에 페이드아웃 시작
        setIsFadingOut(true);

        // 트랜지션 끝나면 onFinish 호출
        setTimeout(() => {
          setStep(5);
          if (onFinish) onFinish();
        }, 500); // CSS 트랜지션 시간과 동일
      }, 9000),
    ];

    return () => {
      timers.forEach(clearTimeout);

      // body 고정 해제 후 원래 스크롤 위치로 복원
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.overflow = "";
      document.body.style.width = "";
      window.scrollTo(0, scrollY);
    };
  }, [onFinish]);

  if (step === 5) return null;

  return (
    <section className={`intro-overlay ${isFadingOut ? "fade-out" : ""}`}>
      <div className={`introOverlay-photo step-${step}`} />
      <SparkleCanvas />
      <div className="introOverlay-text-box">
        <p>장연욱 🤍 박은빈</p>
        {step >= 2 && (
          <p className="typing">
            <HangulMotion
              text="모든 것이 새로워지는 봄날,\n저희 결혼합니다."
              speed={120}
              cursor={false}
              showComposition={false}
            />
          </p>
        )}
      </div>

      <div className="introOverlay-title">
        <p className={`title getting ${showGetting ? "show" : ""}`}>Getting</p>
        <p className={`title married ${showMarried ? "show" : ""}`}>Married</p>
      </div>
    </section>
  );
}
