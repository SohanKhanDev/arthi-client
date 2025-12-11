import React, { useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import {
  FaShieldAlt,
  FaClock,
  FaUsers,
  FaAward,
  FaCheckCircle,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

const AboutUs = () => {
  const stats = [
    { number: "10K+", label: "Happy Customers" },
    { number: "500Cr", label: "Loans Disbursed" },
    { number: "24H", label: "Avg Approval Time" },
    { number: "50+", label: "Loan Products" },
  ];

  const features = [
    {
      icon: <FaShieldAlt className="text-5xl text-emerald-500" />,
      title: "100% Secure",
      description: "Bank-grade security with end-to-end encryption",
    },
    {
      icon: <FaClock className="text-5xl text-blue-500" />,
      title: "Lightning Fast",
      description: "Digital process, instant approvals in 24 hours",
    },
    {
      icon: <FaUsers className="text-5xl text-purple-500" />,
      title: "Customer First",
      description: "Dedicated support team available 24/7",
    },
    {
      icon: <FaAward className="text-5xl text-orange-500" />,
      title: "Trusted Brand",
      description: "Licensed by Bangladesh Bank, 5+ years experience",
    },
  ];

  useEffect(() => {
    document.title = "ABOUT US | ARTHI";
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 md:py-32 rounded-4xl">
        <div className="absolute inset-0 bg-linear-to-r from-emerald-500/10 to-teal-500/10" />
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 bg-linear-to-r from-slate-900 via-slate-800 to-emerald-600 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            About <span className="text-emerald-500">Arthi</span>
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-slate-600 max-w-4xl mx-auto mb-12 leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Bangladesh's leading digital loan platform serving 10,000+ customers
            with instant approvals, competitive rates, and 100% online process.
          </motion.p>
          <motion.div
            className="inline-flex items-center gap-4 px-8 py-4 bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <FaCheckCircle className="text-2xl text-emerald-500" />
            <span className="text-lg font-semibold text-slate-800">
              Licensed by Bangladesh Bank
            </span>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <div className="text-4xl md:text-5xl font-black text-emerald-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-slate-600 font-semibold">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-linear-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                Our Story
              </h2>
              <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                Founded in 2020, Arthi revolutionized loan processing in
                Bangladesh. What started as a simple idea to make loans
                accessible to every Bangladeshi has grown into the nation's most
                trusted digital lending platform.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-emerald-500 rounded-2xl flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white font-bold">✓</span>
                  </div>
                  <span className="text-lg text-slate-700">
                    Fully digital, paperless process
                  </span>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-emerald-500 rounded-2xl flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white font-bold">✓</span>
                  </div>
                  <span className="text-lg text-slate-700">
                    Licensed by Bangladesh Bank
                  </span>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-emerald-500 rounded-2xl flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white font-bold">✓</span>
                  </div>
                  <span className="text-lg text-slate-700">
                    500+ Crore disbursed
                  </span>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-4xl p-12 shadow-2xl">
                <div className="text-6xl font-black text-white mb-6">2020</div>
                <div className="text-2xl font-bold text-white/90">Founded</div>
                <div className="w-full bg-white/20 h-1 rounded-full mt-4">
                  <div className="bg-white w-3/4 h-1 rounded-full"></div>
                </div>
                <div className="text-white/80 mt-6 text-lg">Our Journey</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-slate-50 rounded-4xl mb-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-linear-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
                Why Trust
              </span>{" "}
              <span className="text-slate-800">Arthi?</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="p-8 text-center group hover:bg-white rounded-3xl shadow-lg border border-slate-200 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-white/50 to-white/20 rounded-3xl flex items-center justify-center shadow-xl group-hover:shadow-emerald-500/20 backdrop-blur-sm">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-emerald-600">
                  {feature.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
