import { useMemo, useState } from "react";
import { BookProvider } from "./BookContext";
import { BookType } from "../Types/Book.type";

export const Book = ({ children }: { children: React.ReactNode }) => {
  const [booksList, setBooksList] = useState<BookType[]>([]);

  const addBookToList = (newBook: BookType) => {
    setBooksList((prev) => [...prev, newBook]);
  };

  const deleteBookToList = (id: string) => {
    const remainingBookList = booksList.filter((book) => book.id !== id);
    setBooksList(remainingBookList);
  };

  const updateBookToList = (updatedBookData: BookType) => {
    const booksCopy = [...booksList];
    const bookIndexToUpdate = booksList.findIndex(
      (book) => book.id === updatedBookData.id
    );
    booksCopy[bookIndexToUpdate] = updatedBookData;
    setBooksList(booksCopy);
  };

  const values = useMemo(() => {
    return {
      bookList: booksList,
      addBookToList,
      deleteBookToList,
      updateBookToList,
    };
  }, [booksList, addBookToList, deleteBookToList, updateBookToList]);

  return <BookProvider value={values}>{children}</BookProvider>;
};
