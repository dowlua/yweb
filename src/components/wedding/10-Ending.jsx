import { useState } from "react";
import Toast from "./common/Toast";

export default function Ending() {
  const [toastMsg, setToastMsg] = useState("");

  const handleCopyLink = () => {
    if (!navigator.clipboard) return;

    navigator.clipboard.writeText(window.location.href).then(() => {
      setToastMsg("청첩장 링크가 복사되었습니다 🤍");

      setTimeout(() => setToastMsg(""), 2500);
    });
  };

  const handleKakaoShare = () => {
    if (!window.Kakao) {
      alert("카카오 SDK가 로드되지 않았어요");
      return;
    }

    window.Kakao.Share.sendDefault({
      objectType: "feed",
      content: {
        title: "장연욱 🤍 박은빈 결혼합니다",
        description: "소중한 날에 초대합니다 💍",
        imageUrl:
          "https://github.com/dowlua/yweb/blob/main/public/cover.jpg?raw=true", // 썸네일용 이미지
        link: {
          mobileWebUrl: window.location.href,
          webUrl: window.location.href,
        },
      },
      buttons: [
        {
          title: "청첩장 보러가기",
          link: {
            mobileWebUrl: window.location.href,
            webUrl: window.location.href,
          },
        },
      ],
    });
  };

  return (
    <section className="ending">
      <div className="ending-bg" />
      <svg
        className="ending-curve"
        viewBox="0 0 375 200"
        preserveAspectRatio="none"
      >
        <path d="M0,200 Q187.5,0 375,200 L375,0 L0,0 Z" fill="#181818" />
      </svg>

      <div className="ending-content">
        <div className="ending-message">
          <p className="ending-message-desc">
            저희의 새로운 시작을
            <br />
            함께 해주셔서 감사합니다.
          </p>
          <div className="ending-line" />

          <p className="ending-names">장연욱🤵🏻 🤍 ‍👰🏻‍♀박은빈</p>
        </div>

        <div className="ending-actions">
          <button onClick={handleKakaoShare}>💬 카카오톡 공유하기</button>
          <button onClick={handleCopyLink}>🔗 청첩장 링크 복사하기</button>
        </div>
      </div>

      {toastMsg && <Toast message={toastMsg} />}
    </section>
  );
}
