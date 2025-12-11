import React, { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { FaPlus, FaMinus } from "react-icons/fa";

const FAQSection = () => {
  const faqs = [
    {
      question: "How long does loan approval take?",
      answer:
        "Most applications are reviewed and approved within 24-48 hours. You'll receive instant notification via SMS and email.",
    },
    {
      question: "What documents do I need?",
      answer:
        "Just NID, recent photo, bank statement, and income proof. Upload everything online - no branch visits required.",
    },
    {
      question: "What is the application fee?",
      answer:
        "Only ৳500 processing fee (non-refundable). Waived for first-time borrowers on loans above ৳5,00,000.",
    },
    {
      question: "Can I pay via bKash/Nagad?",
      answer:
        "Yes! We accept all major payment methods including bKash, Nagad, Rocket, and bank cards for instant processing.",
    },
    {
      question: "What if my loan is rejected?",
      answer:
        "You'll get detailed feedback with improvement suggestions. Reapply anytime after fixing issues - no extra fees.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="py-20 ">
      <div className="max-w-4xl mx-auto px-6">
        {/* Title Section */}
        <div className="text-center mb-16">
          <div className="relative max-w-7xl mx-auto px-6 text-center">
            <motion.h1
              className="text-4xl md:text-4xl lg:text-6xl font-black mb-6 bg-linear-to-r from-slate-900 via-slate-800 to-emerald-600 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Frequently{" "}
              <span className="text-emerald-500">Asked Questions</span>
            </motion.h1>
            <motion.p
              className="text-xl md:text-xl text-slate-600 max-w-3xl mx-auto mb-12 leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              {" "}
              Got questions? We've got answers. Everything you need to know
              before applying.
            </motion.p>
          </div>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-all duration-300"
              whileHover={{ scale: 1.01 }}
            >
              {/* Question Button */}
              <motion.button
                className="w-full p-6 text-left flex items-center justify-between hover:bg-slate-50/50"
                onClick={() => toggleFAQ(index)}
                whileTap={{ scale: 0.98 }}
                whileHover={{ backgroundColor: "rgba(248, 250, 252, 0.8)" }}
              >
                <motion.h3
                  className="text-xl font-semibold text-slate-900"
                  initial={{ x: -20 }}
                  animate={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {faq.question}
                </motion.h3>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {openIndex === index ? (
                    <FaMinus className="text-emerald-500 text-xl" />
                  ) : (
                    <FaPlus className="text-emerald-500 text-xl" />
                  )}
                </motion.div>
              </motion.button>

              {/* Answer - AnimatePresence for smooth enter/exit */}
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6">
                      <motion.p
                        className="text-slate-600 leading-relaxed"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                      >
                        {faq.answer}
                      </motion.p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQSection;
