import { useState } from "react";
import AttendanceModal from "./AttendanceModal";
import weddingData from "../../data/weddingData";
import ArrowRightIcon from "./common/ArrowRightIcon";
import Toast from "./common/Toast";

export default function Attendance() {
  const { cover, contacts, location } = weddingData;
  const [isOpen, setIsOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  const handleAttendanceSuccess = () => {
    setToastMsg("참석 의사가 전달되었습니다 ☺️");
    setTimeout(() => setToastMsg(""), 2500);
  };

  return (
    <section className="attendance">
      <h1 className="section-title light">RSVP</h1>
      <div className="attendance-card">
        <div className="section-desc">
          <p className="bold">참석 의사 전달</p>
          모든 분들을 소중히 모실 수 있도록
          <br />
          참석 의사를 알려주시면 감사하겠습니다.
        </div>

        <div className="attendance-date">
          <p className="name bold">
            신랑 {contacts.groom.name} ♥ 신부 {contacts.bride.name}
          </p>
          <p className="info">
            {cover.date} {cover.day} {cover.time}
            <br />
            {location.name} {location.hallname}
          </p>
          <button type="button" onClick={() => setIsOpen(true)}>
            <ArrowRightIcon size={30} />
            전달하기
          </button>
        </div>
      </div>

      {isOpen && (
        <AttendanceModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onSuccess={handleAttendanceSuccess}
        />
      )}

      {toastMsg && <Toast message={toastMsg} />}
    </section>
  );
}
