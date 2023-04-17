import { Dialog, Transition } from "@headlessui/react";
import classNames from "classnames";

type Size = "sm" | "md" | "lg" | "xl";

export type DrawerProps = {
  children: React.ReactNode;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  size?: Size;
};

export default function Drawer({
  children,
  isOpen,
  setIsOpen,
  size,
}: DrawerProps) {
  return (
    <Dialog
      unmount={false}
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="fixed inset-0 z-30 overflow-y-auto"
    >
      <Transition
        show={isOpen}
        enter="transition-opacity duration-75"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="flex h-screen w-3/4">
          <Dialog.Overlay className="fixed inset-0 z-40 bg-black bg-opacity-30" />
          <div
            className={classNames(
              "z-50 flex w-full max-w-sm flex-col justify-between overflow-hidden bg-white text-left align-middle shadow-xl",
              {
                "max-w-sm": size === "sm",
                "max-w-md": size === "md",
                "max-w-lg": size === "lg",
                "max-w-xl": size === "xl",
              }
            )}
          >
            {children}
          </div>
        </div>
      </Transition>
    </Dialog>
  );
}
