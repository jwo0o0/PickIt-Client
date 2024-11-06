export default function formatChatTimestamp(isoString: string): string {
  const date = new Date(isoString);
  const today = new Date();

  const isToday =
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate();

  const year = date.getFullYear();
  const month = date.getMonth() + 1; // 월은 0부터 시작하므로 +1
  const day = date.getDate();

  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");

  const period = hours < 12 ? "오전" : "오후";
  const formattedHour = hours % 12 || 12;

  if (isToday) {
    return `${period} ${formattedHour}:${minutes}`;
  }

  return `${year}년 ${month}월 ${day}일 ${period} ${formattedHour}:${minutes}`;
}
