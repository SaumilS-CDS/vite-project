import { createContext, useContext } from "react";
import { BookType } from "../Types/Book.type";

export type BookContextProps = {
  bookList: BookType[];
  addBookToList: (newBook: BookType) => void;
  deleteBookToList: (id: string) => void;
  updateBookToList: (bookToUpdate: BookType) => void;
};

export const BookContext = createContext<BookContextProps>({
  bookList: [],
  addBookToList: () => undefined,
  deleteBookToList: () => undefined,
  updateBookToList: () => undefined,
});
export const { Provider: BookProvider, Consumer: BookConsumer } = BookContext;

export const useBooks = () => {
  const context = useContext(BookContext);

  if (context === undefined) {
    throw new Error(
      "`useBook` hook must be used within a `BookProvider` component"
    );
  }

  return context;
};
