import { Button } from "@mui/material";
import css from "./BookDetail.module.css";
import { BookModal } from "../Components/BookModal/BookModal";
import { useNavigate, useParams } from "react-router-dom";
import { useBooks } from "../Core/BookContext";
import { useState } from "react";
import { CustomDialog } from "../Components/DialogBox/DialogBox";
import { BOOK_DETAILS_TO_SHOW } from "../../assets/utils/constants";

const defaultState = {
  id: "",
  name: "",
  author: "",
  genre: "",
  description: "",
  price: 0,
  quantity: 0,
  language: "",
  publisher: "",
  rating: 0,
  publishedAt: null
};

export const BookDetail = () => {
  const { id } = useParams();

  const { bookList, deleteBookToList } = useBooks();

  const navigate = useNavigate();

  const [isOpenSaveBookModal, setIsOpenSaveBookModal] =
    useState<boolean>(false);
  const [isOpenConfirmationModal, setIsOpenConfirmationModal] =
    useState<boolean>(false);

  const bookDetails = bookList.find((book) => book.id === id) || defaultState;

  const { author } = bookDetails;

  return (
    <>
      <div className={css.container}>
        <h2 className={css["author-name"]}>{author}</h2>

        <div className="details-section">
          <h3 className={css["details-title"]}>Details</h3>

          <div className={css["user-profile"]}>
            {BOOK_DETAILS_TO_SHOW.map(({ label, value }) => (
              <div className={css["input-wrapper"]}>
                <div className={css.label}>{label}</div>
                <span>{bookDetails[value]}</span>
              </div>
            ))}
          </div>
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
