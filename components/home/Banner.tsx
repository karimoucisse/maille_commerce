import React from "react";
import Image from "next/image";
import { IoIosArrowRoundForward } from "react-icons/io";
import Link from "next/link";

const Banner = () => {
  return (
    <div className="flex h-[40vh] justify-center items-center bg-[#F7E5D7] py-6">
      <div className="flex flex-col justify-between items-center h-full  max-w-3xl">
        <div className="relative w-70 h-40">
          <Image
            src="/banner.jpg"
            alt="banner"
            fill
            className="object-cover"
          />
        </div>
        <p className="text-center text-5xl font-bold">
          {
            "la beauté réside dans l'art minutieux et l'attention portée au détail"
          }
        </p>
        <Link href="/catalogue" className="flex items-center gap-2 group-hover:scale-105 transition-transform duration-300 cursor-pointer">
          Achetez maintenant
          <IoIosArrowRoundForward  className="text-2xl " />
        </Link>
      </div>
    </div>
  );
};

export default Banner;
