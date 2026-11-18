import React from "react";
import Image from "next/image";
import { IoIosArrowRoundForward } from "react-icons/io";
import Link from "next/link";

const Banner = () => {
  return (
    <div className="flex justify-center items-center bg-[#F7E5D7] p-6">
      <div className="flex space-y-10 sm:space-y-18 flex-col justify-between items-center h-full  max-w-3xl">
        <div className="relative w-60 h-30 sm:w-70 sm:h-40">
          <Image
            src="/banner.jpg"
            alt="banner"
            fill
            sizes="(min-width: 640px) 280px, 240px"
            className="object-cover"
          />
        </div>
        <h2 className="text-center text-2xl font-bold sm:text-5xl">
          la beauté réside dans l’art minutieux et l’attention portée au détail
        </h2>
        <Link
          href="/catalogue"
          className="group flex items-center gap-2 text-ink"
        >
          <span className="text-sm sm:text-lg">Achetez maintenant</span>
          <IoIosArrowRoundForward className="text-2xl transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
};

export default Banner;
