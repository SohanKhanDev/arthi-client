import React, { useEffect } from "react";
import Lottie from "lottie-react";
import errorpage from "../../assets/404 error page.json";
import { Link } from "react-router";
import MyBtn from "../../components/Shared/MyBtn";
import { HiOutlineHome } from "react-icons/hi";

const ErrorPage = () => {
  useEffect(() => {
    document.title = "ERROR | ARTHI";
  }, []);
  return (
    <div
      className="
        min-h-screen flex flex-col items-center justify-center text-centerp-10 text-white 
      "
    >
      <div className="w-full max-w-lg mx-auto mb-10">
        <Lottie animationData={errorpage} loop={true} />
      </div>

      <p className="text-lg text-center sm:text-xl mb-12 max-w-xl text-black">
        It seems the digital pathway you followed has led to a non-existent
        route.
        <br className="hidden sm:block" />
        Let's get you back to the home page.
      </p>

      <div>
        <MyBtn
          to="/"
          label={"Back Home"}
          variant="primary"
          size="md"
          icon={HiOutlineHome}
          className="flex-1"
        />
      </div>
    </div>
  );
};

export default ErrorPage;
