import React, { useState } from "react";
import logo from "../../assets/arthi-logo2.png";
import image from "../../assets/login.jpg";
import { FcGoogle } from "react-icons/fc";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { ImSpinner9 } from "react-icons/im";

const Login = () => {
  const [show, setShow] = useState(false);
  const { googleSignIn, emailSignin, setLoading, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleEmailSignin = async (data) => {
    setLoading(true);
    const { email, password } = data;
    console.log({ email, password });

    try {
      const { user } = await emailSignin(email, password);
      navigate(from, { replace: true });
      toast.success(
        `Welcome back, ${user.displayName || user.email || "user"}!`
      );
    } catch (error) {
      const errorMessage =
        error.message || "An unknown sign-in error occurred.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignin = async () => {
    setLoading(true);
    try {
      const { user } = await googleSignIn();
      navigate(from, { replace: true });
      toast.success(
        `Welcome back, ${user.displayName || user.email || "user"}!`
      );
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
      <div className="flex w-full max-w-5xl h-auto bg-white shadow-xl rounded-2xl overflow-hidden custom-shadow">
        {/* RIGHT SIDE */}
        <div
          className="hidden lg:flex w-1/2 p-12 flex-col justify-center items-center text-white relative rounded-l-2xl bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${image})` }}
        />

        {/* LEFT SIDE */}
        <div className="w-full lg:w-1/2 p-8 md:p-12 flex flex-col justify-center items-center">
          <div className="max-w-xs w-full">
            {/* LOGO */}
            <div className="mb-3 md:mb-3 text-center">
              <img
                src={logo}
                alt="Logo"
                className="w-40 h-auto sm:w-50 mx-auto"
              />
            </div>

            <h2 className="text-3xl font-bold text-gray-800 mb-3 text-center">
              Sign In
            </h2>

            {/* FORM */}
            <form
              onSubmit={handleSubmit(handleEmailSignin)}
              noValidate
              className="space-y-6"
            >
              <div className="space-y-4">
                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm">
                    Email address
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Enter Your Email Here"
                    className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-lime-500 bg-gray-200 text-gray-900"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value:
                          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: "Please enter a valid email",
                      },
                    })}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Password Field */}
                <div className="relative">
                  <label htmlFor="password" className="text-sm mb-2">
                    Password
                  </label>
                  <input
                    type={show ? "text" : "password"}
                    autoComplete="current-password"
                    id="password"
                    placeholder="*******"
                    className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-lime-500 bg-gray-200 text-gray-900"
                    {...register("password", {
                      required: "Password is required",
                    })}
                  />
                  {errors.password && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.password.message}
                    </p>
                  )}
                  <span
                    onClick={() => setShow(!show)}
                    className="absolute right-3 bottom-2.5 cursor-pointer text-gray-500 hover:text-[#2a875f]"
                  >
                    {show ? (
                      <AiFillEye size={20} />
                    ) : (
                      <AiFillEyeInvisible size={20} />
                    )}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary w-full"
                disabled={loading}
              >
                {loading ? (
                  <ImSpinner9 className="animate-spin m-auto" />
                ) : (
                  "Sign In"
                )}
              </button>
            </form>

            {/* OR DIVIDER */}
            <div className="flex items-center my-6">
              <hr className="grow border-gray-200" />
              <span className="px-4 text-gray-400 text-sm font-medium">or</span>
              <hr className="grow border-gray-200" />
            </div>

            {/* GOOGLE SIGNIN */}
            <button
              onClick={handleGoogleSignin}
              type="button"
              className="flex items-center justify-center w-full py-2.5 rounded-4xl border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
              disabled={loading}
            >
              {loading ? (
                <ImSpinner9 className="animate-spin m-auto" />
              ) : (
                <div className="flex items-center">
                  <FcGoogle size={24} className="mr-3" />
                  <span className="font-medium text-sm">
                    Sign in with Google
                  </span>
                </div>
              )}
            </button>

            {/* SIGNUP LINK */}
            <div className="text-center mt-6">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="font-medium text-secondary hover:underline"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
