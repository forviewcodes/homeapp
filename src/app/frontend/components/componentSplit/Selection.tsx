import React, { useState } from "react";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import SelectCategory from "./SelectCategory";
import ControlledDateInput from "./SelectDayFormatter";

export default function Selections() {
  const [mainCategory, setMainCategory] = useState("");
  const [innerCategory, setInnerCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [remarks, setRemarks] = useState("");
  const [savedData, setSavedData] = useState<{
    category: string;
    expenses: number;
    date: string;
    remarks: string;
  } | null>(null);

  const handleConfirmData = () => {
    if (mainCategory && innerCategory && amount && date) {
      const saveObject = {
        category: `${mainCategory} - ${innerCategory}`,
        expenses: parseFloat(amount),
        date: date,
        remarks: remarks || "No remarks",
      };
      setSavedData(saveObject);
    } else {
      alert("Please fill in all required fields");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white border border-gray-200 rounded-xl shadow-2xl overflow-hidden">
      <div className="bg-indigo-600 text-white px-6 py-4">
        <h2 className="text-xl font-bold tracking-tight">Create New Post</h2>
      </div>
      <div className="p-6 space-y-6">
        <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-4">
          <label className="block text-sm font-medium text-indigo-700 mb-2">
            Select Category
          </label>
          <SelectCategory
            onMainCategoryChange={setMainCategory}
            onInnerCategoryChange={setInnerCategory}
          />
        </div>
        <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-4">
          <label className="block text-sm font-medium text-indigo-700 mb-2">
            Enter Amount
          </label>
          <div className="flex items-center space-x-3">
            <span className="text-gray-500 font-medium">RM</span>
            <Input
              type="number"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="flex-grow focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
        <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-4">
          <label className="block text-sm font-medium text-indigo-700 mb-2">
            Select Date
          </label>
          <div className="flex items-center space-x-3">
            <span className="text-gray-500 font-medium">Date</span>
            <ControlledDateInput onDateChange={setDate} />
          </div>
        </div>
        <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-4">
          <label className="block text-sm font-medium text-indigo-700 mb-2">
            Write Remarks
          </label>
          <div className="flex items-center space-x-3">
            <Input
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              placeholder="Optional remarks"
            />
          </div>
        </div>
        <Button
          onClick={handleConfirmData}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
        >
          Confirm Data
        </Button>
      </div>
      <div className="bg-gray-50 p-4 border-t border-gray-200">
        <p className="text-sm text-gray-600 text-center pb-4">
          Saved output will appear here
        </p>
        {savedData && (
          <pre className="bg-white p-4 rounded-lg border border-gray-200 text-sm overflow-auto">
            {JSON.stringify(savedData, null, 2)}
          </pre>
        )}
        <Button
          disabled={!savedData}
          className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white disabled:opacity-50"
        >
          Post Data
        </Button>
      </div>
    </div>
  );
}