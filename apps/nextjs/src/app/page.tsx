import Image from "next/image";
import { Button } from "@/components/ui/button";

import { Navbar } from "~/components/navbar";
import PizzaImage from "~/assets/pizza.webp";

export default function Page() {
  return (
    <>
      <h1 className="ml-32 mt-12 text-5xl font-bold text-black">Take|Box</h1>
      <Navbar />
      <section className="flex w-screen flex-row gap-32">
        <Image
          src={PizzaImage}
          alt="Pizza on a plate"
          //   className="w-1/3"
          priority
        />
        <div className="my-20 flex flex-col">
          <h2 className="text-4xl font-bold capitalize text-black">
            Can&apos;t recall if you enjoyed a restaurant?
          </h2>
          <p className="w-4/5 overflow-x-hidden py-12 pl-6 text-justify text-lg text-black/50">
            Discover dining gems with TakeBox! Use our app to find nearby spots
            and read reviews from a passionate foodie community like you. Ditch
            Google Maps and follow like-minded food enthusiasts to uncover their
            favorites.
          </p>
          <Button>Download App</Button>
        </div>
      </section>
    </>
  );
}
