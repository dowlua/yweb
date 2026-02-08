import { useState } from "react";
import GuestPhotoModal from "./GuestPhotoModal";
import Toast from "./common/Toast";
import ArrowRightIcon from "./common/ArrowRightIcon";
import Img01 from "../../assets/guest-photo-img-01.jpg";
import Img02 from "../../assets/guest-photo-img-02.jpg";

export default function GuestPhoto() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  const handleUploadSuccess = () => {
    setIsModalOpen(false);
    setToastMsg("사진 업로드가 완료되었습니다 🤍");

    setTimeout(() => setToastMsg(""), 2500);
  };

  return (
    <section className="guest-photo">
      <div className="intro-title">
        <h1 className="intro-title-main">Snap</h1>
        <h2 className="intro-title-sub">our moments!</h2>
      </div>
      <div className="guest-photo-box">
        <div className="guest-photo-img">
          <img src={Img01} />
        </div>
        <div className="guest-photo-img">
          <img src={Img02} />
        </div>
      </div>
      <p className="section-desc">
        예식 당일 찍은 사진들을 올려주세요.
        <br />
        신랑 · 신부가 한 장 한 장 소중히 간직할게요 🤍
      </p>

      <button
        type="button"
        className="guest-photo-btn"
        onClick={() => setIsModalOpen(true)}
      >
        <ArrowRightIcon size={30} />
        사진 올리기
      </button>

      {isModalOpen && (
        <GuestPhotoModal
          onClose={() => setIsModalOpen(false)}
          onSuccess={handleUploadSuccess}
        />
      )}

      {toastMsg && <Toast message={toastMsg} />}
    </section>
  );
}
