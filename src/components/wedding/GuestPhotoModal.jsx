// GuestPhotoModal.jsx
import { useState, useRef } from "react";

const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbz_ZgaGMqUewhn-g7RTN6CWJZwNuAjK2KbJDm7Bzb9_rQcJm3QIS1jtr3Yf_ZCjdPZ4/exec";

// 원본 파일을 3000px 기준으로 줄이고, jpeg 0.92 품질로 압축
const compressImage = (file) =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const maxSize = 3000;

      let width = img.width;
      let height = img.height;

      if (width > height && width > maxSize) {
        height = (height * maxSize) / width;
        width = maxSize;
      } else if (height >= width && height > maxSize) {
        width = (width * maxSize) / height;
        height = maxSize;
      }

      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error("이미지 압축 실패"));
            return;
          }
          resolve(blob);
        },
        "image/jpeg",
        0.92
      );
    };

    img.onerror = (err) => reject(err);

    img.src = URL.createObjectURL(file);
  });

// Blob/File → dataURL 로 변환
const blobToDataUrl = (blob) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });

export default function GuestPhotoModal({ onClose, onSuccess }) {
  const [name, setName] = useState("");
  const [side, setSide] = useState("신부측");
  const [files, setFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [progressText, setProgressText] = useState("");

  const MAX_PHOTOS_PER_UPLOAD = 40; // 한 번에 올릴 수 있는 최대 장수

  // 가짜 진행률 타이머 저장용
  const fakeProgressTimerRef = useRef(null);

  const clearFakeProgressTimer = () => {
    if (fakeProgressTimerRef.current) {
      clearInterval(fakeProgressTimerRef.current);
      fakeProgressTimerRef.current = null;
    }
  };

  const handleFileChange = (e) => {
    const selected = Array.from(e.target.files || []);
    if (selected.length > MAX_PHOTOS_PER_UPLOAD) {
      alert(`한 번에 최대 ${MAX_PHOTOS_PER_UPLOAD}장까지 선택할 수 있어요.`);
      setFiles(selected.slice(0, MAX_PHOTOS_PER_UPLOAD));
      return;
    }
    setFiles(selected);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      alert("이름을 입력해 주세요.");
      return;
    }

    if (files.length === 0) {
      alert("업로드할 사진을 선택해 주세요.");
      return;
    }

    const safeName = name.trim().replace(/\s+/g, "");

    try {
      setIsUploading(true);
      setProgressText("");

      const total = files.length;
      let prepared = 0;
      const imagesPayload = [];

      // 1️⃣ 파일들을 하나씩 압축 + dataURL 로 변환 (여기는 진짜 준비 진행률)
      for (const file of files) {
        let dataToUpload = file;

        if (file.size > 5 * 1024 * 1024) {
          dataToUpload = await compressImage(file);
        }

        const dataUrl = await blobToDataUrl(dataToUpload);

        imagesPayload.push({
          filename: file.name,
          dataUrl,
        });

        prepared += 1;
        setProgressText(`( ${prepared} / ${total}장 준비 중 )`);
      }

      // 2️⃣ 서버로 전송하는 동안 “가짜 업로드 진행률” 보여주기
      //    (실제 업로드와는 무관, 감성용 표시)
      let fakeUploaded = 0;
      setProgressText(`( ${fakeUploaded} / ${total}장 )`);

      clearFakeProgressTimer();
      fakeProgressTimerRef.current = setInterval(() => {
        fakeUploaded += 1;
        if (fakeUploaded > total) fakeUploaded = total;
        setProgressText(`( ${fakeUploaded} / ${total}장 )`);
      }, 600); // 0.6초마다 1장씩 올라가게 (원하면 숫자 바꿔도 됨)

      // 3️⃣ Apps Script 웹앱으로 전송 (no-cors)
      await fetch(SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify({
          name: safeName,
          side,
          images: imagesPayload,
        }),
      });

      clearFakeProgressTimer();

      if (onSuccess) onSuccess();

      setName("");
      setSide("신부측");
      setFiles([]);
      setProgressText("");
    } catch (err) {
      console.error(err);
      clearFakeProgressTimer();
      alert("업로드 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-wrapper" onClick={(e) => e.stopPropagation()}>
        <div className="modal">
          {isUploading ? (
            <div className="modal-loading">
              <p className="loading-icon">⏳</p>
              <p className="loading-message bold">
                사진을 업로드 중입니다 ☺️{" "}
                {progressText && (
                  <span className="modal-progress">{progressText}</span>
                )}
              </p>
            </div>
          ) : (
            <>
              <form onSubmit={handleSubmit} className="modal-form">
                <div className="modal-row">
                  <p className="modal-label">
                    <span className="bold">성함</span>을 적어주세요.
                  </p>
                  <input
                    type="text"
                    className="modal-input"
                    placeholder="입력하신 성함으로 폴더가 생성됩니다"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="modal-row">
                  <p className="modal-label">
                    <span className="bold">어느 측 하객</span>이신가요?
                  </p>
                  <div className="modal-toggle">
                    <button
                      type="button"
                      className={`modal-toggle-btn ${
                        side === "신랑측" ? "active" : ""
                      }`}
                      onClick={() => setSide("신랑측")}
                    >
                      🤵🏻‍ 신랑
                    </button>

                    <button
                      type="button"
                      className={`modal-toggle-btn ${
                        side === "신부측" ? "active" : ""
                      }`}
                      onClick={() => setSide("신부측")}
                    >
                      👰🏻‍♀‍ 신부
                    </button>
                  </div>
                </div>

                <div className="file-upload">
                  <label className="file-upload-label">
                    📸 사진 선택
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleFileChange}
                      className="file-input-hidden"
                    />
                  </label>

                  {files.length > 0 && (
                    <p className="photo-count">
                      현재 <span className="bold">{files.length}장</span>이
                      선택됐습니다. 40장까지 가능해요! 😎
                    </p>
                  )}
                </div>

                <button type="submit" className="modal-submit">
                  업로드하기
                </button>
              </form>
            </>
          )}
        </div>

        <button
          type="button"
          className="modal-floating-close circle"
          onClick={onClose}
          disabled={isUploading}
        >
          ×
        </button>
      </div>
    </div>
  );
}
