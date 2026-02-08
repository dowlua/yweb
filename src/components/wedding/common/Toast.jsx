import ReactDOM from "react-dom";
import "../../../styles/global.css";

export default function Toast({ message }) {
  if (!message) return null;

  return ReactDOM.createPortal(
    <div className="toast">{message}</div>,
    document.body,
  );
}
