import { SignUp } from "@clerk/nextjs";

const page = () => {
  return (
    <SignUp
      path="/sign-up"
      routing="path"
      signInUrl="/sign-in"
      forceRedirectUrl="/onboarding"
    />
  );
};

export default page;
