import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import { ThemeProvider } from "./contexts/ThemeContext";
import BookingsHost from "./components/BookingsHost";
import BookingsGuest from "./components/BookingsGuest";
import BookingHost from "./components/BookingHost";
import BookingGuest from "./components/BookingGuest";

const App = () => {
  return (
    <ThemeProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/bookings/host" element={BookingsHost} />
          <Route path="/bookings/guest" element={BookingsGuest} />
          <Route path="/bookings/host/:houseId" element={BookingHost} />
          <Route path="/bookings/guest/:houseId" element={BookingGuest} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
