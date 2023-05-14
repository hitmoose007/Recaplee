import { GetServerSidePropsContext } from "next";
import React, { useState } from "react";
import Link from "next/link";
// import { trpc } from "@utils/trpc";
// import Toast from "@components/Toast";
import { useRouter } from "next/router";
// import { prisma } from "server/db/client";

export default function NewPassword({
  token,
  expired,
}: {
  token: string;
  expired: boolean;
}) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

  }

  return (
    <main className="relative flex min-h-screen flex-1 flex-col overflow-hidden px-4 py-10 sm:px-6 lg:px-8">
      <div className="absolute inset-0 text-slate-900/[0.07] [mask-image:linear-gradient(to_bottom_left,white,transparent,transparent)]">
        <svg
          className="absolute inset-0 h-full w-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="grid-bg"
              width={32}
              height={32}
              patternUnits="userSpaceOnUse"
              x="100%"
              patternTransform="translate(0 -1)"
            >
              <path d="M0 32V.5H32" fill="none" stroke="currentColor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-bg)" />
        </svg>
      </div>

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
        <div className="mt-6 max-w-sm">
          <h1 className="mb-2 text-center text-sm font-semibold text-gray-900">
            Reset your password
          </h1>
          <p className="mb-10 text-center text-sm">
            Enter your email and we&apos;ll send you a link to reset your
            password.
          </p>
          <form className="w-full" onSubmit={handleSubmit}>
            <div>
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
            <div>
              <label
                htmlFor="passwordConfirm"
                className="mt-4 block text-sm font-semibold leading-6 text-gray-900"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="passwordConfirm"
                className="input mt-2 block h-10 w-full appearance-none rounded-md bg-white px-3 text-slate-900 shadow-sm ring-1 ring-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 sm:text-sm"
                required
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="mt-6 inline-flex w-full justify-center rounded-lg bg-indigo-700 py-2.5 px-4 text-sm font-semibold text-white hover:bg-indigo-500"
            >
              <span>Reset your password</span>
            </button>
          </form>
        </div>
      </div>

      <footer className="relative shrink-0">
        <div className="space-y-4 text-sm text-gray-900 sm:flex sm:items-center sm:justify-center sm:space-y-0 sm:space-x-4">
          <p className="text-center sm:text-left">
            Don&apos;t have an account?
          </p>
          <Link href="/register" legacyBehavior>
            <span className="btn btn-ghost inline-flex justify-center rounded-lg py-2.5 px-4 text-sm font-semibold">
              Register
            </span>
          </Link>
        </div>
      </footer>
    </main>
  );
}

// export async function getServerSideProps(context: GetServerSidePropsContext) {
//   if (typeof context.query.token !== "string") {
//     return {
//       redirect: {
//         destination: "/password/reset",
//       },
//     };
//   }

// //   const token = await prisma?.token.findUnique({
// //     where: {
// //       token: context.query.token,
// //     },
// //   });

// //   if (!token) {
// //     return {
// //       redirect: {
// //         destination: "/password/reset",
// //       },
// //     };
// //   }

// //   return {
// //     props: {
// //       token: context.query.token,
// //       expired: token.expiresAt < new Date(),
// //     },
// //   };
// }