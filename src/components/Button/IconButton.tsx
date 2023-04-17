import Button, { type ButtonProps } from "./index";
import classNames from "classnames";

export default function IconButton({
  children,
  className,
  ...props
}: ButtonProps) {
  return (
    <Button {...props} className={classNames("aspect-square h-9", className)}>
      <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        {children}
      </span>
    </Button>
  );
}
