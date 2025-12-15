import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { toast } from "react-hot-toast"; // ✅ যোগ করুন
import MyBtn from "../../../Shared/MyBtn";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    const postPaymentInfo = async () => {
      try {
        if (sessionId) {
          await axiosSecure.post(`/payment-success`, { sessionId });
          toast.success("Payment confirmed!");
        }
      } catch {
        toast.error("Payment processing failed!");
      }
    };

    if (sessionId) {
      postPaymentInfo();
    }
  }, [sessionId, axiosSecure, navigate]);
  const handleGoToLoan = () => {
    navigate(`/dashboard/my-loans`);
  };

  useEffect(() => {
    document.title = "PAYMENT SUCCESSFULL | ARTHI";
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="bg-white shadow-lg rounded-xl px-8 py-10 max-w-md w-full text-center">
        <div className="mb-4">
          <div className="mx-auto h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
            <span className="text-3xl text-green-600">✓</span>
          </div>
        </div>
        <h1 className="text-2xl font-semibold text-slate-800 mb-2">
          Payment Successful
        </h1>
        <p className="text-slate-500 mb-6">
          Thank you for your payment. Your loan application fee has been
          received.
        </p>
        <MyBtn
          label="Go to my loan"
          variant="primary"
          size="md"
          onClick={handleGoToLoan}
          className="w-full"
        />
      </div>
    </div>
  );
};

export default PaymentSuccess;
