import { useState } from "react";
import weddingData from "../../data/weddingData";
import payKakao from "../../assets/pay-kakao.svg";
import Toast from "./common/Toast.jsx";

export default function Account() {
  const { contacts, account } = weddingData;
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccount = () => {
    setIsOpen((prev) => !prev);
  };

  const [toastMsg, setToastMsg] = useState("");

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setToastMsg("계좌번호가 복사되었습니다 🤍");

      setTimeout(() => setToastMsg(""), 2500);
    });
  };

  return (
    <section className="account">
      <h1 className="section-title">Account</h1>
      <div className="section-desc">
        <p className="bold">마음 전하실 곳</p>
        참석이 어려우신 분들을 위해 기재했습니다.
        <br />
        너그러운 마음으로 양해 부탁드립니다.
      </div>
      <div className="account-toggle">
        <div className="account-box">
          <button
            type="button"
            className={`account-toggle-box ${isOpen ? "open" : ""}`}
            onClick={toggleAccount}
          >
            <span className={`toggle-arrow ${isOpen ? "up" : "down"}`}>
              {/* 아래에서 쓸 SVG */}
              <svg
                className="triangle-icon"
                width="12"
                height="12"
                viewBox="0 0 24 24"
              >
                <path d="M12 17L4 7h16L12 17z" />
              </svg>
            </span>
            <span className="label">자세히 보기</span>
          </button>

          <div className={`account-panel ${isOpen ? "open" : ""}`}>
            <div className="account-card">
              <p className="account-role">
                <span className="role-name">신랑</span>{" "}
                <span className="bold">{contacts.groom.name}</span>
              </p>
              <div className="account-desc">
                <div className="account-bank">
                  <p>{account.groom.bank}</p>
                  <p>{account.groom.number}</p>
                </div>
                <div className="account-btn">
                  <button
                    className="circle pay-kakao"
                    onClick={() =>
                      window.open("https://qr.kakaopay.com/Fa6StWW9q", "_blank")
                    }
                  >
                    <img src={payKakao} />
                  </button>
                  <button
                    className="circle pay-copy"
                    onClick={() =>
                      copyToClipboard(
                        `${account.groom.bank} ${account.groom.number}`
                      )
                    }
                  >
                    복사
                  </button>

                  {toastMsg && (
                    <Toast message={toastMsg} onClose={() => setToastMsg("")} />
                  )}
                </div>
              </div>
            </div>
            <div className="account-card">
              <p className="account-role">
                <span className="role-name">신부</span>{" "}
                <span className="bold">{contacts.bride.name}</span>
              </p>
              <div className="account-desc">
                <div className="account-bank">
                  <p>{account.bride.bank}</p>
                  <p>{account.bride.number}</p>
                </div>
                <div className="account-btn">
                  <button
                    className="circle pay-kakao"
                    onClick={() =>
                      window.open("https://qr.kakaopay.com/FUkSw1xNP", "_blank")
                    }
                  >
                    <img src={payKakao} />
                  </button>
                  <button
                    className="circle pay-copy"
                    onClick={() =>
                      copyToClipboard(
                        `${account.bride.bank} ${account.bride.number}`
                      )
                    }
                  >
                    복사
                  </button>

                  {toastMsg && (
                    <Toast message={toastMsg} onClose={() => setToastMsg("")} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
