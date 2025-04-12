import { useState } from "react";
import { Grid, List } from "lucide-react"; // Optional: install lucide-react or use your own icons
import { useTheme } from "../Context/themeContext";
import { Button } from "../Libs";

const ViewToggle = ({ viewStyle, setViewStyle }) => {
  const { theme } = useTheme(); // Assuming you have a theme context to manage themes

  return (
    <div
      className={`flex border  rounded-lg  overflow-hidden w-[80px] h-[40px] shadow ${
        theme === "dark" ? "border-gray-500" : "border-gray-200"
      }`}
    >
      <Button
        onClick={() => setViewStyle("grid")}
        className={`flex-1 flex items-center justify-center cursor-pointer ${
          viewStyle === "grid"
            ? "bg-blue-600 text-white"
            : "bg-white text-black"
        }`}
        icon={<Grid className="w-5 h-5" />}
      />
      <Button
        onClick={() => setViewStyle("list")}
        className={`flex-1 flex items-center justify-center cursor-pointer ${
          viewStyle === "list"
            ? "bg-blue-600 text-white"
            : "bg-white text-black"
        }`}
        icon={<List className="w-5 h-5" />}
      />
    </div>
  );
};

export default ViewToggle;
