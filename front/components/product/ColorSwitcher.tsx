import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types/product";

type Props = {
  current: Product;
  siblings: Product[];
};

/** Autres coloris : de simples liens, donc indexables et sans JavaScript. */
const ColorSwitcher = ({ current, siblings }: Props) => {
  if (siblings.length === 0) return null;

  return (
    <div className="space-y-2">
      <p className="text-sm text-ink-soft">
        Coloris : <span className="text-ink">{current.colorLabel}</span>
      </p>
      <ul className="flex flex-wrap gap-2">
        {siblings.map((p) => (
          <li key={p.id}>
            <Link
              href={`/product/${p.slug}`}
              aria-label={`Voir le coloris ${p.colorLabel}`}
              title={p.colorLabel}
              className="relative block h-14 w-14 overflow-hidden rounded-md border border-ink/20 bg-sand transition-colors hover:border-terracotta"
            >
              <Image
                src={p.image}
                alt=""
                fill
                sizes="56px"
                className="object-cover"
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ColorSwitcher;
