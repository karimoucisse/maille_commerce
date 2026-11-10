import Link from "next/link";


type LinkType = {
  href: string;
  label: string;
};

const Footer = () => {
  const menuLinks: LinkType[] = [
    { href: "/", label: "Acceuil" },
    { href: "/catalogue", label: "Catalogue" },
    { href: "/contact", label: "Contact" },
  ];

  const aboutLinks: LinkType[] = [
    { href: "/", label: "À propos de nous" },
    { href: "/", label: "Politique de retour" },
    { href: "/", label: "Aide et questions" },
  ];

  return (
    <footer>
      <div className="grid grid-rows-3 md:grid-cols-4 md:grid-rows-1 max-w-6xl mx-auto justify-items-center p-10 min-h-[25vh]">
        <div className="mb-10 space-y-4 text-start w-full sm:w-sm h-full md:w-full">
          <h1 className="text-4xl">Menu principal</h1>
          <div className="flex flex-col space-y-2">
            {menuLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`text-sm font-medium  hover:text-zinc-900 text-zinc-500}`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex flex-col h-full w-full sm:w-sm md:w-full md:justify-center md:items-center space-y-4">
          {aboutLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`text-sm font-medium  text-[#0C4039]`}
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="md:col-span-2 space-y-4 w-full sm:w-sm md:w-full md:p-4 h-full">
          <h1 className="text-3xl">Lettre d'hiver</h1>
          <div className="max-w-md grid md:w-full grid-cols-4 gap-2 h-15 ">
            <input type="text" placeholder="Adresse e-mail" className="input h-full text-lg md:pl-10 col-span-3" />
            <button className="btn h-full rounded-md bg-[#0C4039] text-zinc-50 px-4">S'inscrire</button>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
