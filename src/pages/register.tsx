import type { NextPage } from "next";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { ZodError } from "zod";

export default function Register() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const handleSubmit = async (e: FormEvent) => {
  };

  return (
    <main className="relative flex min-h-screen flex-1 flex-col overflow-hidden px-4 py-10 sm:px-6 lg:px-8">
      <div className="relative flex flex-1 cursor-pointer flex-col items-center justify-center pt-12 pb-16">
        <Link href="/" legacyBehavior>
          <span className="text-2xl font-semibold leading-none">
            <span
              className="relative inline-block bg-indigo-500 p-2 text-white"
              style={{
                borderRadius: "91% 9% 90% 10% / 29% 82% 18% 71%",
              }}
            >
             Recaplee 
            </span>
            {/* <span className="ml-1 mt-2 text-gray-600 sm:mt-0"></span> */}
          </span>
        </Link>

        <div className="mt-10 w-full max-w-md">
          <div
            className="grid w-full grid-cols-2 flex-wrap gap-3"
            onSubmit={handleSubmit}
          >
            <div className="col-span-2">
              <label
                htmlFor="email-address"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                Email address
              </label>
              <input
                type="email"
                id="email-address"
                className="input mt-2 block h-10 w-full appearance-none rounded-md bg-white px-3 text-slate-900 shadow-sm ring-1 ring-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 sm:text-sm"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="col-span-1">
              <label
                htmlFor="first-name"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                First Name
              </label>
              <input
                type="text"
                id="first-name"
                className="input mt-2 block h-10 w-full appearance-none rounded-md bg-white px-3 text-slate-900 shadow-sm ring-1 ring-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 sm:text-sm"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="col-span-1">
              <label
                htmlFor="last-name"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                Last Name
              </label>
              <input
                type="text"
                id="last-name"
                className="input mt-2 block h-10 w-full appearance-none rounded-md bg-white px-3 text-slate-900 shadow-sm ring-1 ring-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 sm:text-sm"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="col-span-2">
              <label
                htmlFor="password"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="input mt-2 block h-10 w-full appearance-none rounded-md bg-white px-3 text-slate-900 shadow-sm ring-1 ring-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 sm:text-sm"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="col-span-2">
              <label
                htmlFor="password-confirm"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                Password Confirm
              </label>
              <input
                type="password"
                id="password-confirm"
                className="input mt-2 block h-10 w-full appearance-none rounded-md bg-white px-3 text-slate-900 shadow-sm ring-1 ring-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 sm:text-sm"
                required
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
              />
            </div>
            <button
              className="col-span-2 mt-6 inline-flex w-full justify-center rounded-lg bg-indigo-700 py-2.5 px-4 text-sm font-semibold text-white hover:bg-indigo-600"
              onClick={handleSubmit}
            >
              <span>Register account</span>
            </button>
          </div>
        </div>
      </div>
      <footer className="relative shrink-0">
        <div className="flex items-center justify-center space-x-4 text-sm text-gray-900">
          <p className="text-center sm:text-left">Have an existing account?</p>
          <Link href="/login" legacyBehavior>
            <span className="btn inline-flex cursor-pointer justify-center rounded-full border-none bg-white py-2.5 px-4 text-sm font-semibold text-gray-800 shadow outline-none hover:bg-gray-800 hover:text-white">
              Login
            </span>
          </Link>
        </div>
      </footer>
    </main>
  );
}