import { useEffect, useState, useRef } from "react";
import weddingData from "../../data/weddingData";

// target 날짜까지 남은 시간 계산 함수
function getTimeLeft(targetDate) {
  const now = new Date();
  const diff = targetDate.getTime() - now.getTime();

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default function Calendar() {
  const { cover, contacts } = weddingData;
  const targetDate = new Date("2026-05-23T17:00:00");
  const [timeLeft, setTimeLeft] = useState(getTimeLeft(targetDate));

  const ddayRef = useRef(null);
  const heartTimerRef = useRef(null); // ⬅ 딜레이 타이머 저장
  const [heartActive, setHeartActive] = useState(false);

  // 1초마다 업데이트
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft(targetDate));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // 👇 살짝 딜레이 후에 active 켜기
          heartTimerRef.current = setTimeout(() => {
            setHeartActive(true);
          }, 800); // 0.8초 뒤에 시작 (원하면 숫자 조절)
        } else {
          // 화면에서 벗어났을 때: 타이머 취소 + 다시 초기 상태
          clearTimeout(heartTimerRef.current);
          setHeartActive(false);
        }
      },
      { threshold: 0.4 }
    );

    if (ddayRef.current) observer.observe(ddayRef.current);

    return () => {
      clearTimeout(heartTimerRef.current);
      observer.disconnect();
    };
  }, []);

  return (
    <section className="calendar">
      <div className="intro-title">
        <h1 className="intro-title-main">D-Day</h1>
        <h2 className="intro-title-sub">our wedding day!</h2>
      </div>

      <div className="calendar-frame">
        <div className="calendar-grid">
          <div className="calendar-date">
            <div className="calendar-date-week">Fri</div>
            <div className="calendar-date-day">
              <p className="month">☺️</p>
              <p className="day">22</p>
            </div>
          </div>
          <div className="calendar-date dday" ref={ddayRef}>
            <div className="calendar-date-week">Sat</div>
            <div
              className={"calendar-date-day" + (heartActive ? " active" : "")}
            >
              <p className="month">💍</p>
              <p className="day">23</p>
              <svg className="heart-svg" viewBox="0 0 100 96">
                <path
                  d="M45.6069 93.7756C32.684 83.4776 0.822104 59.0652 2.03361 29.2617C2.23552 20.0743 7.97007 1.76008 29.2929 2.00238C37.3698 2.70911 53.5841 8.48408 53.8264 25.9301C55.6437 17.9542 65.2942 3.65011 81.0441 9.10198C87.4046 10.4145 102.852 20.6115 96.4911 43.0247C92.1074 58.472 76.7432 82.0359 23.1937 90.2743"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                />
              </svg>
            </div>
          </div>
          <div className="calendar-date">
            <div className="calendar-date-week">Sun</div>
            <div className="calendar-date-day">
              <p className="month">🥳</p>
              <p className="day">24</p>
            </div>
          </div>
        </div>
      </div>

      {/* 카운트다운 영역 */}
      <div className="countdown">
        <div className="countdown-values">
          <div className="countdown-item">
            <span className="countdown-label">Days</span>
            <span className="countdown-number">{timeLeft.days}</span>
          </div>
          :
          <div className="countdown-item">
            <span className="countdown-label">Hour</span>
            <span className="countdown-number">{timeLeft.hours}</span>
          </div>
          :
          <div className="countdown-item">
            <span className="countdown-label">Min</span>
            <span className="countdown-number">{timeLeft.minutes}</span>
          </div>
          :
          <div className="countdown-item">
            <span className="countdown-label">Sec</span>
            <span className="countdown-number">{timeLeft.seconds}</span>
          </div>
        </div>

        <div className="countdown-desc">
          <p className="dday bold">
            {cover.date} {cover.day}
          </p>
          <p>
            <span className="dday bold">
              {contacts.groom.name.slice(1)} 🤍 {contacts.bride.name.slice(1)}
            </span>
            의 결혼식이
            <span className="dday bold"> {timeLeft.days + 1}일</span>{" "}
            남았습니다.
          </p>
        </div>
      </div>
    </section>
  );
}
