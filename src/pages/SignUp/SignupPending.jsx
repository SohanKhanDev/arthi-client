import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import logo from "../../assets/arthi-logo2.png";
import { MdHourglassEmpty } from "react-icons/md";

const SignupPending = () => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(8);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      navigate("/login");
    }
  }, [timeLeft, navigate]);

  useEffect(() => {
    document.title = "APPROVAL PENDING | ARTHI";
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center p-8 ">
      <div className="max-w-sm w-full bg-white rounded-2xl p-8 shadow-lg border border-slate-100">
        {/* Icon + Logo */}
        <div className="flex flex-col items-center mb-6">
          <img src={logo} alt="Logo" className="w-20 h-auto mb-2" />
        </div>

        {/* Content */}
        <div className="text-center space-y-4 mb-8">
          <h1 className="text-2xl font-bold text-slate-900">Under Review</h1>
          <p className="text-slate-600 leading-relaxed">
            Your signup request is being reviewed. You'll be able to login once
            approved.
          </p>
        </div>

        {/* Button */}
        <Link
          to="/login"
          className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 px-6 rounded-xl text-center transition-all duration-200 flex items-center justify-center gap-2 text-sm"
        >
          Check Login ({timeLeft}s)
        </Link>

        <div className="mt-6 pt-6 border-t border-slate-100 text-center">
          <Link
            to="/"
            className="text-sm text-slate-500 hover:text-slate-700 flex items-center justify-center gap-1"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignupPending;
