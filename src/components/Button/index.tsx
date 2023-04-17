import classNames from "classnames";

export interface ButtonProps
  extends Omit<React.HTMLProps<HTMLButtonElement>, "type"> {
  variant?:
    | "primary"
    | "secondary"
    | "neutral"
    | "danger"
    | "outline"
    | "cancel";
}

export default function Button({
  variant = "primary",
  children,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={classNames(
        "transform rounded-md px-4 py-2 text-sm font-semibold transition-colors duration-200 focus:outline-none focus:ring focus:ring-opacity-50",
        {
          "bg-sky-600 text-white hover:bg-sky-700 focus:ring-sky-300":
            variant === "primary",
          "bg-secondary-600 hover:bg-secondary-700 focus:ring-secondary-300":
            variant === "secondary",
          "bg-neutral-600 hover:bg-neutral-700 focus:ring-neutral-300":
            variant === "neutral",
          "bg-red-600 hover:bg-red-700 focus:ring-red-300":
            variant === "danger",
          "hover:bg-primary-50 border border-neutral-300 bg-neutral-50 text-neutral-900 focus:ring-neutral-300":
            variant === "outline",
          "bg-red-100 text-red-600 hover:bg-red-200 focus:ring-neutral-300":
            variant === "cancel",
        },
        className
      )}
    >
      {children}
    </button>
  );
}
