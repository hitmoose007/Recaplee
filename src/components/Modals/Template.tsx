import { Dialog, Transition } from "@headlessui/react";
import classNames from "classnames";
import { Fragment } from "react";

type Size = "sm" | "md" | "lg" | "xl";

export default function Modal({
  title,
  description,
  children,
  actions,
  isOpen,
  onClose,
  size = "md",
}: {
  children: React.ReactNode;
  title?: string;
  description?: string;
  actions?: React.ReactNode;
  isOpen?: boolean;
  onClose: () => void;
  size?: Size;
}) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className={classNames(
                  "w-full transform  rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all",
                  {
                    "max-w-sm": size === "sm",
                    "max-w-md": size === "md",
                    "max-w-lg": size === "lg",
                    "max-w-xl": size === "xl",
                  }
                )}
              >
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 first-letter:uppercase"
                >
                  {title}
                </Dialog.Title>
                {description && (
                  <div className="mb-4 mt-2 text-sm text-gray-700">
                    {description}
                  </div>
                )}
                <div className="mt-2 flex flex-col gap-3">{children}</div>
                {actions && <div className="mt-4">{actions}</div>}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
