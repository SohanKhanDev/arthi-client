import React from "react";
import { Link, NavLink } from "react-router";
import logo from "../../assets/arthi-logo.png";
import defaultProfilePhoto from "../../assets/profilePhoto.jpg";
import Switch from "./Switch";
import useAuth from "../../hooks/useAuth";
import MyBtn from "./MyBtn";

const Navbar = () => {
  const { user, logOut } = useAuth();

  const publicLinks = [
    { id: 1, title: "Home", path: "/" },
    { id: 2, title: "All Loans", path: "/all-loans" },
    { id: 3, title: "About Us", path: "/about-us" },
    { id: 4, title: "Contact", path: "/contact" },
  ];

  const privateLinks = [
    { id: 1, title: "Home", path: "/" },
    { id: 2, title: "All Loans", path: "/all-loans" },
    { id: 5, title: "Dashboard", path: "/dashboard" },
  ];

  const navLinks = user ? privateLinks : publicLinks;

  //LINK - active nav link
  const getNavLinkClass = ({ isActive }) =>
    isActive
      ? "text-primary font-semibold bg-primary/10 px-4 py-2 rounded-full shadow-sm"
      : "text-gray-600 hover:text-primary hover:bg-gray-100 px-4 py-2 rounded-full transition-all duration-300";

  return (
    <div className="bg-base-100 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 md:px-0 flex items-center h-20">
        <div className="flex-1 navbar-start">
          <img src={logo} alt="Logo" className="w-[170px]" />
        </div>
        <div className="flex-1 navbar-center hidden lg:flex justify-center">
          <ul className="menu menu-horizontal gap-6">
            {navLinks.map((link) => (
              <li key={link.id}>
                <NavLink to={link.path} className={getNavLinkClass}>
                  {link.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex-1 navbar-end flex justify-end gap-3">
          {user && (
            <Link
              to={`/user-profile/${user.email}`}
              className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 overflow-hidden"
            >
              <img
                src={user?.photoURL || defaultProfilePhoto}
                alt="User avatar"
                className="object-cover h-full w-full"
              />
            </Link>
          )}

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
              {navLinks.map((link) => (
                <li key={link.id}>
                  <NavLink to={link.path} className={getNavLinkClass}>
                    {link.title}
                  </NavLink>
                </li>
              ))}

              {user ? (
                <li>
                  <NavLink
                    className="text-gray-600 hover:text-primary hover:bg-gray-100 px-4 py-2 rounded-full transition-all duration-300"
                    onClick={() => logOut()}
                  >
                    Logout
                  </NavLink>
                </li>
              ) : (
                <div>
                  <li>
                    <NavLink to="/login" className={getNavLinkClass}>
                      Login
                    </NavLink>
                  </li>

                  <li>
                    <NavLink to="/signup" className={getNavLinkClass}>
                      Register
                    </NavLink>
                  </li>
                </div>
              )}
            </ul>
          </div>

          {user ? (
            <div className="flex">
              <MyBtn
                // to="/signup"
                onClick={() => logOut()}
                // disabled
                label="Logout"
                size="sm"
                variant="primary"
                className=""
                // icon={FaHandsClapping}
              />
            </div>
          ) : (
            <div className=" flex gap-2">
              <MyBtn
                to="/login"
                // disabled
                label="Login"
                size="sm"
                variant="primary"
                className=""
                // icon={FaHandsClapping}
              />

              <MyBtn
                to="/signup"
                // disabled
                label="Register"
                size="sm"
                variant="primary"
                className=""
                // icon={FaHandsClapping}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
