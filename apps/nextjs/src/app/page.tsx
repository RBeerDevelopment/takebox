import Image, { type StaticImageData } from "next/image";

import { Navbar } from "~/components/navbar";
import AppstoreImage from "~/assets/appstore.svg";
import PizzaImage from "~/assets/pizza.webp";

export const dynamic = "force-static";
export const metadata = {
  title: "Flavoury",
};

export default function Page() {
  return (
    <>
      <h1 className="text-primary ml-32 mt-12 text-5xl font-bold">Flavoury</h1>
      <Navbar />
      <section className="flex w-screen flex-row gap-32">
        <Image
          src={PizzaImage}
          alt="Pizza on a plate"
          className="w-1/3"
          priority
        />
        <div className="my-20 flex flex-col">
          <h2 className="text-2xl font-semibold capitalize text-black">
            Can&apos;t recall if you enjoyed a restaurant?
          </h2>
          <p className="w-4/5 overflow-x-hidden py-8 text-justify text-lg text-black/80">
            Discover dining gems with TakeBox! Use our app to find nearby spots
            and read reviews from a passionate foodie community like you. Ditch
            Google Maps and follow like-minded food enthusiasts to uncover their
            favorites.
          </p>
          <Image
            src={AppstoreImage as StaticImageData}
            className="w-32"
            alt="Download on the App Store"
          />
        </div>
      </section>
    </>
  );
}
