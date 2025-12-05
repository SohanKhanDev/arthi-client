import React from "react";
import logo from "../../assets/arthi-logo2.png";
import image from "../../assets/signup-page.jpg";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";

const SignUp = () => {
  const { googleSignIn, setLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state || "/";

  //ANCHOR - google signin
  const handleGoogleSignin = async () => {
    setLoading(true);

    try {
      const { user } = await googleSignIn();
      navigate(from, { replace: true });
      toast.success(`Welcome, ${user.displayName || user.email || "user"}!`);
    } catch (error) {
      const errorMessage =
        error.message || "An unknown sign-in error occurred.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-8 bg-[#f5f9f5]">
      <div
        className="flex w-full max-w-5xl h-auto bg-white shadow-xl rounded-2xl overflow-hidden custom-shadow
        "
      >
        {/* ----------*** :: LEFT SIDE :: ***---------- */}
        <div className="w-full lg:w-1/2 p-8 md:p-12 flex flex-col justify-center items-center">
          <div className="max-w-xs w-full">
            {/* ----------*** :: LOGO :: ***---------- */}
            <div className="mb-3 md:mb-10 text-center">
              <img
                src={logo}
                alt="Logo"
                className="w-40 h-auto sm:w-50 mx-auto"
              />
            </div>

            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
              Create Account
            </h2>

            {/* ----------*** :: FORM => REGISTRATION :: ***---------- */}

            {/* ----------*** :: OR DIVIDER :: ***---------- */}
            <div className="flex items-center my-6">
              <hr className="grow border-gray-200" />
              <span className="px-4 text-gray-400 text-sm font-medium">or</span>
              <hr className="grow border-gray-200" />
            </div>

            {/* ----------*** :: BTN => GOOGLE SIGNIN :: ***---------- */}
            <button
              onClick={handleGoogleSignin}
              type="button"
              className="flex items-center justify-center w-full py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
            >
              <FcGoogle size={24} className="mr-3" />
              <span className="font-medium text-sm">Sign in with Google</span>
            </button>

            {/* ----------*** :: NAVIGATION => LOGIN :: ***---------- */}
            <div className="text-center mt-6">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-medium text-secondary hover:underline"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* ----------*** :: RIGHT SIDE :: ***---------- */}
        <div
          className="
            hidden lg:flex 
            w-1/2 
            p-12 
            flex-col 
            justify-center 
            items-center 
            text-white 
            relative 
            rounded-r-2xl 
            bg-cover 
            bg-center 
            bg-no-repeat
          "
          style={{ backgroundImage: `url(${image})` }}
        ></div>
      </div>
    </div>
  );
};

export default SignUp;
