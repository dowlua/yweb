import { forwardRef, useEffect, useRef, useState } from "react";
import envelopeWing from "../../assets/envelope-wing.png";
import envelopeFront from "../../assets/envelope-front.png";
import letter from "../../assets/invitation.png";

const Invitation = forwardRef(function Invitation(_, ref) {
  const envelopeRef = useRef(null);
  const [isOpened, setIsOpened] = useState(false);

  useEffect(() => {
    const el = envelopeRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsOpened(true);
          observer.disconnect(); // 🔥 인트로처럼 딱 한 번
        }
      },
      {
        threshold: 0.3, // 봉투가 어느 정도 보이면
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="invitation">
      <div className="letter-stage">
        {/* ✉️ 편지 */}
        <div className={`letter ${isOpened ? "letter-visible" : ""}`}>
          <div className="letter-box-01">
            <div className="letter-box-02">
              <img className="letter-message" src={letter} alt="" />
            </div>
          </div>
        </div>

        {/* 봉투 */}
        <div className="envelope-wrapper" ref={envelopeRef}>
          <div className="envelope">
            <img className="envelope-wing" src={envelopeWing} alt="" />
            <img className="envelope-front" src={envelopeFront} alt="" />
          </div>
        </div>
      </div>
    </section>
  );
});

export default Invitation;
