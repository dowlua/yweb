import { useState, useRef } from "react";
import ReactDOM from "react-dom";

// ...compressImage, blobToDataUrl 등 기존 함수 그대로

export default function GuestPhotoModal({ onClose, onSuccess }) {
  const [name, setName] = useState("");
  const [side, setSide] = useState("신부측");
  const [files, setFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [progressText, setProgressText] = useState("");

  const fakeProgressTimerRef = useRef(null);
  const MAX_PHOTOS_PER_UPLOAD = 40;

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
    if (!name.trim()) return alert("이름을 입력해 주세요.");
    if (files.length === 0) return alert("업로드할 사진을 선택해 주세요.");

    try {
      setIsUploading(true);
      setProgressText("");

      const total = files.length;
      let prepared = 0;
      const imagesPayload = [];

      for (const file of files) {
        let dataToUpload = file;
        if (file.size > 5 * 1024 * 1024)
          dataToUpload = await compressImage(file);
        const dataUrl = await blobToDataUrl(dataToUpload);
        imagesPayload.push({ filename: file.name, dataUrl });

        prepared += 1;
        setProgressText(`( ${prepared} / ${total}장 준비 중 )`);
      }

      // fake progress
      let fakeUploaded = 0;
      setProgressText(`( ${fakeUploaded} / ${total}장 )`);
      clearFakeProgressTimer();
      fakeProgressTimerRef.current = setInterval(() => {
        fakeUploaded += 1;
        if (fakeUploaded > total) fakeUploaded = total;
        setProgressText(`( ${fakeUploaded} / ${total}장 )`);
      }, 600);

      await fetch(SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({
          name: name.trim(),
          side,
          images: imagesPayload,
        }),
      });

      clearFakeProgressTimer();
      onSuccess?.();

      setName("");
      setSide("신부측");
      setFiles([]);
      setProgressText("");
    } catch (err) {
      console.error(err);
      clearFakeProgressTimer();
      alert("업로드 중 오류가 발생했습니다.");
    } finally {
      setIsUploading(false);
    }
  };

  return ReactDOM.createPortal(
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
                    className={`modal-toggle-btn ${side === "신랑측" ? "active" : ""}`}
                    onClick={() => setSide("신랑측")}
                  >
                    🤵🏻‍ 신랑
                  </button>
                  <button
                    type="button"
                    className={`modal-toggle-btn ${side === "신부측" ? "active" : ""}`}
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
                    현재 <span className="bold">{files.length}장</span> 선택됨
                    (최대 40장)
                  </p>
                )}
              </div>

              <button type="submit" className="modal-submit">
                업로드하기
              </button>
            </form>
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
    </div>,
    document.body,
  );
}
