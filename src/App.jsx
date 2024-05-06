import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import { ThemeProvider } from "./contexts/ThemeContext";
// import { PrimeReactProvider } from "primereact/api";
import Host from "./components/Host/Host";
import "primeicons/primeicons.css";
import { AuthProvider } from "./contexts/AuthContext";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import UserAccount from "./components/UserAccount";
import { NotificationProvider } from "./contexts/NotificationContext";

const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <NotificationProvider>
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
