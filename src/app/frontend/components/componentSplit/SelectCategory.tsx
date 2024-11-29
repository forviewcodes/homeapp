import * as React from "react";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/Select";

// Define types
type MainCategory =
  | "essentials"
  | "food"
  | "utilities"
  | "savings"
  | "transport"
  | "health";

// Mapping of main categories to their inner categories
const categoryMap: Record<MainCategory, string[]> = {
  essentials: ["House Rent", "Parking Rent", "Childcare", "Belanja Dalila"],
  food: ["Groceries", "Eat Out", "Entertainment"],
  utilities: [
    "Electric Bills",
    "Water Bills",
    "Internet Bills",
    "Telco",
    "Icloud",
  ],
  savings: [
    "Sinking Fund",
    "Emergency Fund",
    "Harris TH",
    "Harris ASB",
    "Dalila TH",
    "Dalila ASB",
    "Dalila PG",
    "Noah TH",
    "Noah ASB",
    "Noah PG",
  ],
  transport: ["Fuel", "Toll", "Maintenance", "Urgent Repair"],
  health: ["Medical Card", "Outpatient", "Vaccine"],
};

interface SelectCategoryProps {
  onMainCategoryChange?: (category: MainCategory | "") => void;
  onInnerCategoryChange?: (category: string) => void;
}

export default function SelectCategory({
  onMainCategoryChange,
  onInnerCategoryChange,
}: SelectCategoryProps) {
  const [mainCategory, setMainCategory] = useState<MainCategory | "">("");
  const [innerCategory, setInnerCategory] = useState<string>("");

  const handleMainCategoryChange = (value: MainCategory) => {
    setMainCategory(value);
    setInnerCategory(""); // Reset inner category
    onMainCategoryChange?.(value);
  };

  const handleInnerCategoryChange = (value: string) => {
    setInnerCategory(value);
    onInnerCategoryChange?.(value);
  };

  return (
    <div>
      <div className="border-b-2 bg-indigo-100 mb-4 p-4 rounded-t-lg">
        <div className="mb-2 text-indigo-800 font-semibold">Main Category</div>
        <Select onValueChange={handleMainCategoryChange}>
          <SelectTrigger className="w-full text-indigo-700 border-indigo-300 focus:ring-2 focus:ring-indigo-500">
            <SelectValue placeholder="Select Your Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {Object.keys(categoryMap).map((category) => (
                <SelectItem
                  key={category}
                  value={category}
                  className="hover:bg-indigo-50 focus:bg-indigo-100"
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="border-b-2 bg-indigo-100 p-4 rounded-b-lg">
        <div className="mb-2 text-indigo-800 font-semibold">Inner Category</div>
        <Select
          disabled={!mainCategory}
          onValueChange={handleInnerCategoryChange}
        >
          <SelectTrigger className="w-full text-indigo-700 border-indigo-300 disabled:opacity-50 focus:ring-2 focus:ring-indigo-500">
            <SelectValue
              placeholder={
                mainCategory
                  ? "Select Inner Category"
                  : "Select Main Category First"
              }
            />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {mainCategory &&
                categoryMap[mainCategory].map((innerCat) => (
                  <SelectItem
                    key={innerCat}
                    value={innerCat}
                    className="hover:bg-indigo-50 focus:bg-indigo-100"
                  >
                    {innerCat}
                  </SelectItem>
                ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
