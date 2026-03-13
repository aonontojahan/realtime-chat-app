import Sidebar from "./Sidebar"
import ChannelList from "./ChannelList"
import ChatWindow from "../chat/ChatWindow"

export default function ChatLayout() {

  return (
    <div className="flex h-screen">

      <Sidebar />

      <ChannelList />

      <ChatWindow />

    </div>
  )
}