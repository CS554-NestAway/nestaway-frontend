import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import PaymentGateway from "./components/PaymentGateway";
import { ThemeProvider } from "./contexts/ThemeContext";
import Host from "./components/Host/Host";
import "primeicons/primeicons.css";
import { AuthContext, AuthProvider } from "./contexts/AuthContext";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import UserAccount from "./components/UserAccount";
import { NotificationProvider } from "./contexts/NotificationContext";
import { memo, useContext } from "react";
import useCommon from "./utils/useCommon";
import ListingDetail from "./components/ListingDetail";
import PaymentSuccessful from "./components/PaymentSuccessful";
import Admin from "./components/Admin";
import Bookings from "./components/Bookings";

const CommonHook = memo(() => {
  useCommon();
  return null;
});

CommonHook.displayName = "CommonHook";

const App = () => {
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser);
  return (
    <ThemeProvider>
      <NotificationProvider>
        <CommonHook />
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/host" element={<Host />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/house/:id" element={<ListingDetail />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/account" element={<UserAccount />} />
            <Route path="/payment" element={<PaymentGateway />} />
            <Route path="/paymentSuccessful" element={<PaymentSuccessful />} />
            <Route path="/bookings" element={<Bookings />} />
          </Routes>
        </Router>
      </NotificationProvider>
    </ThemeProvider>
  );
};

export default App;
