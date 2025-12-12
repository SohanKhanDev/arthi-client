import React from "react";
import { Link } from "react-router";
import logo from "../../assets/arthi-logo.png";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaEnvelope,
  FaPhoneAlt,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

/*** ----------*** :: NAVLINKS :: ***---------- ***/
const footerLinks = [
  { title: "Home", path: "/" },
  { title: "All Loans", path: "/all-loans" },
  { title: "Loan Application", path: "/apply-loan" },
  { title: "Profile", path: "/profile" },
];

const legalLinks = [
  { title: "About Us", path: "/about-us" },
  { title: "Contact Us", path: "/contact" },
  { title: "Sitemap", path: "" },
];

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 pt-12 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 border-b border-gray-700 pb-10">
          {/* ----------*** :: LOGO & DESCRIPTION :: ***---------- */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-2 space-y-4 text-center sm:text-left">
            <Link to="/">
              <img
                src={logo}
                alt="Arthi Logo"
                className="mx-auto sm:mx-0 w-32 h-auto object-contain"
              />
            </Link>
            <p className="text-sm text-gray-400 max-w-sm mx-auto sm:mx-0">
              Arthi is a web-based microloan request, review & approval
              management system. Many small financial organizations, NGOs, and
              microloan providers struggle to maintain loan applications,
              verification, approvals, EMI schedules, and repayments in one
              streamlined system.
            </p>

            <div className="flex justify-center sm:justify-start space-x-4 pt-2">
              <a
                href="#"
                className="text-[#059383] transition-colors duration-300"
              >
                <FaFacebookF size={20} />
              </a>
              <a
                href="#"
                className="text-[#059383] transition-colors duration-300"
              >
                <FaXTwitter size={20} />
              </a>
              <a
                href="#"
                className="text-[#059383] transition-colors duration-300"
              >
                <FaInstagram size={20} />
              </a>
            </div>
          </div>

          {/* ----------*** :: QUICK LINKS :: ***---------- */}
          <div>
            <h4 className="text-lg font-bold text-white mb-4 border-b-2 border-[#059383] inline-block pb-1">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.title}>
                  <Link
                    to={link.path}
                    className="text-sm text-gray-400 hover:text-[#059383] transition-colors duration-300"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ----------*** :: RESOURCES :: ***---------- */}
          <div>
            <h4 className="text-lg font-bold text-white mb-4 border-b-2 border-[#059383] inline-block pb-1">
              Resources
            </h4>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.title}>
                  <Link
                    to={link.path}
                    className="text-sm text-gray-400 hover:text-[#059383] transition-colors duration-300"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/help"
                  className="text-sm text-gray-400 hover:text-[#059383] transition-colors duration-300"
                >
                  Help Center
                </Link>
              </li>
            </ul>
          </div>

          {/* ----------*** :: CONTACT US :: ***---------- */}
          <div className="col-span-1">
            <h4 className="text-lg font-bold text-white mb-4 border-b-2 border-[#059383] inline-block pb-1">
              Contact Us
            </h4>
            <ul className="space-y-3">
              <li className="flex items-center justify-center sm:justify-start">
                <FaEnvelope className="text-[#059383] mr-3" />
                <a
                  href="mailto:support@ankur.com"
                  className="text-sm text-gray-400 hover:text-[#059383] transition-colors duration-300"
                >
                  support@arthi.com
                </a>
              </li>
              <li className="flex items-center justify-center sm:justify-start">
                <FaPhoneAlt className="text-[#059383] mr-3" />
                <a
                  href="tel:+1234567890"
                  className="text-sm text-gray-400 hover:text-[#059383] transition-colors duration-300"
                >
                  +880 9612-345678
                </a>
              </li>
              <li className="text-sm text-gray-400 text-center sm:text-left">
                House #12, Road #5 Dhanmondi, Dhaka-1205
              </li>
            </ul>
          </div>
        </div>

        {/* ----------*** :: BTN => COPYRIGHT :: ***---------- */}
        <div className="pt-6 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Arthi. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
