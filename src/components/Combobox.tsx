import { type ChangeEvent, Fragment, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { HiCheck, HiChevronUp, HiPlus } from "react-icons/hi";
import classNames from "classnames";

export type Option = {
  label: string;
  value: string | number;
};

export default function CustomCombobox({
  options,
  selected,
  setSelected,
  onCreate,
  placeholder = "Select...",
}: {
  selected?: Option;
  options: Option[];
  placeholder?: string;
  setSelected: (value: Option) => void;
  onCreate?: (value: string) => void;
}) {
  const [query, setQuery] = useState("");

  const filteredOptions =
    query === ""
      ? options
      : options.filter((option) =>
          option.label
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  return (
    <Combobox value={selected} onChange={setSelected}>
      {({ open }) => (
        <div className="relative mt-1">
          <div className="relative w-full cursor-default rounded-lg border-none bg-white text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-sky-300 sm:text-sm">
            <Combobox.Input
              className="w-full rounded-lg border py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:outline-none focus:ring-0"
              displayValue={(option: Option) => option.label ?? "Select..."}
              placeholder={placeholder}
              autoComplete="off"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setQuery(e.target.value);
              }}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <HiChevronUp
                className={classNames("h-5 w-5 text-gray-400", {
                  "rotate-180 transform": !open,
                })}
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {filteredOptions.length === 0 && query !== "" ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                filteredOptions.map((option) => (
                  <Combobox.Option
                    key={option.value}
                    value={option}
                    className={({ active }) =>
                      `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                        active ? "bg-sky-600 text-white" : "text-gray-900"
                      }`
                    }
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {option.label}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? "text-white" : "text-teal-600"
                            }`}
                          >
                            <HiCheck className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
              <div
                className="cursor-pointer select-none py-2 pl-10 pr-4 text-gray-900 hover:bg-sky-100"
                onClick={() => onCreate?.(query)}
              >
                <span className="block truncate font-normal">
                  <HiPlus className="mr-2 inline-block h-4 w-4" />
                  Create company
                </span>
              </div>
            </Combobox.Options>
          </Transition>
        </div>
      )}
    </Combobox>
  );
}
