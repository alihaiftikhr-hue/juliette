export type CartItem = {
  id: number;
  slug: string;
  name: string;
  price: number;
  image?: { src: string; alt: string };
  quantity: number;
};
