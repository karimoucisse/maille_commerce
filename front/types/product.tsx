export type Product = {
  id: string;
  slug: string;
  name: string;
  colorLabel: string;
  price: number;
  image: string;
  description: string;
  featured?: boolean;
};

export type CartLine = {
  productId: string;
  quantity: number;
};

export type CartItem = Product & { quantity: number };
