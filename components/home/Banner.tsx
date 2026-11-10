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
            className="object-cover"
          />
        </div>
        <p className="text-center text-2xl sm:text-5xl font-bold">
          {
            "la beauté réside dans l'art minutieux et l'attention portée au détail"
          }
        </p>
        <Link href="/catalogue" className="flex items-center gap-2 group-hover:scale-105 transition-transform duration-300 cursor-pointer">
          <p className="text-sm sm:text-lg">Achetez maintenant</p>
          <IoIosArrowRoundForward  className="text-2xl " />
        </Link>
      </div>
    </div>
  );
};

export default Banner;
