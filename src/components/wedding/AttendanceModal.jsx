// AttendanceModal.jsx
import { useState } from "react";

const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwSVZtb8qBsX1d9N-IlpzEVaEwn0b8u2fxJVtIRnsFcwMTwDeNcxOuD_WTXWdNXACH6gw/exec";

export default function AttendanceModal({ isOpen, onClose, onSuccess }) {
  const [side, setSide] = useState("신랑"); // 어느 측
  const [attend, setAttend] = useState("참석"); // 참석 여부
  const [name, setName] = useState(""); // 이름
  const [isSubmitting, setIsSubmitting] = useState(false); // 로딩 여부

  if (!isOpen) return null;

  const resetForm = () => {
    setName("");
    setSide("신랑");
    setAttend("참석");
    setIsSubmitting(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = (e) => {
    // 간단한 유효성 검사
    if (!name.trim()) {
      e.preventDefault();
      alert("성함을 입력해 주세요.");
      return;
    }

    // 유효하면 실제로 폼 전송은 그대로 진행되고,
    // UI만 로딩 상태로 변경
    setIsSubmitting(true);
  };

  const handleIframeLoad = () => {
    // 컴포넌트 처음 렌더링될 때 한 번 onLoad가 불려서
    // "제출 중이 아닐 때"는 무시해줘야 함
    if (!isSubmitting) return;

    // 여기까지 왔으면 폼 전송 완료로 판단
    if (onSuccess) {
      onSuccess(); // 부모에서 토스트 띄우기
    }

    // 폼 리셋 + 모달 닫기
    handleClose();
  };

  return (
    <div className="modal-backdrop" onClick={handleClose}>
      <div
        className="modal-wrapper"
        onClick={(e) => e.stopPropagation()} // 안쪽 클릭 시 닫힘 방지
      >
        <div className="modal" onClick={(e) => e.stopPropagation()}>
          {/* 로딩 오버레이 (사진 업로드 모달 느낌) */}
          {isSubmitting && (
            <div className="modal-loading">
              <p className="loading-icon">⏳</p>
              <p className="loading-message bold">
                참석 의사를 전달하고 있습니다 ☺️
              </p>
            </div>
          )}

          {/* 응답 받는 iframe (항상 유지) */}
          <iframe
            name="hidden_rsvp_iframe"
            style={{ display: "none" }}
            title="rsvp-submit"
            onLoad={handleIframeLoad}
          />

          {/* 폼 (항상 DOM 안에 두되, 로딩 중엔 비활성화 느낌만 주면 됨) */}
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

            {/* 실제로 서버로 넘어가는 값들 */}
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
    </div>
  );
}
