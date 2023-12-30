import { useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { nanoid } from "nanoid";

import { useBooks } from "../../Core/BookContext";

import Button from "@mui/material/Button";

import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";

import css from "./BookModal.module.css";
import { BookType } from "../../Types/Book.type";
import { Snackbar } from "@mui/material";
import { CustomDialog } from "../DialogBox/DialogBox";
import { DropDown } from "../DropDown/DropDown";

import { BOOK_LANGUAGES, BookFields, BookValidationSchema, GENRES } from "../../../assets/utils/constants";

type BookModalType = {
  isEditMode?: boolean;
  bookData?: BookType;
  isOpenModal: boolean;
  changedIsOpenModal: () => void;
};

export type InputType = {
  label: string;
  name: string;
  type: string;
  dropdownOptions?: string[];
  minMaxValues?: [number, number];
};

const InputField = ({
  label,
  name,
  type,
  dropdownOptions = [],
  minMaxValues = [0, 0],
}: InputType) => (  
  <div className={css.inputWrapper}>
    <div className={css.label}>{label}</div>
    <div className={css.inputError}>
      {type === "dropdown" ? (
        <DropDown options={dropdownOptions} fieldName={name} />
      ) : (
        <Field
          as={name !== "description" ? "input" : "textarea"}
          type={type}
          min={minMaxValues[0]}
          max={minMaxValues[1]}
          name={name}
          className={css.input}
        />
      )}
      <ErrorMessage name={name} component="div" className={css.error} />
    </div>
  </div>
);

export const BookModal = ({
  isEditMode = false,
  bookData,
  isOpenModal,
  changedIsOpenModal,
}: BookModalType) => {
  const { addBookToList, updateBookToList } = useBooks();

  const [showToast, setShowToast] = useState<boolean>(false);

  const {
    name,
    author,
    description,
    price,
    quantity,
    id,
    genre,
    publisher,
    rating,
    language,
    publishedAt
  } = bookData || {};

  const initialBookState = {
    name: name || "",
    author: author || "",
    description: description || "",
    price: price || null,
    genre: genre || GENRES[0],
    quantity: quantity || 0,
    id: isEditMode ? id : nanoid(),
    publisher: publisher || "",
    rating: rating || null,
    language: language || BOOK_LANGUAGES[0],
    publishedAt: publishedAt || null
  };

  const saveBook = async (values: BookType) => {
    try {
      // Adding 4s delay to show loader like API calls.
      await new Promise((resolve) => setTimeout(resolve, 4000));

      if (isEditMode) {
        updateBookToList(values);
      } else {
        addBookToList(values);
      }
    } catch (error) {
      console.error(error);
    } finally {
      changedIsOpenModal();
    }
  };

  const dialogContent = (
    <Formik
      initialValues={initialBookState}
      onSubmit={saveBook}
      validationSchema={BookValidationSchema}
    >
      {({ isSubmitting }) => (
        <Form>
          <DialogContent dividers className={css.content}>
            {BookFields.map((field) => (
              <InputField key={field.name} {...field} />
            ))}
          </DialogContent>
          <DialogActions>
            <Button type="submit" disabled={isSubmitting} variant="contained">
              Save Book
            </Button>
          </DialogActions>
        </Form>
      )}
    </Formik>
  );

  return (
    <>
      {isOpenModal && (
        <CustomDialog
          title="Register a book"
          content={dialogContent}
          onClose={changedIsOpenModal}
        />
      )}

      <Snackbar
        open={showToast}
        className={css.snackbar}
        sx={{ width: "100%" }}
        autoHideDuration={4000}
        onClose={() => setShowToast(false)}
        message="Book Saved Successfully"
      />
    </>
  );
};
