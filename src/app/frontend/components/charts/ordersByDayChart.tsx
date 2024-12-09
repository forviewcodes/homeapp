import React from "react";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";

interface Transaction {
  _id: string;
  expenses: number;
  date: string;
  category: string;
  remarks: string;
}

interface Props {
  transactions?: Transaction[];
}

export default function OrdersByDayChart({ transactions = [] }: Props) {
  // Calculate for Total category
  //======================================================================
  const categoryTotals = transactions.reduce((acc, transaction) => {
    const category = transaction.category || "Uncategorized";
    acc[category] = (acc[category] || 0) + transaction.expenses;
    return acc;
  }, {} as Record<string, number>);
  // Recharts use array format
  const data = Object.entries(categoryTotals).map(([name, value]) => ({
    name,
    value,
  }));
  const total = data.reduce((sum, item) => sum + item.value, 0);
  //======================================================================

  // Category A - Calculate for Used / Total Budget Set
  //======================================================================

  //Find Total Budget Used
  //Calculate Total Budget Used as collection of object
  const categoryBudgetUsedTotals = transactions.reduce((acc, transaction) => {
    if (!transaction.category.includes("Budget")) {
      const category = "Total Money Used";
      acc[category] = (acc[category] || 0) + transaction.expenses;
    }
    return acc;
  }, {} as Record<string, number>);
  //Calculate total Value Budget Set Up
  const totalValueBudgetUsed = categoryBudgetUsedTotals["Total Money Used"];

  //Find Total Budget Set Up
  // Calculate total Budget Set Up as a collection of object
  const categoryBudgetTotalSet = transactions.reduce((acc, transaction) => {
    if (transaction.category.includes("Budget")) {
      const category = "Total Budget Set";
      acc[category] = (acc[category] || 0) + transaction.expenses;
    }
    return acc;
  }, {} as Record<string, number>);
  //Calculate total Value Budget Set Up
  const totalValueBudgetSet = categoryBudgetTotalSet["Total Budget Set"];

  //Find Total Leftover Budget
  const totalValueBudgetLeftover = totalValueBudgetSet - totalValueBudgetUsed;

  //Feed Data used and Leftover
  const dataCategoryAFeed = [
    { name: "Used", value: totalValueBudgetUsed },
    { name: "Leftover", value: totalValueBudgetLeftover },
  ];

  //======================================================================

  // Calculate for Essentials Used / Total Budget Essentials
  //======================================================================
  // const categoryBudgetTotals = transactions.reduce((acc, transaction) => {
  //   if (transaction.category.includes("Budget")) {
  //     const category = transaction.category;
  //     acc[category] = (acc[category] || 0) + transaction.expenses;
  //   }
  //   return acc;
  // }, {} as Record<string, number>);
  // console.log(categoryBudgetTotals);

  // const data = Object.entries(categoryBudgetTotals).map(
  //   ([name, value]) => ({
  //     name,
  //     value,
  //   })
  // );

  // Calculate for Food Used / Total Budget Food
  //======================================================================
  // const categoryBudgetTotals = transactions.reduce((acc, transaction) => {
  //   if (transaction.category.includes("Budget")) {
  //     const category = transaction.category;
  //     acc[category] = (acc[category] || 0) + transaction.expenses;
  //   }
  //   return acc;
  // }, {} as Record<string, number>);
  // console.log(categoryBudgetTotals);

  // const data = Object.entries(categoryBudgetTotals).map(
  //   ([name, value]) => ({
  //     name,
  //     value,
  //   })
  // );

  // Calculate for Utilities Used / Total Budget Utilities
  //======================================================================
  // const categoryBudgetTotals = transactions.reduce((acc, transaction) => {
  //   if (transaction.category.includes("Budget")) {
  //     const category = transaction.category;
  //     acc[category] = (acc[category] || 0) + transaction.expenses;
  //   }
  //   return acc;
  // }, {} as Record<string, number>);
  // console.log(categoryBudgetTotals);

  // const data = Object.entries(categoryBudgetTotals).map(
  //   ([name, value]) => ({
  //     name,
  //     value,
  //   })
  // );

  // Calculate for Saving / Total Budget Saving
  //======================================================================
  // const categoryBudgetTotals = transactions.reduce((acc, transaction) => {
  //   if (transaction.category.includes("Budget")) {
  //     const category = transaction.category;
  //     acc[category] = (acc[category] || 0) + transaction.expenses;
  //   }
  //   return acc;
  // }, {} as Record<string, number>);
  // console.log(categoryBudgetTotals);

  // const data = Object.entries(categoryBudgetTotals).map(
  //   ([name, value]) => ({
  //     name,
  //     value,
  //   })
  // );

  // Calculate for Transport Used / Total Budget Transport
  //======================================================================
  // const categoryBudgetTotals = transactions.reduce((acc, transaction) => {
  //   if (transaction.category.includes("Budget")) {
  //     const category = transaction.category;
  //     acc[category] = (acc[category] || 0) + transaction.expenses;
  //   }
  //   return acc;
  // }, {} as Record<string, number>);
  // console.log(categoryBudgetTotals);

  // const data = Object.entries(categoryBudgetTotals).map(
  //   ([name, value]) => ({
  //     name,
  //     value,
  //   })
  // );

  // Calculate for Health Used / Total Budget Health Set
  //======================================================================
  // const categoryBudgetTotals = transactions.reduce((acc, transaction) => {
  //   if (transaction.category.includes("Budget")) {
  //     const category = transaction.category;
  //     acc[category] = (acc[category] || 0) + transaction.expenses;
  //   }
  //   return acc;
  // }, {} as Record<string, number>);
  // console.log(categoryBudgetTotals);

  // const data = Object.entries(categoryBudgetTotals).map(
  //   ([name, value]) => ({
  //     name,
  //     value,
  //   })
  // );

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

  return (
    <div className="w-full justify-center">
      <div className="p-4 bg-gray-50 border font-semibold text-gray-800">
        Initial Chart
      </div>
      <PieChart width={800} height={700}>
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
            `RM ${value.toLocaleString("en-US", { minimumFractionDigits: 2 })}`
          }
        />
        <Legend />
      </PieChart>

      <div className="p-4 bg-gray-50 border font-semibold text-gray-800">
        Budget Used / Total Budget Set
      </div>
      <PieChart width={800} height={700}>
        <Pie
          data={dataCategoryAFeed}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, value }) =>
            `${name} (${((value / totalValueBudgetSet) * 100).toFixed(0)}%)`
          }
          outerRadius={150}
          fill="#8884d8"
          dataKey="value"
        >
          {dataCategoryAFeed.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          formatter={(value: number) =>
            `RM ${value.toLocaleString("en-US", { minimumFractionDigits: 2 })}`
          }
        />
        <Legend />
      </PieChart>
      <div className=" flex items-center justify-center p-2 font-semibold border">
        Total Budget set is&nbsp;
        <div className="text-blue-500">RM {totalValueBudgetSet}</div>
      </div>
      <div className=" flex items-center justify-center p-2 font-semibold border">
        Total Budget Used is&nbsp;
        <div className="text-blue-500">RM {totalValueBudgetUsed}</div>
      </div>
      <div className=" flex items-center justify-center p-2 font-semibold border">
        Total Budget Leftover is&nbsp;
        <div className="text-blue-500">RM {totalValueBudgetLeftover}</div>
      </div>

      {/* 

      <div className="p-4 bg-gray-50 border font-semibold text-gray-800">
        Budget Food Used / Total Budget Food
      </div>
      <PieChart width={800} height={700}>
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
            `RM ${value.toLocaleString("en-US", { minimumFractionDigits: 2 })}`
          }
        />
        <Legend />
      </PieChart>

      <div className="p-4 bg-gray-50 border font-semibold text-gray-800">
        Budget Utilites Used / Total Budget Utilities
      </div>
      <PieChart width={800} height={700}>
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
            `RM ${value.toLocaleString("en-US", { minimumFractionDigits: 2 })}`
          }
        />
        <Legend />
      </PieChart>

      <div className="p-4 bg-gray-50 border font-semibold text-gray-800">
        Saving / Total Budget Savings
      </div>
      <PieChart width={800} height={700}>
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
            `RM ${value.toLocaleString("en-US", { minimumFractionDigits: 2 })}`
          }
        />
        <Legend />
      </PieChart>

      <div className="p-4 bg-gray-50 border font-semibold text-gray-800">
        Transport Used/ Total Budget Transport
      </div>
      <PieChart width={800} height={700}>
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
            `RM ${value.toLocaleString("en-US", { minimumFractionDigits: 2 })}`
          }
        />
        <Legend />
      </PieChart>
      <div className="p-4 bg-gray-50 border font-semibold text-gray-800">
        Health Used / Total Budget Health
      </div>
      <PieChart width={800} height={700}>
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
            `RM ${value.toLocaleString("en-US", { minimumFractionDigits: 2 })}`
          }
        />
        <Legend />
      </PieChart> */}
    </div>
  );
}
