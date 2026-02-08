// 01-Cover.jsx
import { forwardRef } from "react";
import weddingData from "../../data/weddingData";

export default function Cover() {
  const { cover, contacts } = weddingData;

  const vh = window.innerHeight * 0.01; // innerHeight에 0.01을 곱해서 새로운 vh 단위를 구함
  document.documentElement.style.setProperty("--vh", `${vh}px`);

  return (
    <section className="cover snap-page">
      <div className="cover-inner">
        <div className="cover-top">
          <p className="cover-calligraphy left">Getting</p>
          <p className="cover-calligraphy right">Married</p>
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
