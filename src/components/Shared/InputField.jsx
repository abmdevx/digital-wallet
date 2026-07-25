import React, { useId } from "react";
import { Eye, EyeOff, AlertCircle } from "lucide-react";

const InputField = React.forwardRef(function InputField(
  {
    label,
    type = "text",
    name,
    value,
    onChange,
    placeholder,
    icon: Icon,
    iconPosition = "left", // new prop
    showToggle,
    onToggle,
    error,
    ...props
  },
  ref
) {
  const id = useId();

  return (
    <div className="space-y-1">
      {/* Label */}
      {label && (
        <label
          htmlFor={id}
          className="text-sm font-medium text-gray-300 flex items-center"
        >
          {Icon && iconPosition === "left" && (
            <Icon className="w-4 h-4 mr-2 text-blue-400" />
          )}
          {label}
        </label>
      )}

      <div className="relative group">
        {/* Left Icon inside input */}
        {Icon && iconPosition === "left" && !label && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon
              className={`h-5 w-5 ${
                error ? "text-red-400" : "text-gray-400"
              } transition-colors`}
            />
          </div>
        )}

        {/* Right Icon inside input */}
        {Icon && iconPosition === "right" && !label && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <Icon
              className={`h-5 w-5 ${
                error ? "text-red-400" : "text-gray-400"
              } transition-colors`}
            />
          </div>
        )}

        {/* Input */}
        <input
          id={id}
          ref={ref}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder || `Enter ${label || name}`}
          className={`block w-full py-3 rounded-lg text-white bg-white/10 dark:bg-gray-800/50 border ${
            error
              ? "border-red-400 focus:border-red-500 focus:ring-red-500"
              : "border-gray-600 focus:border-blue-400 focus:ring-blue-500/50"
          } ${
            Icon && iconPosition === "left" && !label ? "pl-10" : "pl-3"
          } ${
            showToggle || (Icon && iconPosition === "right" && !label)
              ? "pr-10"
              : "pr-3"
          } placeholder-gray-400 focus:outline-none focus:ring-opacity-50 transition-all duration-200`}
          {...props}
        />

        {/* Password toggle */}
        {showToggle && (
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            onClick={onToggle}
          >
            {type === "password" ? (
              <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
            ) : (
              <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
            )}
          </button>
        )}
      </div>

      {/* Error */}
      {error && (
        <p className="text-red-400 text-sm mt-1 flex items-center">
          <AlertCircle className="w-4 h-4 mr-1" />
          {error}
        </p>
      )}
    </div>
  );
});

export default InputField;