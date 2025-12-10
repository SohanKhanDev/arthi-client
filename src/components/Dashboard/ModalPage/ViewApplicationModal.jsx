import React from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { MdCancel } from "react-icons/md";
import MyBtn from "../../Shared/MyBtn";

const ViewApplicationModal = ({ isOpen, closeModal, application }) => {
  if (!application) return null;

  return (
    <Dialog open={isOpen} onClose={closeModal} className="relative z-50">
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        aria-hidden="true"
      />

      {/* Modal panel */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="bg-white rounded-3xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="p-8 pb-6 border-b border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900">
              Application Details
            </h2>
          </div>

          {/* Body */}
          <div className="p-8 text-sm text-slate-700 space-y-3">
            <p>
              <strong>Title:</strong> {application.title}
            </p>
            <p>
              <strong>Applicant:</strong> {application.first_name}{" "}
              {application.last_name}
            </p>
            <p>
              <strong>Address:</strong> {application.address}
            </p>
            <p>
              <strong>Contact No:</strong> {application.contact_no}
            </p>
            <p>
              <strong>NID No:</strong> {application.nid_no}
            </p>
            <p>
              <strong>Income Source:</strong> {application.income_source}
            </p>
            <p>
              <strong>Monthly Income:</strong> {application.monthly_income}
            </p>
            <p>
              <strong>Loan Amount:</strong> {application.loan_amount}
            </p>
            <p>
              <strong>Loan Reason:</strong> {application.loan_reason}
            </p>
            <p>
              <strong>Interest Rate:</strong> {application.interestRate}%
            </p>
            <p>
              <strong>Status:</strong> {application.status}
            </p>
            <p>
              <strong>Fee Status:</strong> {application.fee_status}
            </p>
            <p>
              <strong>Requested By:</strong> {application.requestBy}
            </p>
            <p>
              <strong>Created At:</strong>{" "}
              {new Date(application.createdAt).toLocaleString()}
            </p>
            <p>
              <strong>Notes:</strong> {application.notes}
            </p>
          </div>

          {/* Footer */}
          <div className="px-8 py-6 bg-slate-50 border-t border-slate-200 flex justify-end">
            <MyBtn
              label="Close"
              icon={MdCancel}
              variant="outline"
              size="md"
              onClick={closeModal}
              className="border-slate-200 hover:border-slate-300 hover:bg-slate-50"
            />
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default ViewApplicationModal;
