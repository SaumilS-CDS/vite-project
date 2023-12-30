import { useEffect, useMemo, useState } from "react";
import { BookProvider } from "./BookContext";
import { BOOK_STORAGE_KEY } from "./StorageConstant";

import { staticBookData } from "../../assets/utils/dummyBooksList";

import { BookType } from "../Types/Book.type";

export const Book = ({ children }: { children: React.ReactNode }) => {
  const [booksList, setBooksList] = useState<BookType[]>([]);

  /**
   *
   * @param newBook: New Book to save
   */
  const addBookToList = (newBook: BookType) => {
    // appending the newBook to existing book list
    const newBooksList = [...booksList, newBook];
    setBooksList(newBooksList);
    localStorage.setItem(BOOK_STORAGE_KEY, JSON.stringify(newBooksList));
  };

  /**
   *
   * @param id: Id for the book to delete
   */
  const deleteBookToList = (id: string) => {
    const remainingBookList = booksList.filter((book) => book.id !== id);
    setBooksList(remainingBookList);
    localStorage.setItem(BOOK_STORAGE_KEY, JSON.stringify(remainingBookList));
  };

  /**
   *
   * @param updatedBookData: Updated Book object
   */
  const updateBookToList = (updatedBookData: BookType) => {
    const booksCopy = [...booksList];
    const bookIndexToUpdate = booksList.findIndex(
      (book) => book.id === updatedBookData.id
    );
    booksCopy[bookIndexToUpdate] = updatedBookData;
    setBooksList(booksCopy);
    localStorage.setItem(BOOK_STORAGE_KEY, JSON.stringify(booksCopy));
  };

  const values = useMemo(() => {
    return {
      bookList: booksList,
      addBookToList,
      deleteBookToList,
      updateBookToList,
    };
  }, [booksList, addBookToList, deleteBookToList, updateBookToList]);

  useEffect(() => {
    // When page loads getting books from local storage.
    const localStorageBooks = localStorage.getItem(BOOK_STORAGE_KEY);

    if (localStorageBooks === null) {
      // If Local storage doesn't have key set then it will set book data.
      localStorage.setItem(BOOK_STORAGE_KEY, JSON.stringify(staticBookData));
      setBooksList([...staticBookData]);
    } else {
      // If Local storage have the value then fetch it from there.
      const fromBookData = JSON.parse(localStorageBooks || "");
      setBooksList([...fromBookData]);
    }
  }, []);

  return <BookProvider value={values}>{children}</BookProvider>;
};
