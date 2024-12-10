"use client";
import { useEffect, useState } from "react";
import Selections from "./frontend/components/componentSplit/Selection";
import BudgetEssentialChart from "./frontend/components/charts/budgetEssential";
import BudgetFoodChart from "./frontend/components/charts/budgetFood";
import BudgetTotalChart from "./frontend/components/charts/budgetTotal";
import BudgetUtilitiesChart from "./frontend/components/charts/budgetUtilities";
import BudgetTransportChart from "./frontend/components/charts/budgetTransport";
import BudgetForceSavingChart from "./frontend/components/charts/budgetForceSaving";
import BudgetHealthChart from "./frontend/components/charts/budgetHealth";

interface Transaction {
  _id: string;
  expenses: number;
  date: string;
  category: string;
  remarks: string;
}

export default function MainPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch("/api/getAllTransactions");
        if (!response.ok) {
          throw new Error("Failed to fetch transactions");
        }
        const data: Transaction[] = await response.json();
        setTransactions(data);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        setLoading(false);
      }
    };
    fetchTransactions();
  }, []);

  if (loading) {
    return <div className="p-4">Loading transactions...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-6 bg-white space-y-6 items-center flex flex-col">
      <Selections />
      <div>
        <h1 className="text-2xl font-bold p-4 border border-gray-200 bg-gray-50 text-gray-800 rounded-t-lg">
          Transactions
        </h1>
        <div className="border border-gray-200 rounded-b-lg shadow-sm max-w-md flex justify-center items-center">
          <div className="divide-y divide-gray-100">
            {transactions?.map((transaction) => (
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
                  <div className="text-gray-500 text-xs">{transaction._id}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="border border-gray-200 min-w-[800px] rounded-lg shadow-sm">
        <BudgetTotalChart transactions={transactions} />
        <BudgetFoodChart transactions={transactions} />
        <BudgetEssentialChart transactions={transactions} />
        <BudgetForceSavingChart transactions={transactions} />
        <BudgetHealthChart transactions={transactions} />
        <BudgetTransportChart transactions={transactions} />
        <BudgetUtilitiesChart transactions={transactions} />
      </div>
    </div>
  );
}
