export default function formatTime(inputTime) {
  const date = new Date(`1970-01-01T${inputTime}`);
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}
