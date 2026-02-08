// year: 2025, month: 0~11
export default function getCalendarCells(year, month) {
  const firstDay = new Date(year, month, 1).getDay(); // 요일(0=일)
  const lastDate = new Date(year, month + 1, 0).getDate(); // 마지막 날짜

  const cells = [];

  // 1일 앞에 비어있는 칸 채우기
  for (let i = 0; i < firstDay; i++) {
    cells.push(null);
  }

  // 날짜 채우기
  for (let d = 1; d <= lastDate; d++) {
    cells.push(d);
  }

  // 끝부분도 7의 배수 맞추기
  while (cells.length % 7 !== 0) {
    cells.push(null);
  }

  return cells;
}
