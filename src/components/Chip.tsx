import classNames, { type Argument } from "classnames";

export default function Chip({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: Argument;
}) {
  return (
    <div
      className={classNames("inline-block rounded-full px-2 py-1", className)}
    >
      {children}
    </div>
  );
}
