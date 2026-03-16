import React, { useState } from "react";
import { Filter } from "lucide-react";

export interface ColumnFilterPopoverProps<TColumn extends string = string> {
  /** The column identifier (used in callbacks and display) */
  column: TColumn;
  /** Placeholder text for the text input */
  placeholder?: string;
  /** If provided, shows a list of options instead of a free‑text input */
  options?: string[];
  /** Callback when filter is applied or cleared */
  onFilter: (column: TColumn, value: string) => void;
  /** The current filter value for this column (to highlight the icon) */
  currentValue?: string;
}

export default function ColumnFilterPopover<TColumn extends string = string>({
  column,
  placeholder = "Filter...",
  options,
  onFilter,
  currentValue,
}: ColumnFilterPopoverProps<TColumn>) {
  const [open, setOpen] = useState(false);
  const [filterValue, setFilterValue] = useState(currentValue || "");

  const handleApply = () => {
    onFilter(column, filterValue);
    setOpen(false);
  };

  const handleClear = () => {
    setFilterValue("");
    onFilter(column, "");
    setOpen(false);
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setOpen(!open)}
        className={`ml-1 p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
          currentValue ? "text-blue-600 dark:text-blue-400" : "text-gray-400"
        }`}
      >
        <Filter className="h-3.5 w-3.5" />
      </button>
      {open && (
        <div className="absolute left-0 top-full mt-1 z-50 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-4">
          <div className="space-y-4">
            <h4 className="font-medium text-sm text-gray-900 dark:text-white">
              Filter by {column}
            </h4>
            {options ? (
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {options.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => {
                      setFilterValue(opt);
                      onFilter(column, opt);
                      setOpen(false);
                    }}
                    className={`w-full text-left px-2 py-1.5 text-sm rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${
                      currentValue === opt
                        ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600"
                        : "text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                <input
                  type="text"
                  placeholder={placeholder}
                  value={filterValue}
                  onChange={(e) => setFilterValue(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
            )}
            <div className="flex justify-between gap-2">
              <button
                onClick={handleClear}
                className="flex-1 px-3 py-1.5 text-sm border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition"
              >
                Clear
              </button>
              <button
                onClick={handleApply}
                className="flex-1 px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}