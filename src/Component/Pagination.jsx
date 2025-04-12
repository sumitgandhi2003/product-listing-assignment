import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTheme } from "../Context/themeContext";
import { Button } from "../Libs";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const { theme } = useTheme();
  return (
    <div className="flex items-center justify-center mt-5 gap-2 p-4 font-semibold ">
      <Button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`w-10 h-10 flex items-center justify-center rounded-lg border hover:bg-gray-200 disabled:opacity-50 ${
          theme === "dark" ? "bg-black text-white" : "bg-white text-black"
        }`}
        icon={<ChevronLeft size={20} />}
      />

      {pages.map((page) => (
        <Button
          key={page}
          onClick={() => onPageChange(page)}
          className={`w-10 h-10 p-2 rounded-lg flex items-center justify-center border ${
            currentPage === page
              ? "bg-blue-600 text-white"
              : theme === "dark"
              ? "border-gray-700 hover:bg-gray-800"
              : "border-gray-300 hover:bg-gray-200"
          }`}
          btntext={page}
        />
      ))}

      <Button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`w-10 h-10 flex items-center justify-center rounded-lg border hover:bg-gray-200 disabled:opacity-50 ${
          theme === "dark" ? "bg-black text-white" : "bg-white text-black"
        }`}
        icon={<ChevronRight size={20} />}
      />
    </div>
  );
};

export default Pagination;
