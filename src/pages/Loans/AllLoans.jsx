import { DiVisualstudio } from "react-icons/di";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import LoanCard from "./LoanCard";

const AllLoans = () => {
  const axiosSecure = useAxiosSecure();
  const [loans, setLoans] = useState([]);
  const [totalLoans, setTotalLoans] = useState(0);
  const [totalpages, setTotalpages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const limit = 6;

  const handelSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const { data } = await axiosSecure(
          `/loans?limit=${limit}&skip=${
            currentPage * limit
          }&search=${searchTerm}`
        );
        setLoans(data.result || []);
        setTotalLoans(data.total || 0);
        setTotalpages(Math.ceil((data.total || 0) / limit));
      } catch (error) {
        toast.error("Error:", error);
        setLoans([]);
      } finally {
        setLoading(false);
      }
    };
    fetchLoans();
  }, [currentPage, searchTerm, axiosSecure]);

  useEffect(() => {
    document.title = "ALL LOANS | ARTHI";
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="p-3 ">
      {/* Header */}
      <div className="flex flex-col lg:flex-row items-end justify-between mb-8 gap-4 lg:gap-0">
        <div className="w-full lg:w-auto">
          <h1 className="text-2xl sm:text-3xl font-semibold text-slate-900 dark:text-white">
            Browse loan offers
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-500">
            Choose from ({totalLoans}) curated loan products.
          </p>
        </div>

        <form
          onSubmit={handleFormSubmit}
          className="w-full lg:w-[350px] xl:w-[400px]"
        >
          <label className="input input-bordered w-full max-w-md bg-white/80 backdrop-blur-xl border-slate-200 shadow-lg focus-within:ring-2 focus-within:ring-emerald-500 focus-within:border-transparent transition-all duration-200">
            <svg
              className="h-5 w-5 opacity-70 flex-shrink-0"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <input
              onChange={handelSearch}
              value={searchTerm}
              type="search"
              placeholder="Search loan products..."
              className="placeholder-slate-400 text-slate-900 font-medium bg-transparent focus:outline-none"
            />
          </label>
        </form>
      </div>

      <>
        <div className="mx-auto grid grid-cols-1 md:grid-cols-3 my-10 gap-5">
          {loans.length === 0 ? (
            <div className="col-span-full text-center py-10 space-y-10">
              <h2 className="text-6xl font-semibold opacity-60">
                No Loan Found
              </h2>
            </div>
          ) : (
            loans.map((loan) => (
              <LoanCard key={loan._id} loan={loan}></LoanCard>
            ))
          )}
        </div>
      </>
      <div className="flex justify-center flex-wrap gap-3 py-5">
        {currentPage > 0 && (
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            className="btn"
          >
            Prev
          </button>
        )}
        {[...Array(totalpages).keys()].map((i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i)}
            className={`btn ${i == currentPage && "btn-primary"}`}
          >
            {i}
          </button>
        ))}
        {currentPage < totalpages - 1 && (
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            className="btn"
          >
            Next{" "}
          </button>
        )}
      </div>
    </div>
  );
};

export default AllLoans;
