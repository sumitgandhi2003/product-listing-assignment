import React, { forwardRef } from "react";
import { useTheme } from "../Context/themeContext";

const Input = forwardRef(
  (
    {
      type = "text",
      placeholder,
      onChange,
      value,
      name,
      id,
      className,
      checked,
      required,
      multiple,
      accept,
      pattern,
      disabled,
      onFocus,
      maxLength,
      onKeyDown,
      onBlur,
      onSubmit,
      // Add any other props you need here
    },
    ref
  ) => {
    const { theme } = useTheme();
    const defaultFunction = () => {};

    return (
      <input
        type={type}
        placeholder={placeholder}
        onChange={onChange || defaultFunction}
        value={value || ""}
        name={name}
        id={id}
        className={`${className} outline-none p-2 rounded-md border-2 font-roboto ${
          theme === "dark"
            ? "bg-gray-700 text-white border-gray-600 focus:border-gray-300"
            : "text-gray-900 bg-gray-100 border-gray-300 focus:border-gray-600"
        } `}
        checked={checked}
        multiple={multiple}
        required={required}
        accept={accept}
        pattern={pattern}
        disabled={disabled}
        onFocus={onFocus}
        maxLength={maxLength}
        onKeyDown={onKeyDown}
        onBlur={onBlur}
        onSubmit={onSubmit || defaultFunction}
        ref={ref} // ✅ Now ref is correctly passed
      />
    );
  }
);

export default Input;
