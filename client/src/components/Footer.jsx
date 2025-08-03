import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#0A0C4C] text-white pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold flex items-center">
              <span className="text-[#F5F3B3]">Dev</span>Feed
            </h3>
            <p className="text-gray-300">
              Empowering developers to build, share and grow together through
              meaningful connections.
            </p>
            <div className="flex space-x-4 pt-2">
              <a
                href="#"
                className="social-icon text-gray-300 hover:text-[#F5F3B3] text-xl"
              >
                <i className="fab fa-twitter"></i>
              </a>
              <a
                href="#"
                className="social-icon text-gray-300 hover:text-[#F5F3B3] text-xl"
              >
                <i className="fab fa-github"></i>
              </a>
              <a
                href="#"
                className="social-icon text-gray-300 hover:text-[#F5F3B3] text-xl"
              >
                <i className="fab fa-linkedin"></i>
              </a>
              <a
                href="#"
                className="social-icon text-gray-300 hover:text-[#F5F3B3] text-xl"
              >
                <i className="fab fa-discord"></i>
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="footer-link text-gray-300 hover:text-white block"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="footer-link text-gray-300 hover:text-white block"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="footer-link text-gray-300 hover:text-white block"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="footer-link text-gray-300 hover:text-white block"
                >
                  Documentation
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="footer-link text-gray-300 hover:text-white block"
                >
                  Blog
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold uppercase tracking-wider">
              Resources
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="footer-link text-gray-300 hover:text-white block"
                >
                  API Reference
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="footer-link text-gray-300 hover:text-white block"
                >
                  Community
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="footer-link text-gray-300 hover:text-white block"
                >
                  Tutorials
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="footer-link text-gray-300 hover:text-white block"
                >
                  Support
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="footer-link text-gray-300 hover:text-white block"
                >
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold uppercase tracking-wider">
              Contact Us
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <i className="fas fa-map-marker-alt text-[#F5F3B3] mt-1 mr-3"></i>
                <span className="text-gray-300">
                  123 Bot n Pro Street, San Pochinki, ERANGEL 94107
                </span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-envelope text-[#F5F3B3] mr-3"></i>
                <span className="text-gray-300">hello@devfeed.com</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-phone-alt text-[#F5F3B3] mr-3"></i>
                <span className="text-gray-300">+91 (91) 160-71647</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mb-8"></div>

        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; 2025 DevFeed. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-white text-sm">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-sm">
              Terms of Service
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-sm">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
