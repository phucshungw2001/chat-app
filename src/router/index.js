import Login from "../components/Login";
import ChatRoom from "../components/ChatRoom";

const publicRoutes = [
  { path: '/', component: Login },
  { path: '/chatroom', component: ChatRoom },
];

export { publicRoutes };
