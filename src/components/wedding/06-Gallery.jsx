// src/components/wedding/06-Gallery.jsx
import { useState, useRef } from "react";
import weddingData from "../../data/weddingData";

// 🔹 여기에서 바로 데이터 가져오기
export default function Gallery() {
  const images = weddingData.gallery || []; // 키 이름 맞게 수정!

  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartXRef = useRef(null);
  const touchEndXRef = useRef(null);

  if (!images || images.length === 0) {
    return null; // 진짜로 데이터 없으면 그때만 안 보이게
  }

  const total = images.length;

  const goTo = (index) => {
    const nextIndex = (index + total) % total;
    setCurrentIndex(nextIndex);
  };

  const handlePrev = () => {
    goTo(currentIndex - 1);
  };

  const handleNext = () => {
    goTo(currentIndex + 1);
  };

  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    touchStartXRef.current = touch.clientX;
    touchEndXRef.current = null;
  };

  const handleTouchMove = (e) => {
    const touch = e.touches[0];
    touchEndXRef.current = touch.clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartXRef.current == null || touchEndXRef.current == null) return;

    const diff = touchStartXRef.current - touchEndXRef.current;
    const threshold = 40;

    if (diff > threshold) {
      handleNext();
    } else if (diff < -threshold) {
      handlePrev();
    }

    touchStartXRef.current = null;
    touchEndXRef.current = null;
  };

  return (
    <section className="gallery">
      <div
        className="gallery-main"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="gallery-slider"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {images.map((src, idx) => (
            <img
              key={idx}
              src={src}
              alt={`웨딩 사진 ${idx + 1}`}
              className="gallery-main-image"
            />
          ))}
        </div>
      </div>
      <div className="gallery-info">사진을 양옆으로 넘겨보세요 👉🏻</div>

      <div className="gallery-thumbs">
        {images.map((src, idx) => (
          <button
            key={idx}
            type="button"
            className={
              idx === currentIndex ? "gallery-thumb active" : "gallery-thumb"
            }
            onClick={() => goTo(idx)}
          >
            <img src={src} alt={`썸네일 ${idx + 1}`} />
          </button>
        ))}
      </div>
    </section>
  );
}
