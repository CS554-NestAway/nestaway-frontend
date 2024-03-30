import { useEffect, useState } from "react";
import MenuSvg from "../assets/MenuSvg";
import logo from "/logo.png";
import { Link, useLocation } from "react-router-dom";
import { changeTheme } from "../utils/helper";

const Navbar = () => {
  const { pathname } = useLocation();
  const [openNavigation, setOpenNavigation] = useState(false);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    changeTheme(theme);
  }, []);
  const toggleNavigation = () => {
    if (openNavigation) {
      setOpenNavigation(false);
    } else {
      setOpenNavigation(true);
    }
  };
  const toggleDarkTheme = () => {
    setTheme((prevTheme) => (prevTheme == "light" ? "dark" : "light"));
    theme === "light" ? changeTheme("dark") : changeTheme("light");
  };
  return (
    <div className={`static w-full top-0 bg-primary z-50`}>
      <div className="flex items-center justify-between px-5 py-1">
        <Link
          className="flex justify-center items-center font-comic font-bold w-[12rem] text-accent2 text-3xl hover:text-secondary"
          to="/"
        >
          <img src={logo} width={70} height={40} alt="Nestaway" />
          Nestaway
        </Link>
        <div
          className={`${
            openNavigation ? "flex" : "hidden"
          } fixed top-[4rem] right-0 w-48 bg-accent1 shadow-shadow1 rounded-lg mr-2`}
        >
          <div className="relative z-2 flex flex-col items-center justify-center w-full">
            <Link
              key="login"
              to="/login"
              className={`block relative font-didact text-accent2 transition-colors hover:bg-secondary px-6 py-2 w-full`}
            >
              Login
            </Link>
            <Link
              key="signup"
              to="/signup"
              className={`block relative font-didact text-accent2 transition-colors hover:bg-secondary px-6 py-2 w-full`}
            >
              Signup
            </Link>
          </div>
        </div>
        <div className="flex gap-2">
          <Link
            className={`flex justify-center py-2 px-4 rounded-lg items-center font-didact uppercase bg-primary transition-colors hover:text-primary ${
              pathname?.includes("host") ? "z-10 text-primary" : "text-accent1"
            } bg-secondary`}
            to="/host"
          >
            Nest your Home
          </Link>
          <button
            className={`text-accent1 rounded-lg ml-auto px-2 bg-secondary hover:text-primary`}
            onClick={toggleDarkTheme}
          >
            Theme
          </button>
          <button
            className={`bg-secondary flex items-center gap-2 text-accent1 rounded-lg ml-auto px-2 hover:text-primary`}
            onClick={toggleNavigation}
          >
            User
            <MenuSvg openNavigation={openNavigation} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
