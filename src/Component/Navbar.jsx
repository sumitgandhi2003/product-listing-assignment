import React from "react";
import { useTheme } from "../Context/themeContext";
import { Button, Input } from "../Libs";
import { Moon, Sun, User } from "lucide-react";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div
      className={`flex items-center justify-between p-4 border-b ${
        theme === "dark" ? " bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <h1 className="text-2xl font-bold text-blue-600">Product Listing</h1>
      <div className="flex gap-4 items-center">
        <Input
          type="text"
          placeholder="Search cars, brands, or models..."
          className={`rounded-md px-3 py-2 border focus:outline-none focus:ring w-72 ${
            theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"
          }"`}
        />
        <Button
          icon={<User className="w-4 h-4" />}
          btntext="Sign In"
          className="px-2 py-1 rounded-md bg-blue-600 flex items-center text-white hover:bg-blue-700 transition duration-200"
        />
        <Button
          icon={
            theme === "dark" ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />
            )
          }
          className="p-1 rounded-md cursor-pointer hover:bg-gray-200 transition duration-200"
          onClick={toggleTheme}
        />
      </div>
    </div>
  );
};

export default Navbar;
