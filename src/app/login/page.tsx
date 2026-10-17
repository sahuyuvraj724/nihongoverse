import { Suspense } from "react";
import { redirect } from "next/navigation";
import LoginForm from "@/components/auth/LoginForm";
import { getSessionUser } from "@/lib/auth";

export const metadata = { title: "Login" };

/* Next 16 rule: session check <Suspense> ke andar.
   (LoginForm khud ?next= ke liye useSearchParams use karta hai,
   isliye Suspense yahan waise bhi zaroori hai.) */
async function LoginGate() {
  const user = await getSessionUser();
  if (user) redirect("/dashboard");
  return <LoginForm />;
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-muted">Loading…</div>}>
      <LoginGate />
    </Suspense>
  );
}
