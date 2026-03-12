import { SignInForm } from "@/components/auth/sign-in-form";

export default function SignIn() {
  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="w-full max-w-xs">
        <SignInForm />
      </div>
    </div>
  );
}
