export default function ArrowRightIcon({ size = 20, stroke = 1.8 }) {
  return (
    <svg
      className="btn-icon"
      width="46"
      height="12"
      viewBox="0 0 46 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* 가로선 */}
      <path
        d="M1 6H32"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />

      {/* 화살촉 */}
      <path
        d="M28 3L34 6L28 9"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
