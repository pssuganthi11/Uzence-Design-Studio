import React, { useState } from "react";
import clsx from "clsx";

export interface InputFieldProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  disabled?: boolean;
  invalid?: boolean;
  loading?: boolean;
  variant?: "filled" | "outlined" | "ghost";
  size?: "sm" | "md" | "lg";
  type?: string;
  clearable?: boolean;
  passwordToggle?: boolean;
  mobile?: boolean; // 👈 new prop for mobile number field
}

const sizeClasses = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-5 py-3 text-lg",
};

const variantClasses = {
  outlined:
    "border border-gray-300 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:focus:ring-blue-400",
  filled:
    "bg-gray-100 border border-transparent focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:focus:ring-blue-400",
  ghost:
    "border-0 bg-transparent focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400",
};

const InputField: React.FC<InputFieldProps> = ({
  value = "",
  onChange,
  label,
  placeholder = "Enter text...",
  helperText,
  errorMessage,
  disabled,
  invalid,
  loading,
  variant = "outlined",
  size = "md",
  type = "text",
  clearable = false,
  passwordToggle = false,
  mobile = false, // 👈 default false
}) => {
  const [showPassword, setShowPassword] = useState(false);

  // 👇 if mobile=true, override type & validation
  const inputType =
    mobile
      ? "tel"
      : type === "password" && passwordToggle
      ? showPassword
        ? "text"
        : "password"
      : type;

  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
          {label}
        </label>
      )}

      <div className="relative flex items-center w-full">
        <input
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={mobile ? "Enter mobile number" : placeholder}
          disabled={disabled || loading}
          aria-invalid={invalid}
          pattern={mobile ? "[0-9]{10}" : undefined} // 👈 10 digit mobile validation
          className={clsx(
            "w-full rounded-md border focus:outline-none transition-all duration-200",
            "placeholder-gray-400 dark:placeholder-gray-500",
            sizeClasses[size],
            variantClasses[variant],
            disabled &&
              "bg-gray-200 text-gray-400 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400",
            invalid
              ? "border-red-500 focus:border-red-500 focus:ring focus:ring-red-300"
              : "focus:border-blue-500 focus:ring focus:ring-blue-300",
            loading && "opacity-70"
          )}
        />

        <div className="absolute right-2 flex items-center gap-2">
          {clearable && value && !disabled && !loading && (
            <button
              type="button"
              onClick={() =>
                onChange?.({ target: { value: "" } } as React.ChangeEvent<HTMLInputElement>)
              }
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              aria-label="Clear input"
            >
              ✕
            </button>
          )}

          {type === "password" && passwordToggle && !mobile && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          )}

          {loading && (
            <div className="animate-spin border-2 border-gray-400 border-t-transparent rounded-full w-4 h-4 dark:border-gray-300"></div>
          )}
        </div>
      </div>

      {invalid && errorMessage ? (
        <p className="text-sm text-red-600 dark:text-red-400 mt-1">{errorMessage}</p>
      ) : helperText ? (
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{helperText}</p>
      ) : null}
    </div>
  );
};

export default InputField;
