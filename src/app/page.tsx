import { SignedIn, SignedOut, SignOutButton, SignUpButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <>
      <h1>Hii</h1>
      <SignedOut>
      <SignUpButton/>
      </SignedOut>
      <SignedIn>
        <SignOutButton/>
      </SignedIn>
    </>
  );
}
