import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import { ThemeProvider } from "./contexts/ThemeContext";
import Host from "./components/Host/Host";

const App = () => {
  return (
    <ThemeProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/host" element={<Host />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
