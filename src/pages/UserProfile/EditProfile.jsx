import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import { imageupload } from "../../utils";
import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { ImSpinner9 } from "react-icons/im";
import { Link, useNavigate } from "react-router";

const EditProfile = () => {
  const { user, updateUserProfile, setLoading } = useAuth();

  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { displayName, email, photoURL } = user || {};

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  useEffect(() => {
    if (user?.displayName) {
      reset({ name: user.displayName });
    }
  }, [user?.displayName, reset]);

  const handleUpdateInfo = async (data) => {
    try {
      setLoading(true);
      let imgURL = photoURL;
      if (data.image && data.image[0]) {
        imgURL = await imageupload(data.image[0]);
      }

      const userData = {
        name: data.name,
        image: imgURL,
        email,
      };
      // Update database
      await axiosSecure.patch(`/users-update`, userData);

      // Update Firebase
      await updateUserProfile(data.name, imgURL);

      queryClient.invalidateQueries({ queryKey: ["user", email] });

      toast.success("Profile updated successfully!");

      reset({ name: data.name });

      navigate(`/user-profile/${email}`);
    } catch (error) {
      toast.error("Profile update error:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to update profile";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = "EDIT PROFILE | ARTHI";
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-16 bg-gray-50">
      <form
        onSubmit={handleSubmit(handleUpdateInfo)}
        className="max-w-md w-full bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/40"
      >
        <h1 className="text-3xl font-bold mb-8 text-gray-900 text-center">
          Edit Profile
        </h1>

        {/* Name Field */}
        <div className="mb-8">
          <label
            htmlFor="name"
            className="block mb-3 text-sm font-semibold text-gray-700"
          >
            Name
          </label>
          <input
            type="text"
            defaultValue={displayName}
            placeholder="Enter your name"
            className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 ${
              errors.name
                ? "border-red-400 bg-red-50"
                : "border-gray-200 focus:border-[#059383] focus:ring-2 focus:ring-[#059383]/20"
            } bg-white/50 backdrop-blur-sm text-gray-900 placeholder-gray-400`}
            {...register("name", {
              required: "Name is required",
              maxLength: {
                value: 20,
                message: "Name must be less than 20 characters",
              },
            })}
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-2 font-medium">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Image Field - Optional */}
        <div className="mb-8">
          <label
            htmlFor="image"
            className="block mb-3 text-sm font-semibold text-gray-700"
          >
            Profile Image (Optional)
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            className={`block w-full text-sm text-gray-500 file:mr-4 file:py-3 file:px-6 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-linear-to-r file:from-[#059383] file:to-[#059383]/80 file:text-white hover:file:bg-[#059383]/90 transition-all bg-white/50 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#059383]/30 p-4 ${
              errors.image
                ? "border-red-400 bg-red-50"
                : "hover:border-[#059383]/50"
            }`}
            {...register("image", {
              validate: {
                maxSize: (files) =>
                  !files[0] ||
                  files[0].size <= 2 * 1024 * 1024 ||
                  "Image must be less than 2MB",
                validType: (files) =>
                  !files[0] ||
                  ["image/jpeg", "image/jpg", "image/png"].includes(
                    files[0].type
                  ) ||
                  "Only JPEG, JPG, or PNG allowed",
              },
            })}
          />
          {errors.image && (
            <p className="text-red-500 text-xs mt-2 font-medium">
              {errors.image.message}
            </p>
          )}
          <p className="mt-2 text-xs text-gray-500">
            PNG, JPG, JPEG (max 2MB) - Leave empty to keep current image
          </p>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="btn btn-[#059383] w-full py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <ImSpinner9 className="animate-spin mx-auto text-xl" />
            </>
          ) : (
            "Update Profile"
          )}
        </button>
        <Link
          to={`/user-profile/${email}`}
          className=" mt-2 w-full btn btn-[#059383]"
        >
          Go Back
        </Link>
      </form>
    </div>
  );
};

export default EditProfile;
