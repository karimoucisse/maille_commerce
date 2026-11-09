import Image from "next/image";
import { HERO_IMAGE } from "@/lib/constants";

const Hero = () => {
  return (
    <section className="gap-4 grid grid-rows-1 sm:grid-cols-2  min-h-100 sm:min-h-130">
      <div className="flex sm:items-end pb-8">
        <h1 className=" text-4xl sm:text-6xl lg:text-8xl font-bold">Elegance tricotée</h1>
      </div>
      <div className="row-start-1 sm:col-start-2 w-full relative bg-red-400 sm:px-20">
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
