import audioFile from "../../../assets/background_music.mp3";
import { useEffect, useRef, useState } from "react";

const Audiocomp = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true); // 🔥 기본값: 재생 중 상태

  // 🔊 오디오 생성 함수
  const initAudio = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(audioFile);
      audioRef.current.loop = true;
      audioRef.current.volume = 0.6;
    }
  };

  // ▶️ 자동 재생 시도
  useEffect(() => {
    initAudio();

    audioRef.current
      .play()
      .then(() => {
        setIsPlaying(true);
      })
      .catch(() => {
        // iOS에서 자동재생 막히는 경우
        setIsPlaying(false);
      });

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // 🔁 버튼 토글
  const handleAudioToggle = () => {
    initAudio();

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <button className="audio-button" onClick={handleAudioToggle}>
      {isPlaying ? "🎵" : "🔇"}
    </button>
  );
};

export default Audiocomp;
