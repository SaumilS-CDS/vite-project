const bookDetails1 = {
  title: "The Great Book",
  author: "John Doe",
  coverImage: "path/to/cover-image.jpg",
  synopsis: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ...",
  details: {
    ISBN: "1234567890",
    genre: "Fiction",
    publicationDate: "January 1, 2023",
    pageCount: 300,
  },
};

import { Button } from "@mui/material";
import css from "./BookDetail.module.css";
import { BookModal } from "../Components/BookModal/BookModal";
import { useNavigate, useParams } from "react-router-dom";
import { useBooks } from "../Core/BookContext";
import { useState } from "react";
import { CustomDialog } from "../Components/DialogBox/DialogBox";

export const BookDetail = () => {
  const { id } = useParams();

  const { bookList, deleteBookToList } = useBooks();

  const navigate = useNavigate();

  console.log(bookList);

  const [isOpenSaveBookModal, setIsOpenSaveBookModal] =
    useState<boolean>(false);
  const [isOpenConfirmationModal, setIsOpenConfirmationModal] =
    useState<boolean>(false);

  const bookDetails = bookList.find(
    (book) => book.id === "d89z-D2rwNHAUxlQqZUhI"
  );

  return (
    <>
      <div className={css.container}>
        <h2 className={css["author-name"]}>{bookDetails1.author}</h2>

        <p className={css["description"]}>{bookDetails1.synopsis}</p>

        <div className="details-section">
          <h3 className={css["details-title"]}>Details</h3>
          <table className={css["table-container"]}>
            <tbody>
              {Object.entries(bookDetails1.details).map(([key, value]) => (
                <tr key={key}>
                  <th className={css["table-row"]}>{key}</th>
                  <td className={css["table-row"]}>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={css.actions}>
          <Button
            variant="contained"
            onClick={() => setIsOpenSaveBookModal(true)}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="error"
            className={css.delete}
            onClick={() => setIsOpenConfirmationModal(true)}
          >
            Delete
          </Button>
        </div>
      </div>

      <BookModal
        isEditMode
        bookData={bookDetails}
        isOpenModal={isOpenSaveBookModal}
        changedIsOpenModal={() => setIsOpenSaveBookModal((prev) => !prev)}
      />

      {isOpenConfirmationModal && (
        <CustomDialog
          title="Delete confirmation"
          content={
            <p className={css.confirmationMessage}>
              Are you sure you want to delete this book?
            </p>
          }
          actions={
            <Button
              variant="contained"
              color="error"
              className={css.delete}
              onClick={() => {
                if (id) {
                  deleteBookToList(id);
                  navigate("/");
                }
              }}
            >
              Delete
            </Button>
          }
          onClose={() => setIsOpenConfirmationModal(false)}
        />
      )}
    </>
  );
};
