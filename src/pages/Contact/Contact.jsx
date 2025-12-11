import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaCheckCircle,
  FaPaperPlane,
} from "react-icons/fa";
import { ImSpinner9 } from "react-icons/im";
import MyBtn from "../../components/Shared/MyBtn";

const Contact = () => {
  return (
    <div className="min-h-screen ">
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden rounded-4xl">
        <div className="absolute inset-0 bg-linear-to-r from-emerald-500/5 via-teal-500/5 to-blue-500/5" />
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 bg-linear-to-r from-slate-900 via-slate-800 to-emerald-600 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Get In <span className="text-emerald-500">Touch</span>
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto mb-12 leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Have questions? Need help? We're here to assist you 24/7. Reach out
            via phone, email, or our contact form.
          </motion.p>
        </div>
      </section>

      {/* Contact Info & Form */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-4xl font-bold mb-2 bg-linear-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                  Let's Talk
                </h2>
                <p className="text-xl text-slate-600">
                  Connect with our loan experts anytime. Fast response
                  guaranteed.
                </p>
              </div>

              {/* Contact Cards */}
              <div className="space-y-6">
                <motion.div
                  className="group p-8 bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 bg-linear-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
                      <FaPhone className="text-white text-xl" />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900 text-lg">
                        Phone
                      </div>
                      <div className="text-2xl font-black text-emerald-600 group-hover:text-emerald-700">
                        +880 9612-345678
                      </div>
                    </div>
                  </div>
                  <p className="text-slate-600 text-sm">Mon-Sat 9AM-8PM</p>
                </motion.div>

                <motion.div
                  className="group p-8 bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 bg-linear-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
                      <FaEnvelope className="text-white text-xl" />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900 text-lg">
                        Email
                      </div>
                      <a
                        href="mailto:support@arthi.com"
                        className="text-2xl font-black text-emerald-600 group-hover:text-emerald-700 hover:underline"
                      >
                        support@arthi.com
                      </a>
                    </div>
                  </div>
                  <p className="text-slate-600 text-sm">
                    Response within 2 hours
                  </p>
                </motion.div>

                <motion.div
                  className="group p-8 bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 bg-linear-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
                      <FaMapMarkerAlt className="text-white text-xl" />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900 text-lg">
                        Visit Us
                      </div>
                      <div className="text-xl font-semibold text-slate-800">
                        House #12, Road #5
                        <br />
                        Dhanmondi, Dhaka-1205
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-8 lg:p-10">
                <h3 className="text-3xl font-bold text-slate-900 mb-2">
                  Send Message
                </h3>
                <p className="text-slate-600 mb-8">
                  We'll respond within 24 hours
                </p>

                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        className="w-full px-5 py-4 border-2 border-slate-200 rounded-2xl bg-white/50 backdrop-blur-sm focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 transition-all duration-300 text-lg"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        className="w-full px-5 py-4 border-2 border-slate-200 rounded-2xl bg-white/50 backdrop-blur-sm focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 transition-all duration-300 text-lg"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      name="subject"
                      className="w-full px-5 py-4 border-2 border-slate-200 rounded-2xl bg-white/50 backdrop-blur-sm focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 transition-all duration-300 text-lg"
                      placeholder="Loan inquiry, support, etc."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      rows={5}
                      required
                      className="w-full px-5 py-4 border-2 border-slate-200 rounded-2xl bg-white/50 backdrop-blur-sm focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 transition-all duration-300 resize-vertical text-lg"
                      placeholder="Tell us about your inquiry..."
                    />
                  </div>

                  <MyBtn
                    label={"Send Message"}
                    variant="primary"
                    size="md"
                    type="submit"
                    icon={FaPaperPlane}
                    className="w-full flex-1"
                  />
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Working Hours */}
      <section className="py-16 bg-linear-to-r from-emerald-500/10 to-teal-500/10 rounded-4xl mb-12">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <FaClock className="mx-auto w-20 h-20 text-emerald-500 mb-6" />
            <h3 className="text-3xl font-bold text-slate-900 mb-6">
              Working Hours
            </h3>
            <div className="grid md:grid-cols-2 gap-6 text-lg">
              <div className="p-6 bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg">
                <div className="font-semibold text-slate-700">
                  Monday - Friday
                </div>
                <div className="text-2xl font-black text-emerald-600">
                  9:00 AM - 8:00 PM
                </div>
              </div>
              <div className="p-6 bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg">
                <div className="font-semibold text-slate-700">Saturday</div>
                <div className="text-2xl font-black text-emerald-600">
                  10:00 AM - 6:00 PM
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
