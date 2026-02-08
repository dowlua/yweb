import ContactCard from "./common/ContactCard";

export default function ContactModal({ isOpen, onClose, contacts }) {
  if (!isOpen) return null; // 안 열려있으면 아무것도 렌더 X

  const handleClose = (e) => {
    e.stopPropagation(); // 혹시라도 부모로 클릭 이벤트 안 올라가게
    onClose(); // 부모에서 내려준 닫기 함수 호출
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-wrapper"
        onClick={(e) => e.stopPropagation()} // 안쪽 클릭 시 닫힘 방지
      >
        <div className="modal">
          <div className="contact-list">
            <div className="contact-title">
              <p className="emoji">🤵🏻‍♂️</p>
              <div className="contact-title-name">
                <p className="ko bold">신랑측</p>
                <p className="en">Groom</p>
              </div>
            </div>

            <div className="contact-section">
              <ContactCard
                label="신랑 어머니"
                name={contacts.groom.mother}
                phone={contacts.groom.motherPhone}
              />
              <ContactCard
                label="신랑"
                name={contacts.groom.name}
                phone={contacts.groom.phone}
              />
            </div>
          </div>
          <div className="contact-list">
            <div className="contact-title">
              <p className="emoji">👰🏻‍♀️</p>
              <div className="contact-title-name">
                <p className="ko bold">신부측</p>
                <p className="en">Bride</p>
              </div>
            </div>

            <div className="contact-section">
              <ContactCard
                label="신부 어머니"
                name={contacts.bride.mother}
                phone={contacts.bride.motherPhone}
              />
              <ContactCard
                label="신부"
                name={contacts.bride.name}
                phone={contacts.bride.phone}
              />
            </div>
          </div>
        </div>
        <button
          type="button"
          className="modal-floating-close circle"
          onClick={handleClose}
        >
          ×
        </button>
      </div>
    </div>
  );
}
