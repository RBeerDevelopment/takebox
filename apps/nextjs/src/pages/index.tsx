import type { NextPage } from "next";
import { trpc } from "../utils/trpc";
import { useAuth, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Navbar } from "../components/navbar/navbar";

const Home: NextPage = () => {
  return (
    <main className="flex h-screen w-screen flex-col bg-white">
      <h1 className="ml-32 mt-12 text-5xl font-bold">Take|Box</h1>
      <Navbar />
      <div className="container flex flex-col items-center justify-center gap-20 px-4 py-8"></div>
    </main>
  );
};

export default Home;

const AuthShowcase: React.FC = () => {
  const { isSignedIn } = useAuth();
  const { data: secretMessage } = trpc.auth.getSecretMessage.useQuery(
    undefined,
    { enabled: !!isSignedIn },
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      {isSignedIn && (
        <>
          <p className="text-center text-2xl text-white">
            {secretMessage && (
              <span>
                {" "}
                {secretMessage} click the user button!
                <br />
              </span>
            )}
          </p>
          <div className="flex items-center justify-center">
            <UserButton
              appearance={{
                elements: {
                  userButtonAvatarBox: {
                    width: "3rem",
                    height: "3rem",
                  },
                },
              }}
            />
          </div>
        </>
      )}
      {!isSignedIn && (
        <p className="text-center text-2xl text-white">
          <Link href="/sign-in">Sign In</Link>
        </p>
      )}
    </div>
  );
};
