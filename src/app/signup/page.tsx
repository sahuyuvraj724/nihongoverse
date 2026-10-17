import { Suspense } from "react";
import { redirect } from "next/navigation";
import SignupForm from "@/components/auth/SignupForm";
import { getSessionUser } from "@/lib/auth";

export const metadata = { title: "Sign up" };

/* Next 16 rule: session check <Suspense> ke andar.
   Logged-in users seedha dashboard jayenge. */
async function SignupGate() {
  const user = await getSessionUser();
  if (user) redirect("/dashboard");
  return <SignupForm />;
}

export default function SignupPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-muted">Loading…</div>}>
      <SignupGate />
    </Suspense>
  );
}
