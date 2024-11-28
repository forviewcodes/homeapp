"use client";
import { useEffect, useState } from "react";
import OrdersByDayChart from "./frontend/components/charts/ordersByDayChart";

interface Transaction {
  _id: string;
  amount: number;
  date: string;
  category: string;
  description: string;
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
    <div className="p-4">
      <div className="border-2 border-black ">
        <h1 className="text-2xl font-bold mb-4">Transactions</h1>
        <div className="space-y-2">
          {transactions?.map((transaction) => (
            <div key={transaction._id} className="p-2 border rounded">
              <p>Amount: {transaction.category}</p>
              <p>Amount: {transaction.description}</p>
              <p>Amount: {transaction.amount}</p>
              <p>Date: {transaction.date}</p>
              <p>id : {transaction._id}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="border-2 border-black">
        <div>Chart Here</div>
        <OrdersByDayChart transactions={transactions}></OrdersByDayChart>
      </div>
    </div>
  );
}
