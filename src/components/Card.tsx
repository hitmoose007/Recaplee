import classNames from "classnames";

export default function Card({
  children,
  className,
  ...props
}: React.HTMLProps<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={classNames("w-full rounded-lg border p-3", className)}
    >
      {children}
    </div>
  );
}
