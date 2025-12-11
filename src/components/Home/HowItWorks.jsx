import React from "react";
import {
  FaFileAlt,
  FaCreditCard,
  FaClipboardCheck,
  FaCheckCircle,
} from "react-icons/fa";
import { Link } from "react-router";

const HowItWorks = () => {
  const steps = [
    {
      icon: <FaFileAlt className="text-primary text-4xl mb-4" />,
      title: "1. Apply for Loan",
      description:
        "Choose your desired loan type and fill out the simple application form with your personal and financial details.",
    },
    {
      icon: <FaCreditCard className="text-primary text-4xl mb-4" />,
      title: "2. Pay Application Fee",
      description:
        "Complete a small application processing fee to start the review process. This ensures serious applications get priority.",
    },
    {
      icon: <FaClipboardCheck className="text-primary text-4xl mb-4" />,
      title: "3. Application Review",
      description:
        "Our expert team reviews your application, verifies documents, and assesses your eligibility within 24-48 hours.",
    },
    {
      icon: <FaCheckCircle className="text-primary text-4xl mb-4" />,
      title: "4. Get Approved Loan",
      description:
        "If approved, funds are disbursed to your account instantly. Clear feedback provided if rejected.",
    },
  ];

  return (
    <div className="mx-auto px-6 py-12">
      {/* Title Section */}
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          <span className="text-primary">How </span>
          <span className="text-secondary">Loan Works</span>
        </h2>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
          Get approved quickly with our simple 4-step process
        </p>
      </div>

      {/* Steps */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        {steps.map((step, index) => (
          <div
            key={index}
            className="flex flex-col text-center p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="mx-auto ">{step.icon}</div>
            <h3 className="text-xl font-semibold text-slate-900 mb-3">
              {step.title}
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
