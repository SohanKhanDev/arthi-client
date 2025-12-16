import React, { useEffect, useState } from "react";
import logo from "../../assets/arthi-logo2.png";
import image from "../../assets/signup-page.jpg";
import { FcGoogle } from "react-icons/fc";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import { useForm, Controller } from "react-hook-form";
import { imageupload, saveOrUpdateUser } from "../../utils";
import { ImSpinner9 } from "react-icons/im";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import MyBtn from "../../components/Shared/MyBtn";

const SignUp = () => {
  const [show, setShow] = useState(false);
  const {
    googleSignIn,
    emailSignup,
    logOut,
    updateUserProfile,
    setLoading,
    loading,
  } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosSecure = useAxiosSecure();
  const from = location.state || "/";

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      role: "",
    },
  });

  const checkUserStatus = async (email) => {
    try {
      const response = await axiosSecure.get(`/users/${email}`);
      return response.data;
    } catch (error) {
      toast.error("Error checking user status:", error);
      return null;
    }
  };

  const handleEmailSignup = async (data) => {
    setLoading(true);

    const { name, image, email, password, role } = data;

    const imageFile = image[0];
    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const imgURL = await imageupload(imageFile);

      const { user } = await emailSignup(email, password);
      await updateUserProfile(name, imgURL);
      await saveOrUpdateUser({ name, image: imgURL, email, role });

      const userStatus = await checkUserStatus(email);
      if (userStatus?.status !== "approved") {
        await logOut();
        navigate("/signup-pending");
      } else {
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

  const handleGoogleSignin = async () => {
    setLoading(true);
    try {
      const { user } = await googleSignIn();
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

  useEffect(() => {
    document.title = "SIGNUP | ARTHI";
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-8 ">
      <div className="flex w-full max-w-5xl h-auto bg-white shadow-xl rounded-2xl overflow-hidden custom-shadow">
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
              Create Account
            </h2>

            {/* FORM */}
            <form
              onSubmit={handleSubmit(handleEmailSignup)}
              noValidate
              className="space-y-6"
            >
              <div className="space-y-4">
                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block mb-2 text-sm">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Enter Your Name Here"
                    className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-[#059383] bg-gray-200 text-gray-900"
                    {...register("name", {
                      required: "Name is required",
                      maxLength: {
                        value: 20,
                        message: "Name cannot be too long",
                      },
                    })}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Image Field */}
                <div>
                  <label
                    htmlFor="image"
                    className="block mb-2 text-sm font-medium text-[#059383]y"
                  >
                    Profile Image
                  </label>
                  <input
                    name="image"
                    type="file"
                    id="image"
                    accept="image/*"
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-4xl file:border-0 file:text-sm file:font-semibold file:bg-[#059383] file:text-white bg-gray-100 border border-dashed border-[#059383] rounded-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#059383] focus:border-[#059383]/10 py-2"
                    {...register("image", {
                      required: "Profile image is required",
                    })}
                  />
                  {errors.image && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.image.message}
                    </p>
                  )}
                  <p className="mt-1 text-xs text-gray-400">
                    PNG, JPG or JPEG (max 2MB)
                  </p>
                </div>

                {/* Role Field */}
                <div>
                  <label htmlFor="role" className="block mb-2 text-sm">
                    Role
                  </label>
                  <Controller
                    name="role"
                    control={control}
                    rules={{ required: "Please select a role" }}
                    render={({ field, fieldState: { error } }) => (
                      <>
                        <select
                          {...field}
                          id="role"
                          className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-[#059383] bg-gray-200 text-gray-900"
                        >
                          <option disabled value="">
                            Pick a role
                          </option>
                          <option value="borrower">Borrower</option>
                          <option value="manager">Manager</option>
                        </select>
                        {error && (
                          <p className="text-red-500 text-sm mt-1">
                            {error.message}
                          </p>
                        )}
                      </>
                    )}
                  />
                </div>

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
                    autoComplete="new-password"
                    id="password"
                    placeholder="*******"
                    className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-lime-500 bg-gray-200 text-gray-900"
                    {...register("password", {
                      required: "Password is required",
                      pattern: {
                        value: /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
                        message:
                          "Password must have uppercase, lowercase letters, and be at least 6 characters",
                      },
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
                    "Signup"
                  )
                }
                size="md"
                variant="[#059383]"
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

            {/* LOGIN LINK */}
            <div className="text-center mt-6">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-medium text-[#059383] hover:underline"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div
          className="hidden lg:flex w-1/2 p-12 flex-col justify-center items-center text-white relative rounded-r-2xl bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${image})` }}
        />
      </div>
    </div>
  );
};

export default SignUp;
