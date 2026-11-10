"use client";

import Link from "next/link";
import { CiUser } from "react-icons/ci";
import { IoIosSearch } from "react-icons/io";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { usePathname } from "next/navigation";

type LinkType = {
  href: string;
  label: string;
};
const Header = () => {

  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;
  const links: LinkType[] = [
    { href: "/", label: "Acceuil" },
    { href: "/catalogue", label: "Catalogue" },
    { href: "/contact", label: "Contact" },
  ];
  return (
    <header className="sticky top-0 z-40 bg-zinc-50">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="font-display text-2xl font-semibold tracking-tight text-zinc-900"
        >
          Maille
        </Link>
        <div>
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`ml-4 text-sm font-medium  hover:text-zinc-900 ${isActive(link.href) ? "text-zinc-900" : "text-zinc-500"}`}
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center space-x-4 text-xl">
          <CiUser />
          <IoIosSearch />
          <HiOutlineShoppingBag />
        </div>
      </div>
    </header>
  );
};

export default Header;
