import type { Metadata } from "next";
import { SignupForm } from "@/components/auth/SignupForm/signup-form";

export const metadata: Metadata = {
  title: "Inscription",
};

export default function SignupPage() {
  return <SignupForm />;
}
