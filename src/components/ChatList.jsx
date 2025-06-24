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
      <div className="flex mb-4 gap-2">
        <input
          type="text"
          placeholder="Chat name"
          value={newChatName}
          onChange={(e) => setNewChatName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleCreateChat();
          }}
          className="p-2 flex-1 border rounded"
        />
        <button
          onClick={handleCreateChat}
          className="px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600"
        >
          New
        </button>
      </div>
      <ul>
        {chats.map((chat) => (
          <li
            key={chat.id}
            className={`flex justify-between items-center p-2 mb-2 rounded cursor-pointer hover:bg-blue-100 ${
              selectedChatId === chat.id ? "bg-blue-300" : "bg-white"
            }`}
          >
            <span onClick={() => selectChat(chat.id)}>{chat.name}</span>
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
