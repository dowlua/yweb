import { useEffect, useState, forwardRef } from "react";
import weddingData from "../../data/weddingData";
import getCalendarCells from "../wedding/common/getCalendarCells";
import flower from "../../assets/flower.png";

const WEEK_DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// target 날짜까지 남은 시간 계산 함수
function getTimeLeft(targetDate) {
  const now = new Date();
  const diff = targetDate.getTime() - now.getTime();

  if (diff <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
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
  const [dayYear, dayMonth, dayDay] = cover.dateDot.split(".");

  // 달력용 날짜
  const year = 2026;
  const month = 4;
  const weddingDay = 23;
  const cells = getCalendarCells(year, month);

  // 카운트다운용
  const targetDate = new Date(year, month, weddingDay, 17, 0, 0);

  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(targetDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft(targetDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <section className="calendar">
      <h1 className="section-title">D-day</h1>
      <div className="calendar-date">
        <p className="calendar-date-small">{dayYear}</p>
        <div className="calendar-date-large">
          <p>{dayMonth}</p>
          <p className="slash">/</p>
          <p>{dayDay}</p>
        </div>
        <p className="calendar-date-small">{cover.dayEn}</p>
      </div>

      <div className="calendar-grid">
        {/* 요일 헤더 */}
        {WEEK_DAYS.map((day, idx) => {
          const isSun = idx === 0;
          const isSat = idx === 6;

          return (
            <div
              key={day}
              className={["cell", "header", isSun && "sun", isSat && "sat"]
                .filter(Boolean)
                .join(" ")}
            >
              {day}
            </div>
          );
        })}

        {/* 날짜 칸 */}
        {cells.map((day, idx) => {
          const isSun = idx % 7 === 0;
          const isSat = idx % 7 === 6;
          const isDday = day === weddingDay;

          return (
            <div
              key={idx}
              className={[
                "cell",
                isSun && "sun",
                isSat && "sat",
                isDday && "dday bold",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {day && <span>{day}</span>}
            </div>
          );
        })}
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

        <p className="countdown-desc">
          <span className="dday bold">
            {contacts.groom.name.slice(1)} ♥ {contacts.bride.name.slice(1)}
          </span>
          의 결혼식이
          <span className="dday bold"> {timeLeft.days + 1}일</span> 남았습니다.
        </p>
      </div>
    </section>
  );
}
