import React from "react";

export default function SuccessBadge({ message, type = "success", style = {}, className = "" }) {
  // Determine background color based on type
  const bgClass = type === "success" ? "bg-green-500" : "bg-red-600";
  const textClass = "text-white";

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
      <div
        className={`px-6 py-3 rounded-full font-semibold shadow-md animate-fade-in ${bgClass} ${textClass} ${className} pointer-events-auto`}
        style={style} // custom inline styles
      >
        {message}
      </div>
    </div>
  );
}