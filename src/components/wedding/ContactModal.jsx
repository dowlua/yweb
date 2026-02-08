import ReactDOM from "react-dom";
import ContactCard from "./common/ContactCard";

export default function ContactModal({ isOpen, onClose, contacts }) {
  if (!isOpen) return null;

  const handleClose = (e) => {
    e.stopPropagation();
    onClose?.();
  };

  return ReactDOM.createPortal(
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-wrapper" onClick={(e) => e.stopPropagation()}>
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
    </div>,
    document.body,
  );
}
