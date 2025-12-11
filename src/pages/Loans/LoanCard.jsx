// src/pages/LoanCard.jsx
import React from "react";
import { Link } from "react-router";
import MyBtn from "../../components/Shared/MyBtn";

const LoanCard = ({ loan }) => {
  console.log(loan);
  const { _id, image, title, category, interestRate, maxLoanLimit, emiPlans } =
    loan;

  return (
    <article className="group relative w-full overflow-hidden rounded-3xl bg-slate-900 text-white shadow-[0_18px_45px_rgba(15,23,42,0.35)]">
      {/* Image background */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
        style={{ backgroundImage: `url(${image})` }}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-slate-950/60 to-slate-900/5" />

      {/* Content */}
      <div className="relative flex h-full flex-col justify-between p-5">
        {/* Top section: badge + title + category */}
        <div>
          <span className="inline-flex items-center rounded-full bg-slate-900/60 px-3 py-1 text-xs font-medium text-slate-100 backdrop-blur-md border border-white/10">
            <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-emerald-400" />
            {category.toUpperCase()}
          </span>

          <div className="mt-40">
            <h2 className="mt-4 text-xl font-semibold leading-snug">{title}</h2>
          </div>

          {/* Interest + max limit + emi */}
          <div className="mt-4 flex items-center gap-4 text-xs text-slate-200/90 justify-between">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-900/70 text-[0.65rem] border border-white/10">
                %
              </span>
              <div>
                <p className="text-[0.7rem] uppercase tracking-wide text-slate-300/70">
                  Interest
                </p>
                <p className="text-sm font-semibold">{interestRate}%</p>
              </div>
            </div>

            <div className="h-10 w-px bg-white/10" />

            <div>
              <p className="text-[0.7rem] uppercase tracking-wide text-slate-300/70">
                EMI Plan
              </p>
              <p className="text-sm font-semibold">{emiPlans}%</p>
            </div>

            <div className="h-10 w-px bg-white/10" />

            <div>
              <p className="text-[0.7rem] uppercase tracking-wide text-slate-300/70">
                Max loan limit
              </p>
              <p className="text-sm font-semibold">
                {`Tk. ${maxLoanLimit.toLocaleString()}`}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom: button */}
        <div className="mt-6">
          <MyBtn
            to={`/loan/${_id}`}
            label="View details"
            size="sm"
            variant="cancel"
            className="w-full"
            // icon={PiRocketLaunchLight}
          />
        </div>
      </div>
    </article>
  );
};

export default LoanCard;
