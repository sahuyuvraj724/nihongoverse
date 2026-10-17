import { Suspense } from "react";
import { redirect } from "next/navigation";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";
import { getSessionUser } from "@/lib/auth";

export const metadata = { title: "Forgot password" };

/* Next 16 rule: session check <Suspense> ke andar. */
async function ForgotGate() {
  const user = await getSessionUser();
  if (user) redirect("/dashboard");
  return <ForgotPasswordForm />;
}

export default function ForgotPasswordPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-muted">Loading…</div>}>
      <ForgotGate />
    </Suspense>
  );
}
