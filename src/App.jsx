import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import { ThemeProvider } from "./contexts/ThemeContext";
import Host from "./components/Host/Host";
import "primeicons/primeicons.css";
import { AuthProvider } from "./contexts/AuthContext";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import UserAccount from "./components/UserAccount";
import { NotificationProvider } from "./contexts/NotificationContext";
import { memo } from "react";
import useCommon from "./utils/useCommon";

const CommonHook = memo(() => {
  useCommon();
  return null;
});

CommonHook.displayName = "CommonHook";

const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <NotificationProvider>
          <CommonHook />
          <Router>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/host" element={<Host />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
              <Route path="/account" element={<UserAccount />} />
            </Routes>
          </Router>
        </NotificationProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
