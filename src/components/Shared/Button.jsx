import React from "react";

export default function Button({
  type = "button",
  className = "",
  children,
  icon: Icon,
  iconPosition = "right", // 👈 default is right
  ...props
}) {
  return (
    <button
      type={type}
      className={`group relative w-full flex justify-center items-center py-3 px-4 text-sm font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl cursor-pointer ${className}`}
      {...props}
    >
      <div className="flex items-center space-x-2">
        {iconPosition === "left" && Icon && (
          <Icon className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        )}
        <span>{children}</span>
        {iconPosition === "right" && Icon && (
          <Icon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        )}
      </div>
    </button>
  );
}