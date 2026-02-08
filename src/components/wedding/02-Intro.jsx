// 02-Intro.jsx
import { forwardRef, useEffect, useRef, useState } from "react";
import weddingData from "../../data/weddingData";
import ArrowRightIcon from "./common/ArrowRightIcon";
import ContactModal from "./ContactModal";
import IntroPhoto from "./common/IntroPhoto";

const Intro = forwardRef(function Intro(_, ref) {
  const { intro, contacts } = weddingData;
  const sectionRef = useRef(null);
  const [active, setActive] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // 화면에 들어오면 애니메이션 ON
          setActive(true);
        } else {
          // 화면에서 나가면 다시 OFF (다시 들어올 때 재시작되게)
          setActive(false);
        }
      },
      {
        threshold: 0.7, // 섹션의 70% 정도 보이면 "들어왔다"고 판단
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="intro">
      <div className="intro-title">
        <h1 className="intro-title-main">Celebrate</h1>
        <h2 className="intro-title-sub">with us!</h2>
      </div>
      <IntroPhoto active={active} />
      <div className="intro-info">
        <p className="intro-info-name">Yeon Uk🤵🏻 🤍 ‍👰🏻‍♀Eun Bin</p>
        <div className="intro-info-role">
          <p>
            {contacts.groom.mother} <span className="role-sm">의 장남</span>{" "}
            {contacts.groom.name}
          </p>
          <p>
            <span className="role-sm">故</span> {contacts.bride.father} ·{" "}
            {contacts.bride.mother} <span className="role-sm">의 차녀</span>{" "}
            {contacts.bride.name}
          </p>
        </div>
        <button
          type="button"
          className="intro-button"
          onClick={() => setIsContactOpen(true)}
        >
          <ArrowRightIcon size={30} />
          축하 연락하기
        </button>
      </div>

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        contacts={contacts}
      />
    </section>
  );
});

export default Intro;
