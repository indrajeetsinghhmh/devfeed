import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [active, setActive] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLinkClick = (path) => {
    setActive(path);
    setMenuOpen(false);
  };

  return (
    <nav
      className={`
      sticky top-0 bg-white text-black flex h-[9vh] w-[95vw] sm:w-[90vw] md:w-[85vw]
      rounded-3xl sm:rounded-4xl mx-auto my-2 sm:my-4 justify-between items-center
      z-50 px-3 py-2 sm:px-7 sm:py-4 transition-all duration-300 ease-in-out
      ${scrolled ? "shadow-2xl" : "shadow-none"}`}
      style={{ backdropFilter: "saturate(180%) blur(20px)" }}
    >
      {/* Logo Section */}
      <div className="logo flex items-center relative cursor-pointer">
        <img src="/logo.svg" width={40} className="sm:w-[60px]" alt="logo" />
        <div className="flex flex-col gap-0">
          <h2 className="font-bold md:block md:text-xl absolute md:left-14 top-1 sm:top-2">
            devFeed
          </h2>
          <p className="text-xs md:block md:text-sm w-full absolute top-5 sm:top-7 whitespace-nowrap">
            by Winny
          </p>
        </div>
      </div>

      {/* Center nav links on desktop */}
      <div className="features hidden sm:flex gap-4 sm:gap-8 md:gap-10 text-base sm:text-lg md:text-xl">
        {["/", "/about", "/contact"].map((path) => (
          <Link
            key={path}
            to={path}
            onClick={() => handleLinkClick(path)}
            className={`
              relative 
              font-normal
              hover:font-bold 
              ${active === path ? "font-bold" : ""}
              after:absolute after:left-0 after:-bottom-1 after:h-[2px]
              after:w-0 after:bg-black after:transition-all after:duration-300
              hover:after:w-full 
              ${active === path ? "after:w-full" : ""}
            `}
          >
            {path === "/"
              ? "Home"
              : path.substring(1).charAt(0).toUpperCase() + path.substring(2)}
          </Link>
        ))}
      </div>

      <div className="flex items-center relative gap-2 sm:gap-4">
        {/* Start/Open Button */}
        <Link to={isLoggedIn ? "/posts" : "/login"}>
          <div className="login bg-[#4A154B] py-1 px-2 sm:py-2 sm:px-3 rounded cursor-pointer hover:bg-[#4a154bdd] transition duration-300">
            <button className="cursor-pointer text-white font-semibold text-xs sm:text-base">
              {isLoggedIn ? "OPEN NOW" : "START HERE"}
            </button>
          </div>
        </Link>

        {/* Hamburger Button on small screens - right of button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="sm:hidden flex flex-col gap-[5px] cursor-pointer z-50"
          aria-label="Toggle menu"
        >
          <span
            className={`h-[2px] w-6 bg-black transition-transform duration-300 ease-in-out ${
              menuOpen ? "rotate-45 translate-y-1.5" : ""
            }`}
          />
          <span
            className={`h-[2px] w-6 bg-black transition-opacity duration-300 ease-in-out ${
              menuOpen ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`h-[2px] w-6 bg-black transition-transform duration-300 ease-in-out ${
              menuOpen ? "-rotate-45 -translate-y-1.5" : ""
            }`}
          />
        </button>

        {/* Dropdown Nav Links for mobile - right-aligned */}
        {menuOpen && (
          <div
            className="
              absolute top-[calc(9vh-0.7rem)] right-0 bg-white rounded-b-3xl shadow-md
              flex flex-col gap-4 py-4 px-6 min-w-[140px] z-40
            "
          >
            {["/", "/about", "/contact"].map((path) => (
              <Link
                key={path}
                to={path}
                onClick={() => handleLinkClick(path)}
                className={`
                  relative 
                  font-normal
                  hover:font-bold 
                  ${active === path ? "font-bold" : ""}
                  after:absolute after:left-0 after:-bottom-1 after:h-[2px]
                  after:w-0 after:bg-black after:transition-all after:duration-300
                  hover:after:w-full 
                  ${active === path ? "after:w-full" : ""}
                `}
              >
                {path === "/"
                  ? "Home"
                  : path.substring(1).charAt(0).toUpperCase() +
                    path.substring(2)}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
