// 01-Cover.jsx
import { forwardRef } from "react";
import weddingData from "../../data/weddingData";

export default function Cover() {
  const { cover, contacts } = weddingData;

  return (
    <section className="cover snap-page">
      <div className="cover-inner">
        <div className="cover-top">
          <h1 className="cover-calligraphy">
            Getting
            <br />
            Married
          </h1>
        </div>

        <div className="cover-bottom">
          <p className="cover-names">{contacts.groom.name}</p>
          <p className="cover-date">
            {cover.dateDot} {cover.dayEn}
          </p>
          <p className="cover-names">{contacts.bride.name}</p>
        </div>
      </div>
    </section>
  );
}
