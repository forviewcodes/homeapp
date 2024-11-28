import React from "react";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";

interface Transaction {
  _id: string;
  amount: number;
  date: string;
  category: string;
  description: string;
}

interface Props {
  transactions?: Transaction[];
}

export default function OrdersByDayChart({ transactions = [] }: Props) {
  // Process transactions to group by category and sum amounts
  const categoryTotals = transactions.reduce((acc, transaction) => {
    const category = transaction.category || "Uncategorized";
    acc[category] = (acc[category] || 0) + transaction.amount;
    return acc;
  }, {} as Record<string, number>);

  // Convert to array format for Recharts
  const data = Object.entries(categoryTotals).map(([name, value]) => ({
    name,
    value,
  }));

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="w-full flex justify-center">
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, value }) =>
            `${name} (${((value / total) * 100).toFixed(0)}%)`
          }
          outerRadius={150}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          formatter={(value: number) =>
            `$${value.toLocaleString("en-US", { minimumFractionDigits: 2 })}`
          }
        />
        <Legend />
      </PieChart>
    </div>
  );
}
