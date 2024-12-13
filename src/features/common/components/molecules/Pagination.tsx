import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  itemsPerPageOptions: number[];
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (itemsPerPage: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  itemsPerPage,
  itemsPerPageOptions,
  onPageChange,
  onItemsPerPageChange,
}: PaginationProps) {
  return (
    <div className="flex flex-wrap items-center justify-between mt-2 gap-4 w-full">
      {/* Items Per Page Selector */}
      <div className="flex items-center gap-2">
        <span className="text-sm">Show Rows Per Page:</span>
        <select
          value={itemsPerPage}
          onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
          className="border rounded p-1 text-sm"
        >
          {itemsPerPageOptions?.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center gap-2 bg-gray100 px-6 py-4 rounded-md">
        <button
          className="flex items-center justify-center h-7 w-7 rounded-full hover:bg-emerald-500 hover:text-white cursor-pointer"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
        >
          {"<"}
        </button>
        <div className="flex gap-1">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              className={`flex items-center justify-center rounded-full text-sm h-7 w-7 hover:bg-emerald-500 hover:text-white ${
                currentPage === i + 1 ? "bg-emerald-500 text-white" : ""
              }`}
              onClick={() => onPageChange(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
        <button
          className="flex items-center justify-center h-7 w-7 rounded-full hover:bg-emerald-500 hover:text-white"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
        >
          {">"}
        </button>
      </div>
    </div>
  );
}
