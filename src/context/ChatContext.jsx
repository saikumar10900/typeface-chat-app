import { useEffect, createContext, useContext, useState } from "react";
import { getChats, getMessages } from "../data/mockApi";

const ChatContext = createContext();

export const useChat = () => useContext(ChatContext);

export const ChatProvider = ({ children }) => {
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState({});
  const [selectedChatId, setSelectedChatId] = useState(null);

  useEffect(() => {
    getChats().then((data) => setChats(data));
  }, []);

  const selectChat = (chatId) => {
    setSelectedChatId(chatId);
    if (!messages[chatId]) {
      getMessages(chatId).then((msgs) =>
        setMessages((prev) => ({ ...prev, [chatId]: msgs }))
      );
    }
  };

  const sendMessage = (chatId, newMessage) => {
    const timestamp = new Date().toLocaleTimeString();
    const messageObj = {
      id: Date.now(),
      user: "You",
      time: timestamp,
      text: newMessage,
    };

    setMessages((prev) => ({
      ...prev,
      [chatId]: [...(prev[chatId] || []), messageObj],
    }));
  };

  const createChat = (chatName) => {
    const newChat = { id: Date.now().toString(), name: chatName };
    setChats((prev) => [...prev, newChat]);
    selectChat(newChat.id);
  };

  const deleteChat = (chatId) => {
    setChats((prev) => prev.filter((chat) => chat.id !== chatId));
    setMessages((prev) => {
      const { [chatId]: removed, ...rest } = prev;
      return rest;
    });
    if (selectedChatId === chatId) setSelectedChatId(null);
  };

  return (
    <ChatContext.Provider
      value={{
        chats,
        messages,
        selectedChatId,
        selectChat,
        sendMessage,
        createChat,
        deleteChat,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
