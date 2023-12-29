import { useMemo, useState } from "react";
import { BookProvider } from "./BookContext";
import { BookType } from "../Types/Book.type";

// Sample data
const books = [
  {
    id: "1",
    name: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    genre: "Fiction",
    description: "A classic novel that explores the decadence of the Jazz Age.",
    price: 12,
    quantity: 50,
    rating: 3,
    language: "English",
    publisher: "Charles Scribner's Sons",
  },
  {
    id: "2",
    name: "To Kill a Mockingbird",
    author: "Harper Lee",
    genre: "Classics",
    description:
      "A poignant novel addressing racial injustice in the American South.",
    price: 14,
    rating: 3,
    quantity: 40,
    language: "English",
    publisher: "J.B. Lippincott & Co.",
  },
];

export const Book = ({ children }: { children: React.ReactNode }) => {
  const [booksList, setBooksList] = useState<BookType[]>(books);

  const addBookToList = (newBook: BookType) =>
    setBooksList((prev) => [...prev, newBook]);

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
