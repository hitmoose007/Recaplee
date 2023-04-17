import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function LoggedInUserRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      void router.push("/login");
    }
  }, [status, data, router]);

  if (!data) return <div>Loading</div>;

  return <>{children}</>;
}
