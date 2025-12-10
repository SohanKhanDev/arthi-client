import React from "react";

const ReportBtn = ({
  icon: Icon,
  type = "button",
  onClick,
  color = "emerald",
  size = "md",
  children,
  label,
  disabled = false,
  className = "",
  title,
  isSubmit = false,
}) => {
  const baseStyles =
    "inline-flex items-center gap-2 px-6 py-2.5 font-medium rounded-xl shadow-sm border hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed";

  const sizeStyles = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-2.5 text-sm",
    lg: "px-8 py-3 text-base",
  };

  const colorStyles = {
    slate: {
      icon: "text-slate-500 hover:text-slate-700",
      bg: "bg-white border-slate-200 hover:bg-slate-50 focus:ring-slate-500",
    },
    emerald: {
      icon: "text-emerald-500 hover:text-emerald-700",
      bg: "bg-white border-emerald-200 hover:bg-emerald-50 focus:ring-emerald-500",
    },
    blue: {
      icon: "text-blue-500 hover:text-blue-700",
      bg: "bg-white border-blue-200 hover:bg-blue-50 focus:ring-blue-500",
    },
    red: {
      icon: "text-red-500 hover:text-red-700",
      bg: "bg-white border-red-200 hover:bg-red-50 focus:ring-red-500",
    },
  };

  const finalType = isSubmit ? "submit" : type;
  const colorStyle = colorStyles[color] || colorStyles.emerald;
  const buttonClass = `${baseStyles} ${sizeStyles[size]} ${colorStyle.bg}`;

  const handleClick = (e) => {
    if (disabled) return;
    if (onClick) onClick(e);
  };

  return (
    <div className={`flex flex-col items-center gap-2 ${className}`}>
      {/* Button */}
      <button
        type={finalType}
        onClick={handleClick}
        disabled={disabled}
        title={title}
        className={buttonClass}
      >
        {Icon && <Icon className={`w-4 h-4 ${colorStyle.icon}`} />}
        {children && <span className={colorStyle.icon}>{children}</span>}
      </button>

      {/* Label (optional) */}
      {label && (
        <span className="text-xs text-slate-500 font-medium uppercase tracking-wide">
          {label}
        </span>
      )}
    </div>
  );
};

export default ReportBtn;
