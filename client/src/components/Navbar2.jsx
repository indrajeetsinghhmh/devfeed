import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar2 = () => {
  const [username, setUsername] = useState("");
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        const parsed = JSON.parse(userData);
        setUsername(parsed.name || "Developer");
      } catch {
        setUsername("Developer");
      }
    } else {
      setUsername("Developer");
    }
  }, []);

  const navLinks = [
    { path: "/posts", label: "Show All" },
    { path: "/create", label: "Create" },
    { path: "/mine", label: "Mine" },
  ];

  // Close mobile menu when a nav link is clicked
  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  return (
    <nav
      className="
        sticky top-0 bg-white text-black flex h-[9vh] w-full max-w-[95vw] sm:max-w-[90vw] md:max-w-[85vw]
        rounded-3xl sm:rounded-4xl mx-auto my-2 sm:my-4 
        justify-between items-center z-50 shadow-2xl transition-all duration-300 ease-in-out
        px-3 sm:px-7 py-2 sm:py-4
      "
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
        {navLinks.map((nav) => {
          const isActive = location.pathname === nav.path;
          return (
            <Link
              key={nav.path}
              to={nav.path}
              className={`
                relative font-normal hover:font-bold 
                after:absolute after:left-0 after:-bottom-1 after:h-[2px] 
                after:bg-black after:transition-all after:duration-300
                hover:after:w-full
                ${
                  isActive
                    ? "font-bold after:w-full after:bg-black text-[#4A154B]"
                    : "after:w-0"
                }
              `}
            >
              {nav.label}
            </Link>
          );
        })}
      </div>

      {/* Username button and hamburger container */}
      <div className="flex items-center relative gap-2 sm:gap-4 min-w-0">
        {/* Username Button */}
        <Link to="/dashboard">
          <div className="bg-[#4A154B] py-1 px-3 sm:py-2 sm:px-4 rounded cursor-pointer hover:bg-[#4a154bdd] transition duration-300">
            <button className="text-white font-semibold text-xs sm:text-base cursor-pointer">
              {username}
            </button>
          </div>
        </Link>

        {/* Hamburger Button on small screens */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="sm:hidden flex flex-col gap-[5px] cursor-pointer z-50 min-w-[24px]"
          aria-label="Toggle menu"
          type="button"
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
              flex flex-col gap-4 py-4 px-6 min-w-[140px] max-w-[80vw] z-40
            "
            style={{ boxShadow: "0 10px 15px rgba(0,0,0,0.1)" }}
          >
            {navLinks.map((nav) => {
              const isActive = location.pathname === nav.path;
              return (
                <Link
                  key={nav.path}
                  to={nav.path}
                  onClick={handleLinkClick}
                  className={`
                    relative font-normal hover:font-bold 
                    after:absolute after:left-0 after:-bottom-1 after:h-[2px]
                    after:w-0 after:bg-black after:transition-all after:duration-300
                    hover:after:w-full
                    ${
                      isActive
                        ? "font-bold after:w-0 after:bg-black text-[#4A154B]"
                        : ""
                    }
                  `}
                >
                  {nav.label}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar2;
