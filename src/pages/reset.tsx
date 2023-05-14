import React, { useState } from "react";
import Link from "next/link";

export default function Reset() {
  const [email, setEmail] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  }

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
          </span>
        </Link>

        <div className="max-w-sm">
          <h1 className="mb-2 mt-6 text-center text-sm font-semibold text-gray-900">
            Reset your password
          </h1>
          <p className="mb-10 text-center text-sm">
            Enter your email and we&apos;ll send you a link to reset your
            password.
          </p>
          <form className="w-full" onSubmit={handleSubmit}>
            <div>
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
            <button
              type="submit"
              className="mt-6 inline-flex w-full justify-center rounded-lg bg-indigo-700 py-2.5 px-4 text-sm font-semibold text-white hover:bg-indigo-600"
            >
              <span>Reset your password</span>
            </button>
          </form>
        </div>
      </div>
      <footer className="relative shrink-0">
        <div className="flex items-center justify-center space-x-4 text-sm text-gray-900">
          <p className="text-center sm:text-left">Dont have an account?</p>
          <Link href="/register" legacyBehavior>
            <span className="btn inline-flex cursor-pointer justify-center rounded-full border-none bg-white py-2.5 px-4 text-sm font-semibold text-gray-800 shadow outline-none hover:bg-gray-800 hover:text-white">
              Register
            </span>
          </Link>
        </div>
      </footer>
    </main>
  );
}