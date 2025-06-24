import { useState } from "react";
import { useChat } from "../context/ChatContext";
import Message from "./Message";

export default function ChatWindow() {
  const { chats, selectedChatId, messages, sendMessage } = useChat();
  const [input, setInput] = useState("");

  if (!selectedChatId) {
    return (
      <div className="w-3/4 flex items-center justify-center text-gray-500">
        Select a chat to start messaging
      </div>
    );
  }

  const chat = chats.find((c) => c.id === selectedChatId);
  const chatMessages = messages[selectedChatId] || [];

  const handleSend = () => {
    if (input.trim() !== "") {
      sendMessage(selectedChatId, input);
      setInput("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="w-3/4 flex flex-col h-full border-l">
      <div className="flex items-center gap-3 p-4 bg-blue-600 text-white text-lg font-medium shadow sticky top-0 z-10">
        <div className="w-10 h-10 bg-white text-blue-600 rounded-full flex items-center justify-center font-bold">
          {chat?.name?.charAt(0).toUpperCase()}
        </div>
        {chat?.name}
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-2 bg-gray-50">
        {chatMessages.map((msg) => (
          <Message
            key={msg.id}
            user={msg.user}
            time={msg.time}
            text={msg.text}
          />
        ))}
      </div>

      <div className="p-4 flex border-t bg-white">
        <textarea
          rows={1}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 p-2 border rounded mr-2 resize-none"
          placeholder="Enter a message..."
        />
        <button
          onClick={handleSend}
          className="p-2 bg-blue-600 text-white rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
}
