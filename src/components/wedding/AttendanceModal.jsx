import { useState, useEffect } from "react";
import ReactDOM from "react-dom";

const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwSVZtb8qBsX1d9N-IlpzEVaEwn0b8u2fxJVtIRnsFcwMTwDeNcxOuD_WTXWdNXACH6gw/exec";

export default function AttendanceModal({ isOpen, onClose, onSuccess }) {
  const [side, setSide] = useState("신랑");
  const [attend, setAttend] = useState("참석");
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const resetForm = () => {
    setName("");
    setSide("신랑");
    setAttend("참석");
    setIsSubmitting(false);
  };

  const handleClose = () => {
    resetForm();
    onClose?.();
  };

  const handleSubmit = (e) => {
    if (!name.trim()) {
      e.preventDefault();
      alert("성함을 입력해 주세요.");
      return;
    }
    setIsSubmitting(true);
  };

  const handleIframeLoad = () => {
    if (!isSubmitting) return;
    onSuccess?.();
    handleClose();
  };

  // body에 portal로 모달 렌더링
  return ReactDOM.createPortal(
    <div className="modal-backdrop" onClick={handleClose}>
      <div className="modal-wrapper" onClick={(e) => e.stopPropagation()}>
        <div className="modal" onClick={(e) => e.stopPropagation()}>
          {isSubmitting && (
            <div className="modal-loading">
              <p className="loading-icon">⏳</p>
              <p className="loading-message bold">
                참석 의사를 전달하고 있습니다 ☺️
              </p>
            </div>
          )}

          <iframe
            name="hidden_rsvp_iframe"
            style={{ display: "none" }}
            title="rsvp-submit"
            onLoad={handleIframeLoad}
          />

          <form
            className={`modal-form ${isSubmitting ? "modal-form-disabled" : ""}`}
            action={SCRIPT_URL}
            method="POST"
            target="hidden_rsvp_iframe"
            onSubmit={handleSubmit}
          >
            {/* 어느 측 하객 */}
            <div className="modal-row">
              <p className="modal-label">
                <span className="bold">어느 측 하객</span>이신가요?
              </p>
              <div className="modal-toggle">
                <button
                  type="button"
                  className={
                    side === "신랑"
                      ? "modal-toggle-btn active"
                      : "modal-toggle-btn"
                  }
                  onClick={() => setSide("신랑")}
                  disabled={isSubmitting}
                >
                  🤵🏻‍ 신랑
                </button>
                <button
                  type="button"
                  className={
                    side === "신부"
                      ? "modal-toggle-btn active"
                      : "modal-toggle-btn"
                  }
                  onClick={() => setSide("신부")}
                  disabled={isSubmitting}
                >
                  👰🏻‍♀‍ 신부
                </button>
              </div>
            </div>

            {/* 참석 여부 */}
            <div className="modal-row">
              <p className="modal-label">
                <span className="bold">참석</span>하실 수 있나요?
              </p>
              <div className="modal-toggle">
                <button
                  type="button"
                  className={
                    attend === "참석"
                      ? "modal-toggle-btn active"
                      : "modal-toggle-btn"
                  }
                  onClick={() => setAttend("참석")}
                  disabled={isSubmitting}
                >
                  참석
                </button>
                <button
                  type="button"
                  className={
                    attend === "불참석"
                      ? "modal-toggle-btn active"
                      : "modal-toggle-btn"
                  }
                  onClick={() => setAttend("불참석")}
                  disabled={isSubmitting}
                >
                  불참석
                </button>
              </div>
            </div>

            {/* 성함 */}
            <div className="modal-row">
              <p className="modal-label">
                <span className="bold">성함</span>을 적어주세요.
              </p>
              <input
                className="modal-input"
                placeholder="참석자 본인 성함"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isSubmitting}
              />
            </div>

            <input type="hidden" name="side" value={side} />
            <input type="hidden" name="attend" value={attend} />
            <input type="hidden" name="name" value={name} />

            <button
              type="submit"
              className="modal-submit"
              disabled={isSubmitting}
            >
              전달하기
            </button>
          </form>
        </div>

        <button
          type="button"
          className="modal-floating-close circle"
          onClick={handleClose}
          disabled={isSubmitting}
        >
          ×
        </button>
      </div>
    </div>,
    document.body,
  );
}
