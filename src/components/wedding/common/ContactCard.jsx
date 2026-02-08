export default function ContactCard({ label, name, phone }) {
  const call = () => {
    window.location.href = `tel:${phone}`;
  };

  const sms = () => {
    window.location.href = `sms:${phone}`;
  };

  return (
    <div className="contact-card">
      <div className="contact-name">
        <p className="contact-name-label">{label}</p>
        <p className="contact-name-text bold">{name}</p>
      </div>

      <div className="contact-card-actions">
        <button type="button" className="circle contact-btn" onClick={call}>
          📞
        </button>

        <button type="button" className="circle contact-btn" onClick={sms}>
          ✉️
        </button>
      </div>
    </div>
  );
}
