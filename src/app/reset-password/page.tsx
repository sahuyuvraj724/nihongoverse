import ResetPasswordForm from "@/components/auth/ResetPasswordForm";

export const metadata = { title: "Set new password" };

/* Reached via the email link: /auth/callback?next=/reset-password.
   The form itself checks the session and shows an honest error
   when the link is expired or already used. */
export default function ResetPasswordPage() {
  return <ResetPasswordForm />;
}
