import { useState } from "react";
import { useChat } from "../context/ChatContext";

export default function ChatList() {
  const { chats, selectChat, deleteChat, createChat, selectedChatId } =
    useChat();
  const [newChatName, setNewChatName] = useState("");

  const handleCreateChat = () => {
    if (!newChatName) alert("Please enter chat name");
    if (newChatName.trim() !== "") {
      createChat(newChatName.trim());
      setNewChatName("");
    }
  };

  return (
    <div className="w-1/4 bg-gray-100 p-4 overflow-y-auto">
      <h2 className="text-xl font-bold mb-4">Chats</h2>
      <input
        type="text"
        placeholder="New Chat Name"
        value={newChatName}
        onChange={(e) => setNewChatName(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleCreateChat();
        }}
        className="p-2 w-full mb-2 border rounded"
      />
      <button
        onClick={handleCreateChat}
        className="w-full p-2 bg-blue-500 text-white mb-4 rounded"
      >
        Create Chat
      </button>
      <ul>
        {chats.map((chat) => (
          <li
            key={chat.id}
            className={`flex justify-between items-center p-2 mb-2 rounded cursor-pointer hover:bg-gray-200 ${
              selectedChatId === chat.id ? "bg-blue-300" : "bg-white"
            }`}
            onClick={() => selectChat(chat.id)}
          >
            <span>{chat.name}</span>
            <button
              onClick={() => deleteChat(chat.id)}
              className="text-red-500"
            >
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
