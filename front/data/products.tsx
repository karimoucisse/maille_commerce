import { Product } from "@/types/product";

const DESCRIPTION =
  "Bonnet en laine crocheté main, assemblé en granny squares et surmonté de petites oreilles. Une maille chaleureuse pour affronter l'hiver avec style.";

const PRICE = 24.99;


type Seed = {
  id: string;
  slug: string;
  colorLabel: string;
  file: string;
  featured?: boolean;
};

// Chaque coloris est un produit à part entière (une page, un SEO, un stock).
// beanie.jpg est identique à beanie_multi.jpg : seul beanie_multi.jpg est utilisé.
const seeds: Seed[] = [
  {
    id: "granny-ear-ecru-green",
    slug: "bonnet-granny-ecru-vert",
    colorLabel: "Écru & vert",
    file: "beanie_green.jpg",
  },
  {
    id: "granny-ear-sky-blue",
    slug: "bonnet-granny-bleu-ciel",
    colorLabel: "Bleu ciel",
    file: "beanie_blue.jpg",
    featured: true,
  },
  {
    id: "granny-ear-black-orange",
    slug: "bonnet-granny-noir-orange",
    colorLabel: "Noir & orange",
    file: "beanie_black_orange.jpg",
  },
  {
    id: "granny-ear-multi",
    slug: "bonnet-granny-multicolore",
    colorLabel: "Multicolore",
    file: "beanie_multi.jpg",
  },
  {
    id: "granny-ear-pink",
    slug: "bonnet-granny-noir-rose",
    colorLabel: "Noir & rose",
    file: "beanie_pink.jpg",
  },
  {
    id: "granny-ear-blue-pink",
    slug: "bonnet-granny-noir-bleu-rose",
    colorLabel: "Noir, bleu & rose",
    file: "beanie_blue_pink.jpg",
  },
  {
    id: "granny-ear-ecru-caramel",
    slug: "bonnet-granny-ecru-caramel",
    colorLabel: "Écru & caramel",
    file: "beanie_brown.jpg",
  },
  {
    id: "granny-ear-gradient-brown",
    slug: "bonnet-granny-degrade-marron",
    colorLabel: "Dégradé marron",
    file: "beanie_gradient_brown.jpg",
  },
  {
    id: "granny-ear-gradient-blue",
    slug: "bonnet-granny-degrade-bleu",
    colorLabel: "Dégradé bleu",
    file: "beanie_gradient_blue.jpg",
  },
  {
    id: "granny-ear-purple",
    slug: "bonnet-granny-violet",
    colorLabel: "Violet",
    file: "beanie_purple.jpg",
  },
  {
    id: "granny-ear-red-black",
    slug: "bonnet-granny-rouge-noir",
    colorLabel: "Rouge & noir",
    file: "beanie_red_black.jpg",
  },
  {
    id: "granny-ear-gray",
    slug: "bonnet-granny-gris",
    colorLabel: "Gris",
    file: "beanie_gray.jpg",
  },
];

export const products: Product[] = seeds.map((s) => ({
  id: s.id,
  slug: s.slug,
  name: `Bonnet Granny ${s.colorLabel.toLowerCase()}`,
  colorLabel: s.colorLabel,
  price: PRICE,
  image: `/product/${s.file}`,
  description: DESCRIPTION,
  featured: s.featured,
}))

export const getProductBySlug = (slug: string) =>
  products.find((p) => p.slug === slug);

export const getProductById = (id: string) => products.find((p) => p.id === id);

export const getFeaturedProduct = () =>
  products.find((p) => p.featured) ?? products[0];

/** Les autres coloris (pour le sélecteur de coloris) : tous les autres produits. */
export const getSiblingProducts = (product: Product) =>
  products.filter((p) => p.id !== product.id);
