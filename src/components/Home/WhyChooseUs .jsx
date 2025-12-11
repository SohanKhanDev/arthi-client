import React from "react";
import { FaClock, FaPercent, FaShieldAlt, FaHeadset } from "react-icons/fa";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const features = [
  {
    icon: <FaClock className="text-5xl text-emerald-500" />,
    title: "Fast Approval",
    description:
      "Get loan approvals within 24-48 hours with minimal documents.",
  },
  {
    icon: <FaPercent className="text-5xl text-indigo-500" />,
    title: "Low Interest Rates",
    description: "Flexible plans with rates starting as low as 9.99% annually.",
  },
  {
    icon: <FaShieldAlt className="text-5xl text-rose-500" />,
    title: "Secure & Trusted",
    description: "We use advanced encryption to protect your financial data.",
  },
  {
    icon: <FaHeadset className="text-5xl text-purple-500" />,
    title: "24/7 Support",
    description: "Our support team is available anytime to assist you.",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.1 * i, duration: 0.4 },
  }),
};

const WhyChooseUs = () => {
  return (
    <div className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        {/* Title Section */}
        <div className="text-center mb-16">
          <div className="relative max-w-7xl mx-auto px-6 text-center">
            <motion.h1
              className="text-4xl md:text-4xl lg:text-6xl font-black mb-6 bg-linear-to-r from-slate-900 via-slate-800 to-emerald-600 bg-clip-text text-transparent dark:text-white"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Why Choose{" "}
              <span className="text-emerald-500">Our Loan Service?</span>
            </motion.h1>
            <motion.p
              className="text-xl md:text-xl text-slate-600 max-w-3xl mx-auto mb-12 leading-relaxed dark:text-white"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              {" "}
              Thousands of customers trust us to provide fast, secure, and
              affordable financial solutions.
            </motion.p>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="p-8 rounded-2xl bg-white border border-slate-200 shadow-md hover:shadow-xl transition-all duration-300 text-center"
            >
              <div className="flex justify-center mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
