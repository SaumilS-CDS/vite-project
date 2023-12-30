export type BookType = {
  id?: string;
  name: string;
  author: string;
  genre: string | null;
  description: string;
  price: number | null;
  quantity: number | null;
  language: string;
  publisher: string;
  rating: number | null;
  publishedAt: number | null;
};
