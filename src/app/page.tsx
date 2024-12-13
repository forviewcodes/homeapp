"use client";
export const runtime = "edge";
import { useEffect, useState } from "react";
import Selections from "./frontend/components/componentSplit/Selection";
import BudgetEssentialChart from "./frontend/components/charts/budgetEssential";
import BudgetFoodChart from "./frontend/components/charts/budgetFood";
import BudgetTotalChart from "./frontend/components/charts/budgetTotal";
import BudgetUtilitiesChart from "./frontend/components/charts/budgetUtilities";
import BudgetTransportChart from "./frontend/components/charts/budgetTransport";
import BudgetForceSavingChart from "./frontend/components/charts/budgetForceSaving";
import BudgetHealthChart from "./frontend/components/charts/budgetHealth";
import BudgetInputMoneyChart from "./frontend/components/charts/budgetInputMoney";
import { Switch } from "./frontend/components/ui/Switch";

interface TransactionArray {
  _id: string;            // Unique identifier for each expense record
  category: string;       // Category of the expense (e.g., "Food - Eat Out", "Transport - Fuel", etc.)
  expenses: number;       // Amount of money spent (in numeric form)
  date: string;           // Date when the expense was recorded (ISO 8601 format, e.g., "2024-12-10")
  remarks: string;        // Description or remarks associated with the expense
}

interface Transaction {
  documents: TransactionArray[];  // Array of expense documents
}

export default function MainPage() {
  const [transactions, setTransactions] = useState<Transaction | null>(null); // Set initial state to null
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // State to control visibility
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch("/api/getAllTransactions");
        if (!response.ok) {
          throw new Error("Failed to fetch transactions");
        }
        const data: Transaction = await response.json();
        setTransactions(data); // Store the entire data object, not just documents
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        setLoading(false);
      }
    };
    fetchTransactions();
  }, []);

  // If transactions are still loading, show a loading state
  if (loading) {
    return <div className="p-4">Loading transactions...</div>;
  }

  // If there's an error, display it
  if (error) {
    return <div className="p-4 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-6 bg-white space-y-6 items-center flex flex-col">
      <Selections />

      <div>
        <h1 className=" min-w-[450px] flex text-2xl font-bold p-4 border border-gray-200 bg-gray-50 text-gray-800 rounded-t-lg items-center justify-between">
          <div>Transactions</div>
          <Switch checked={isVisible} onCheckedChange={setIsVisible} />
        </h1>
        {isVisible && (
          <div className="border border-gray-200 rounded-b-lg shadow-sm max-w-md flex justify-center items-center">
            <div className="divide-y divide-gray-100">
              {transactions?.documents.map((transaction) => (
                <div
                  key={transaction._id}
                  className="p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="font-medium text-gray-600">Category:</div>
                    <div>{transaction.category}</div>

                    <div className="font-medium text-gray-600">Remarks:</div>
                    <div>{transaction.remarks}</div>

                    <div className="font-medium text-gray-600">Amount:</div>
                    <div className="text-green-600 font-semibold">
                      RM {transaction.expenses}
                    </div>

                    <div className="font-medium text-gray-600">Date:</div>
                    <div>{transaction.date}</div>

                    <div className="font-medium text-gray-600">ID:</div>
                    <div className="text-gray-500 text-xs">
                      {transaction._id}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="border border-gray-200 min-w-[800px] rounded-lg shadow-sm">
        <BudgetInputMoneyChart transactions={transactions?.documents} />
        <BudgetTotalChart transactions={transactions?.documents} />
        <BudgetFoodChart transactions={transactions?.documents} />
        <BudgetEssentialChart transactions={transactions?.documents} />
        <BudgetForceSavingChart transactions={transactions?.documents} />
        <BudgetHealthChart transactions={transactions?.documents} />
        <BudgetTransportChart transactions={transactions?.documents} />
        <BudgetUtilitiesChart transactions={transactions?.documents} />
      </div>
    </div>
  );
}
