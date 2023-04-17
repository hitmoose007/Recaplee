import classNames from "classnames";
import { HiSearch } from "react-icons/hi";

export default function SearchInput({
  value,
  onChange,
  className,
  placeholder,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  placeholder?: string;
}) {
  return (
    <div className="relative">
      <input
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={classNames(
          "focus:outline-primary-200 h-9 rounded-lg border bg-white px-3 text-sm text-black outline-none outline-offset-0 focus:outline",
          className
        )}
      />
      <HiSearch className="absolute top-1/2 right-1 mr-2 h-5 w-5 -translate-y-1/2 text-neutral-500" />
    </div>
  );
}
