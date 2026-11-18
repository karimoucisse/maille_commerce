"use client";

import Link from "next/link";
import { CiUser } from "react-icons/ci";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { usePathname } from "next/navigation";
import { LiaBarsSolid } from "react-icons/lia";
import { useHydrated } from "@/hooks/useHydrated";
import { useCartStore } from "@/stores/cart.store";

type LinkType = {
  href: string;
  label: string | React.ReactNode;
};

const NAV_LINKS: LinkType[] = [
  { href: "/", label: "Accueil" },
  { href: "/catalogue", label: "Catalogue" },
  { href: "/contact", label: "Contact" },
];

const Header = () => {
  const pathname = usePathname();
  const hydrated = useHydrated();
  const cartCount = useCartStore((s) =>
    s.lines.reduce((n, l) => n + l.quantity, 0),
  );

  const showBadge = hydrated && cartCount > 0;

  const isActive = (href: string) => pathname === href;
  const closeMenu = () => (document.activeElement as HTMLElement)?.blur();

  const iconsLinks: LinkType[] = [
    { href: "/account", label: <CiUser className="text-xl" /> },
    { href: "/cart", label: <HiOutlineShoppingBag className="text-xl" /> },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Menu mobile */}
        <div className="dropdown dropdown-bottom dropdown-start sm:hidden">
          <button
            type="button"
            tabIndex={0}
            aria-label="Ouvrir le menu"
            className="flex items-center p-2 text-xl"
          >
            <LiaBarsSolid />
          </button>
          <ul
            tabIndex={-1}
            className="dropdown-content menu z-10 mt-4 w-52 rounded-box bg-base-100 p-4 shadow-sm"
          >
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={closeMenu}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className={`text-sm font-medium ${isActive(link.href) ? "text-white" : "text-ink-soft"}`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <Link
          href="/"
          className="font-display text-2xl font-normal tracking-tight text-ink"
        >
          Maille
        </Link>

        {/* Navigation desktop */}
        <nav
          aria-label="Navigation principale"
          className="hidden w-full items-center justify-center gap-6 sm:flex"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? "page" : undefined}
              className={`text-sm font-medium hover:text-zinc-900 ${isActive(link.href) ? "text-zinc-900" : "text-zinc-500"}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1 text-xl sm:gap-2">
          <Link
            href="/account"
            aria-label="Mon compte"
            className="flex items-center p-2 text-ink"
          >
            <CiUser />
          </Link>
          <Link
            href="/cart"
            aria-label={
              showBadge ? `Panier, ${cartCount} article(s)` : "Panier"
            }
            className="relative flex items-center p-2 text-ink"
          >
            <HiOutlineShoppingBag />
            {showBadge && (
              <span className="absolute -right-0.5 -top-0.5 flex min-h-5 min-w-5 items-center justify-center rounded-full bg-[#0C4039] h-4 w-4 text-[10px] font-medium leading-none text-zinc-50">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
