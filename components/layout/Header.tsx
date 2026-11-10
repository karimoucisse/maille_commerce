"use client";

import Link from "next/link";
import { CiUser } from "react-icons/ci";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { usePathname } from "next/navigation";
import { LiaBarsSolid } from "react-icons/lia";


type LinkType = {
  href: string;
  label: string | React.ReactNode;
};

const Header = () => {

  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;
  const links: LinkType[] = [
    { href: "/", label: "Acceuil" },
    { href: "/catalogue", label: "Catalogue" },
    { href: "/contact", label: "Contact" },
  ];

  const iconsLinks: LinkType[] = [
    { href: "/account", label: <><CiUser /> Compte</> },
    { href: "/cart", label: <><HiOutlineShoppingBag /> Panier</> },
  ];

  return (
    <header className="sticky top-0 z-40 bg-zinc-50">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center dropdown dropdown-bottom dropdown-start sm:hidden">
          <LiaBarsSolid tabIndex={0} role="button" className="text-xl font-semibold" />
          <ul tabIndex={-1} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-4 shadow-sm space-y-1 mt-4">
            {links.map((link, i) => (
              <Link
                key={link.href + i}
                href={link.href}
                onClick={() => (document.activeElement as HTMLElement)?.blur()}
                className={`flex items-center rounded-lg gap-2 p-2 text-sm font-medium  $text-zinc-900`}
              >
                {link.label}
              </Link>
            ))}
          </ul>
        </div>
        <Link
          href="/"
          className="font-display text-2xl font-semibold tracking-tight text-zinc-900"
        >
          Maille
        </Link>
        <div className=" hidden sm:flex justify-center w-full items-center sm:space-x-4">
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
          <HiOutlineShoppingBag />
        </div>
      </div>
    </header>
  );
};

export default Header;
