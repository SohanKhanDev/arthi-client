import React from "react";
// FIX: Correct import from react-router-dom
import { NavLink } from "react-router";
import logo from "../../assets/arthi-logo.png";
import Switch from "./Switch";

const Navbar = () => {
  const links = [
    { id: 1, title: "Home", path: "/" },
    { id: 2, title: "All Loans", path: "/all-loans" },
    { id: 3, title: "About Us", path: "/about-us" },
    { id: 4, title: "Contact", path: "/contact" },
  ];

  // Function to determine link class based on active status
  const getNavLinkClass = ({ isActive }) =>
    isActive
      ? "text-primary font-bold border-b-2 border-primary pb-1"
      : "hover:text-primary transition-all";

  return (
    <div className="bg-base-100 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 md:px-0 flex items-center h-20">
        <div className="flex-1 navbar-start">
          <img src={logo} alt="Logo" className="w-[130px]" />
        </div>
        <div className="flex-1 navbar-center hidden lg:flex justify-center">
          <ul className="menu menu-horizontal gap-6">
            {links.map((link) => (
              <li key={link.id}>
                <NavLink to={link.path} className={getNavLinkClass}>
                  {link.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex-1 navbar-end flex justify-end gap-2">
          <Switch></Switch>
          <div className="dropdown dropdown-end lg:hidden">
            <div tabIndex={0} role="button" className="btn btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h12M4 18h16"
                />
              </svg>
            </div>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 z-50"
            >
              {links.map((link) => (
                <li key={link.id}>
                  <NavLink to={link.path} className={getNavLinkClass}>
                    {link.title}
                  </NavLink>
                </li>
              ))}

              <li>
                <NavLink to="/login" className={getNavLinkClass}>
                  Login
                </NavLink>
              </li>

              <li>
                <NavLink to="/register" className={getNavLinkClass}>
                  Register
                </NavLink>
              </li>
            </ul>
          </div>

          <NavLink to="/login" className="btn btn-primary hidden lg:flex">
            Login
          </NavLink>

          <NavLink to="/register" className="btn btn-primary hidden lg:flex">
            Register
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
