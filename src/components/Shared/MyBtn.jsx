import { useNavigate } from "react-router";

const MyBtn = ({
  label,
  onClick,
  disabled = false,
  variant = "primary",
  size = "lg",
  icon: Icon,
  className = "",
  to,
}) => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    if (disabled) return;

    if (to) {
      navigate(to);
      return;
    }

    if (onClick) onClick(e);
  };

  return (
    <button
      disabled={disabled}
      onClick={handleClick}
      className={`
        relative group overflow-hidden flex-1
        disabled:opacity-70 disabled:cursor-not-allowed
        font-semibold rounded-2xl shadow-xl hover:shadow-2xl
        hover: transition-all duration-300
        flex items-center justify-center
        ${getVariantStyles(variant)}
        ${getSizeStyles(size)}
        ${iconPositionStyles(!!Icon)}
        ${className}
      `}
    >
      <div className="absolute inset-0 bg-linear-to-r from-white/20 to-transparent -skew-x-12 -translate-x-[120%] group-hover:translate-x-[120%] transition-transform duration-1000" />

      <span className="relative z-10 flex items-center">
        {Icon && (
          <Icon
            size={size === "sm" ? 16 : size === "md" ? 20 : 24}
            className="mr-2"
          />
        )}
        {label}
      </span>
    </button>
  );
};

const getVariantStyles = (variant) => {
  switch (variant) {
    case "primary":
      return "bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white border border-emerald-500/50";
    case "secondary":
      return "bg-gradient-to-r from-slate-500 to-slate-700 hover:from-slate-600 hover:to-slate-800 text-white border border-slate-500/50";
    case "danger":
      return "bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-600 hover:to-red-700 text-white border border-rose-500/50";
    case "cancel":
      return "bg-gradient-to-r from-white to-white hover:from-white hover:to-white text-black border border-black";
    default:
      return "bg-gradient-to-r from-slate-500 to-slate-700 hover:from-slate-600 hover:to-slate-800 text-white border border-slate-500/50";
  }
};

const getSizeStyles = (size) => {
  switch (size) {
    case "sm":
      return "px-4 py-2 text-sm";
    case "md":
      return "px-6 py-3 text-base";
    case "lg":
    default:
      return "px-8 py-4 text-lg";
  }
};

const iconPositionStyles = (hasIcon) => (hasIcon ? "" : "");

export default MyBtn;
