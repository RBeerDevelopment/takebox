import type { NextPage } from "next";
import { Navbar } from "../components/navbar";
import Image from "next/image";
import Pizza from "../assets/pizza.webp";

const Home: NextPage = () => {
  return (
    <main className="flex h-screen w-screen flex-col bg-white">
      <h1 className="ml-32 mt-12 text-5xl font-bold">Take|Box</h1>
      <Navbar />
      <section className="from-50% flex w-screen flex-row gap-32 bg-gradient-to-bl from-transparent to-primary">
        <Image src={Pizza} alt="Pizza on a plate" className="w-1/3" />
        <div className="my-20 flex flex-col">
          <h2 className="text-4xl font-bold capitalize">Review restaurants</h2>
          <p className="w-4/5 overflow-x-hidden py-12 pl-6 text-justify text-lg text-black/70">
            Have you ever been in the situation where you didn&apos;t rememeber
            if you liked a restaurant? Well, that&apos;s what TakeBox is for.
            You can review restaurants and see what other people think about
            them as well.
          </p>
        </div>
      </section>
      <div className="container flex flex-col items-center justify-center gap-20 px-4 py-8"></div>
    </main>
  );
};

export default Home;
