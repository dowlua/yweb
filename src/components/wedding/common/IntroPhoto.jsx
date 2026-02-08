import photo from "../../../assets/intro-photo.jpg";
import bubbleLeft from "../../../assets/bubble-left.png";
import bubbleRight from "../../../assets/bubble-right.png";

export default function IntroPhoto({ active }) {
  return (
    <div className="intro-photo">
      <img src={photo} alt="" className="intro-photo-img" />

      <img
        src={bubbleRight}
        alt=""
        className={`speech-bubble speech-right ${active ? "bubble-active" : ""}`}
      />
      <img
        src={bubbleLeft}
        alt=""
        className={`speech-bubble speech-left ${active ? "bubble-active" : ""}`}
      />
    </div>
  );
}
