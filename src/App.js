import { ChatProvider } from "./context/ChatContext";
import ChatWindow from "./components/ChatWindow";
import ChatList from "./components/ChatList";

export default function App() {
  return (
    <ChatProvider>
      <div className="flex h-screen">
        <ChatList />
        <ChatWindow />
      </div>
    </ChatProvider>
  );
}
