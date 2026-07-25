import React, { useId } from "react";

function SelectOptions(
  {
    options = [],
    label,
    defaultValue = "",
    className = "",
    placeholder = "-- Select an option --",
    isBoolean = false, // 👈 new flag
    ...props
  },
  ref
) {
  const id = useId();

  const handleChange = (e) => {
    const value = e.target.value;
    if (props.onChange) {
      if (isBoolean) {
        // 🔄 convert only when explicitly boolean
        props.onChange(value === "true");
      } else {
        props.onChange(value);
      }
    }
  };

  return (
    <div>
      {label && <label htmlFor={id}>{label}</label>}

      <select
        {...props}
        id={id}
        ref={ref}
        value={props.value} // ✅ keep it controlled for RHF
        onChange={handleChange}
        className={`w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm text-gray-800 dark:text-white bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${className}`}
      >
        {/* Default placeholder */}
        {defaultValue === "" && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}

        {/* Render options */}
        {options?.map((option, index) =>
          typeof option === "object" ? (
            <option key={index} value={String(option.value)}>
              {option.label}
            </option>
          ) : (
            <option key={index} value={String(option)}>
              {option}
            </option>
          )
        )}
      </select>
    </div>
  );
}

export default React.forwardRef(SelectOptions);