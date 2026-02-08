// WeddingPage.jsx
import { useRef, useState } from "react";
import IntroOverlay from "../components/wedding/IntroOverlay";
import Cover from "../components/wedding/01-Cover";
import Intro from "../components/wedding/02-Intro";
import Invitation from "../components/wedding/03-Invitation";
import Calendar from "../components/wedding/04-Calendar";
import Attendance from "../components/wedding/05-Attendance";
import Gallery from "../components/wedding/06-Gallery";
import MapSection from "../components/wedding/07-Map";
import Account from "../components/wedding/08-Account";
import GuestPhoto from "../components/wedding/09-GuestPhoto";
import Ending from "../components/wedding/10-Ending";
import Audiocomp from "../components/wedding/common/AudioComp";
import "../styles/global.css";

export default function WeddingPage() {
  const introRef = useRef(null);
  const [showIntro, setShowIntro] = useState(true);

  const handleIntroFinish = () => {
    setShowIntro(false);
    document.body.style.overflow = ""; // 스크롤 다시 허용
  };

  return (
    <>
      <Audiocomp />
      {showIntro && <IntroOverlay onFinish={handleIntroFinish} />}
      <Cover />
      <Intro />
      <Invitation />
      <Calendar />
      <Attendance />
      <Gallery />
      <MapSection />
      <Account />
      <GuestPhoto />
      <Ending />
    </>
  );
}
