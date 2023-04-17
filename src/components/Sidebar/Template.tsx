import { RiMapPinTimeLine } from "react-icons/ri";
import {
  HiOutlineChartBar,
  HiOutlineUsers,
  HiOutlineLogout,
} from "react-icons/hi";

import classNames from "classnames";
import { MdOutlineChevronRight } from "react-icons/md";
import { useState } from "react";
import { useRouter } from "next/router";
import ConditionalWrapper from "../ConditionalWrapper";
import Link from "next/link";
import { signOut } from "next-auth/react";

const menu: Menu = [
  {
    label: "Dashboard",
    icon: <HiOutlineChartBar className="h-5 w-5" />,
    href: "/admin/overview",
  },
  {
    label: "Users",
    icon: <HiOutlineUsers className="h-5 w-5" />,
    href: "/admin/users",
  },
  {
    label: "Time Lapse",
    icon: <RiMapPinTimeLine className="h-5 w-5" />,
    href: "/admin/time-lapse",
  },
];

interface ITab {
  label: string;
  icon: JSX.Element;
  chip?: React.ReactNode;
  href?: string;
  active?: boolean;
}

interface ICategory {
  label: string;
  icon: JSX.Element;
  tabs: ITab[];
  open?: boolean;
}

export type Menu = Array<ICategory | ITab>;

function isTab(item: ICategory | ITab): item is ITab {
  return !("tabs" in item);
}

function Tab({ data }: { data: ITab }) {
  const router = useRouter();
  const active = data.href && router.pathname.startsWith(data.href);

  return (
    <ConditionalWrapper
      condition={Boolean(data.href)}
      wrapper={(children) => (
        <Link
          href={data?.href || ""}
          className={classNames(
            "relative flex w-full items-center gap-3 rounded-md p-3 hover:bg-sky-100",
            {
              "text-sky-700": active,
            }
          )}
        >
          {children}
        </Link>
      )}
    >
      {active && (
        <div
          className="absolute left-0 h-6 w-1 bg-sky-700"
          style={{
            borderRadius: "0px 83.75px 83.75px 0px",
          }}
        />
      )}
      {data.icon}
      <span>{data.label}</span>
      {data.chip}
    </ConditionalWrapper>
  );
}

function Category({ data }: { data: ICategory }) {
  const [open, setOpen] = useState(data.open);

  return (
    <div>
      <button
        className="flex w-full justify-between rounded-md p-3 hover:bg-sky-100"
        onClick={() => setOpen((open) => !open)}
      >
        <div className="flex items-center gap-3">
          {data.icon}
          <span>{data.label}</span>
        </div>
        <MdOutlineChevronRight
          className={classNames("h-5 w-5", {
            "rotate-90 transform": open,
          })}
        />
      </button>
      {open && (
        <div className="mt-1 ml-7 flex flex-col gap-1 font-light">
          {data.tabs.map((tab) => (
            <Tab key={tab.label} data={tab} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function AdminSidebar() {


  return (
    <div className="flex h-full flex-col justify-between p-4 py-6">
      <div className="text-sm font-semibold">
        <Link
          href="/patients/create"
          className="flex w-full items-center justify-center rounded-md p-3 text-sm font-semibold text-white"
        >
          <div className="flex h-12 w-full items-center justify-center bg-red-200 text-2xl font-semibold text-black">
            LOGO
          </div>
        </Link>
        <div className="mt-4 flex flex-col gap-3">
          {menu.map((item) =>
            isTab(item) ? (
              <Tab key={item.label} data={item} />
            ) : (
              <Category key={item.label} data={item} />
            )
          )}
        </div>
      </div>
      <button
        onClick={() => void signOut()}
        className="flex w-full items-center gap-3 rounded-md  p-3 text-sm font-semibold hover:bg-sky-100"
      >
        <HiOutlineLogout className="h-5 w-5" />
        <span>Logout</span>
      </button>
    </div>
  );
}
