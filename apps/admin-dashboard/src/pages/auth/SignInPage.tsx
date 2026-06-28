import { SignIn } from "@clerk/react";

export const SignInPage = () => {
  return (
    <div className="flex min-h-[100vh] items-center justify-center">
      <SignIn />
    </div>
  );
};
