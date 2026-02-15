import { useState, useEffect } from "react";
import weddingData from "../../data/weddingData";
import KakaoMap from "./common/KakaoMap";
import mapKaKao from "../../assets/map-kakao.svg";
import mapTmap from "../../assets/map-tmap.svg";
import mapNaver from "../../assets/map-naver.png";
import Toast from "./common/Toast";

export default function Map() {
  const { location } = weddingData;
  const [toastMsg, setToastMsg] = useState("");

  const lat = Number(location.lo);
  const lng = Number(location.la);
  const placeName = "밀리토피아호텔 바이마린 웨딩센터".trim();

  useEffect(() => {
    if (!window.Kakao) return;

    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(import.meta.env.VITE_KAKAO_MAP_KEY);
    }
  }, []);

  const handleKakaoNavi = () => {
    if (!window.Kakao || !window.Kakao.Navi) return;

    if (Number.isNaN(lat) || Number.isNaN(lng)) {
      console.error("❌ KakaoNavi 좌표 이상:", location.la, location.lo);
      return;
    }

    window.Kakao.Navi.share({
      name: placeName || location.name,
      x: lng,
      y: lat,
      coordType: "wgs84",
    });
  };

  const handleTmap = () => {
    const url = `tmap://route?goalx=${lng}&goaly=${lat}&goalname=${encodeURIComponent(
      placeName,
    )}`;

    window.location.href = url;
  };

  const handleNaverMap = () => {
    const url = `nmap://route/public?dlat=${lat}&dlng=${lng}&dname=${encodeURIComponent(
      placeName,
    )}&appname=${window.location.host}`;
    window.location.href = url;
  };

  const copyToClipboard = (text) => {
    if (!navigator.clipboard) return; // http 환경 대비
    navigator.clipboard.writeText(text).then(() => {
      setToastMsg("주소가 복사되었습니다 🤍");

      setTimeout(() => setToastMsg(""), 2500);
    });
  };

  return (
    <section className="map">
      <h1 className="section-title">location</h1>
      <div className="map-container">
        <KakaoMap />
      </div>
      <div className="map-card">
        <div className="map-navi">
          <button type="button" className="map-kakao" onClick={handleKakaoNavi}>
            <img src={mapKaKao} />
            카카오내비
          </button>

          <button type="button" className="map-tmap" onClick={handleTmap}>
            <img src={mapTmap} />
            티맵
          </button>

          <button type="button" className="map-naver" onClick={handleNaverMap}>
            <img src={mapNaver} />
            네이버지도
          </button>
        </div>

        <div className="map-address">
          <p>
            {location.address}
            <br />
            <span className="bold">
              {location.name} {location.hallname}
            </span>
          </p>
          <button
            className="circle map-copy"
            onClick={() => copyToClipboard(location.address)}
          >
            복사
          </button>

          {toastMsg && (
            <Toast message={toastMsg} onClose={() => setToastMsg("")} />
          )}
        </div>

        <div className="map-desc">
          <p className="title">셔틀버스</p>
          <p className="desc">
            남위례역 5번출구 ↔ 호텔
            <br />
            15분 간격으로 운행
            <br />
            (예식 1시간 전부터 예식 후 2시간까지)
          </p>
        </div>
        <div className="map-desc">
          <p className="title">지하철</p>
          <p className="desc">8호선 남위례역 3번출구 도보 9분</p>
        </div>
        <div className="map-desc">
          <p className="title">버스</p>
          <p className="desc">
            위례 힐스테이트 / 밀리토피아호텔 바이 마린 앞 하차
            <br />
            서울버스343번, 345번, 3420번
            <br />
            성남버스50번, 231번
            <br />
            광역버스9200번, 9202번
          </p>
        </div>
      </div>
    </section>
  );
}
