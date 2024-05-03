import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import { ThemeProvider } from "./contexts/ThemeContext";
// import { PrimeReactProvider } from "primereact/api";
import Host from "./components/Host/Host";
import "primeicons/primeicons.css";

const App = () => {
  return (
    <ThemeProvider>
      {/* <PrimeReactProvider> */}
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/host" element={<Host />} />
        </Routes>
      </Router>
      {/* </PrimeReactProvider> */}
    </ThemeProvider>
  );
};

export default App;
