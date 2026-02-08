import { useEffect, useRef } from "react";
import heartMarker from "../../../assets/heart-marker.svg";
import weddingData from "../../../data/weddingData";

export default function KakaoMap() {
  // 1) 먼저 weddingData에서 location 꺼내고
  const { location } = weddingData;

  // 2) 그 다음에 la, lo를 구조분해
  const { la, lo } = location; // 👉 이제 여기 la, lo가 weddingData.location에서 옴

  const mapRef = useRef(null);

  useEffect(() => {
    const loadMap = () => {
      const { kakao } = window;
      if (!kakao || !kakao.maps || !mapRef.current) return;

      // 지도 옵션
      const options = {
        center: new kakao.maps.LatLng(lo, la), // 여기서 la, lo 사용
        level: 3,
      };

      const map = new kakao.maps.Map(mapRef.current, options);

      // 마커 위치
      const markerPosition = new kakao.maps.LatLng(lo, la);

      const imageSize = new kakao.maps.Size(40, 40);
      const imageOption = {
        offset: new kakao.maps.Point(20, 40),
      };

      const markerImage = new kakao.maps.MarkerImage(
        heartMarker,
        imageSize,
        imageOption
      );

      const marker = new kakao.maps.Marker({
        position: markerPosition,
        image: markerImage,
      });

      marker.setMap(map);
    };

    if (window.kakao && window.kakao.maps) {
      window.kakao.maps.load(loadMap);
      return;
    }

    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${
      import.meta.env.VITE_KAKAO_MAP_KEY
    }&autoload=false`;
    script.async = true;
    script.onload = () => {
      window.kakao.maps.load(loadMap);
    };
    document.head.appendChild(script);
  }, [la, lo]); // 좌표 바뀌면 다시 로드되도록

  return <div ref={mapRef} style={{ width: "100%", height: "100%" }} />;
}
