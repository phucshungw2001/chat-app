import "./App.css";
import { publicRoutes } from "./router/index";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "./components/Context/auth";
import AppProvider from "./components/Context/appProvider";
import AddRoomModal from "./components/Modals/AddRoomModal";
import InviteMemberModal from "./components/Modals/InviteMemberModal";

function App() {
  return (
    <Router>
      <Auth>
        <AppProvider>
          <Routes>
            {publicRoutes.map((route, index) => {
              const Page = route.component;
              return <Route key={index} path={route.path} element={<Page />} />;
            })}
          </Routes>
          <AddRoomModal/>
          <InviteMemberModal/>
        </AppProvider>
      </Auth>
    </Router>
  );
}

export default App;
