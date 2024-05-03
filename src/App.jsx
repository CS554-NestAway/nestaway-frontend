import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider } from "./contexts/AuthContext";
import SignUp from "./components/SignUp";
import Login from "./components/Login"; 
import Landing from "./components/Landing";


const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/landing" element={<Landing />} />
        </Routes>
      </Router>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
