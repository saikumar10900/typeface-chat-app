import formatTime from "../utils/timeHelper";

export default function Message({ user, time, text }) {
  const isSender = user === "You";

  return (
    <div
      className={`flex ${isSender ? "justify-end" : "justify-start"} px-4 mb-2`}
    >
      <div
        className={`
          relative max-w-[70%] px-4 py-2 rounded-lg shadow-sm text-sm
          ${
            isSender
              ? "bg-blue-500 text-white rounded-br-none"
              : "bg-gray-200 text-black rounded-bl-none"
          }
        `}
      >
        <div className="break-words pr-10">{text}</div>
        <div className="absolute bottom-1 right-2 text-[10px] opacity-70">
          {formatTime(time)}
        </div>
      </div>
    </div>
  );
}
