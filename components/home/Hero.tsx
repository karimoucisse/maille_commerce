import Image from "next/image";
import { HERO_IMAGE } from "@/lib/constants";

const Hero = () => {
  return (
    <section className="gap-4 grid grid-rows-1 md:grid-cols-3  min-h-100 md:min-h-130">
      <div className="flex md:items-end pb-8">
        <h1 className=" text-4xl md:text-5xl lg:text-6xl font-bold">Elegance tricotée</h1>
      </div>
      <div className="md:col-span-2 row-start-1 md:col-start-2 w-full relative bg-red-400 md:px-20">
        <Image
          src={HERO_IMAGE}
          alt="Bonnet en maille de la collection Maille"
          fill
          priority
          sizes="(min-width: 724px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
    </section>
  );
};

export default Hero;
