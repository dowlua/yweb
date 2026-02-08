import { useState } from "react";
import Toast from "./common/Toast";

export default function Ending() {
  const [toastMsg, setToastMsg] = useState("");

  const handleCopyLink = () => {
    if (!navigator.clipboard) return;

    const linkToCopy = "https://yweb.enn.kr";

    navigator.clipboard.writeText(linkToCopy).then(() => {
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
        title: "장연욱 ♥ 박은빈 결혼합니다",
        description:
          "5월 23일 (토) 오후 5시\n밀리토피아 웨딩센터 2F 아이리스홀",
        imageUrl: "https://yweb-wedding.vercel.app/cover.jpg", // 썸네일용 이미지
        link: {
          mobileWebUrl: "https://yweb.enn.kr",
          webUrl: "https://yweb.enn.kr",
        },
      },
      buttons: [
        {
          title: "청첩장 보러가기 💌",
          link: {
            mobileWebUrl: "https://yweb.enn.kr",
            webUrl: "https://yweb.enn.kr",
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
