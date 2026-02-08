import { useState, useRef, useEffect } from "react";
import weddingData from "../../data/weddingData";

export default function Gallery() {
  const images = weddingData.gallery || [];
  const total = images.length;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageRatios, setImageRatios] = useState([]); // height / width
  const touchStartXRef = useRef(null);
  const touchEndXRef = useRef(null);

  // 이미지 로딩 후 비율 계산
  useEffect(() => {
    const ratios = images.map(
      (src) =>
        new Promise((resolve) => {
          const img = new Image();
          img.src = src;
          img.onload = () => resolve(img.height / img.width);
        }),
    );

    Promise.all(ratios).then(setImageRatios);
  }, [images]);

  const goTo = (index) => {
    const nextIndex = (index + total) % total;
    setCurrentIndex(nextIndex);
  };

  const handlePrev = () => goTo(currentIndex - 1);
  const handleNext = () => goTo(currentIndex + 1);

  const handleTouchStart = (e) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchEndXRef.current = null;
  };

  const handleTouchMove = (e) => {
    touchEndXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartXRef.current == null || touchEndXRef.current == null) return;
    const diff = touchStartXRef.current - touchEndXRef.current;
    const threshold = 40;
    if (diff > threshold) handleNext();
    else if (diff < -threshold) handlePrev();
    touchStartXRef.current = null;
    touchEndXRef.current = null;
  };

  if (!images || images.length === 0) return null;

  // 현재 사진 비율에 맞춘 컨테이너 높이
  const currentRatio = imageRatios[currentIndex] || 1; // 기본 1
  const containerHeight = `${Math.min(window.innerWidth * currentRatio, window.innerHeight * 0.8)}px`;

  return (
    <section className="gallery">
      <div
        className="gallery-main"
        style={{ height: containerHeight }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="gallery-slider"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((src, idx) => (
            <img
              key={idx}
              src={src}
              alt={`웨딩 사진 ${idx + 1}`}
              className="gallery-main-image"
              style={{ objectFit: "contain" }}
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
