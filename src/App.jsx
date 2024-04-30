import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import PaymentGateway from "./components/PaymentGateway";
import { ThemeProvider } from "./contexts/ThemeContext";

const App = () => {
  return (
    <ThemeProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/payment" element={<PaymentGateway />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
