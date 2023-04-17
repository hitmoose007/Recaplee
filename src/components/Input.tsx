import classNames from "classnames";

export default function Input({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      autoComplete="off"
      className={classNames(
        "h-9 w-full rounded-lg border border-gray-200 p-2 text-sm outline-offset-1 outline-transparent focus:outline-sky-200",
        className
      )}
      {...props}
    />
  );
}
