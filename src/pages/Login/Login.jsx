import React, { useEffect, useState } from "react";
import logo from "../../assets/arthi-logo2.png";
import image from "../../assets/login.jpg";
import { FcGoogle } from "react-icons/fc";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { ImSpinner9 } from "react-icons/im";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { saveOrUpdateUser } from "../../utils";
import MyBtn from "../../components/Shared/MyBtn";

const Login = () => {
  const [show, setShow] = useState(false);
  const { emailSignin, googleSignIn, logOut, setLoading, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosSecure = useAxiosSecure();
  const from = location.state || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const checkUserStatus = async (email) => {
    try {
      const response = await axiosSecure.get(`/users/${email}`);
      return response.data;
    } catch (error) {
      console.error("Error checking user status:", error);
      return null;
    }
  };

  const handleEmailSignin = async (data) => {
    setLoading(true);
    const { email, password } = data;

    try {
      const userStatus = await checkUserStatus(email);
      console.log(userStatus);
      if (userStatus?.status !== "approved") {
        navigate("/signup-pending");
      } else {
        axiosSecure.patch(`/users/login-update/${userStatus?._id}`);
        const { user } = await emailSignin(email, password);
        navigate(from, { replace: true });
        toast.success(
          `Welcome back, ${user.displayName || user.email || "user"}!`
        );
      }
    } catch (error) {
      const errorMessage =
        error.message || "An unknown sign-in error occurred.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = "LOGIN | ARTHI";
  }, []);

  const handleGoogleSignin = async () => {
    setLoading(true);
    try {
      const { user } = await googleSignIn();
      console.log(user?.displayName);
      await saveOrUpdateUser({
        name: user?.displayName,
        image: user?.photoURL,
        email: user?.email,
        role: "borrower",
      });

      const userStatus = await checkUserStatus(user?.email);
      if (userStatus?.status !== "approved") {
        await logOut();
        navigate("/signup-pending");
      } else {
        axiosSecure.patch(`/users/login-update/${userStatus?._id}`);
        navigate(from, { replace: true });
        toast.success(`Welcome, ${user.displayName || user.email || "user"}!`);
      }
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

              <MyBtn
                // to="/all-loans"
                // onClick={handleApply}
                type="submit"
                disabled={loading}
                label={
                  loading ? (
                    <ImSpinner9 className="animate-spin m-auto" />
                  ) : (
                    "Sign In"
                  )
                }
                size="md"
                variant="primary"
                className="w-full border-none"
                // icon={FaHandsClapping}
              />
            </form>

            {/* OR DIVIDER */}
            <div className="flex items-center my-6">
              <hr className="grow border-gray-200" />
              <span className="px-4 text-gray-400 text-sm font-medium">or</span>
              <hr className="grow border-gray-200" />
            </div>

            {/* GOOGLE SIGNIN */}
            <MyBtn
              // to="/all-loans"
              onClick={handleGoogleSignin}
              // type="submit"
              disabled={loading}
              label={
                loading ? (
                  <ImSpinner9 className="animate-spin m-auto" />
                ) : (
                  <div className="flex items-center">
                    <FcGoogle size={24} className="mr-3" />
                    <span className="font-medium text-sm">
                      Sign in with Google
                    </span>
                  </div>
                )
              }
              size="md"
              variant="cancel"
              className="w-full border-none"
              // icon={FcGoogle}
            />

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
