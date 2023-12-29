import { useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { number, object, string } from "yup";
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

import { BOOK_LANGUAGES, GENRES } from "../../../assets/utils/constants";

type BookModalType = {
  isEditMode?: boolean;
  bookData?: BookType;
  isOpenModal: boolean;
  changedIsOpenModal: () => void;
};

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
  } = bookData || {};

  const initialBookState = {
    name: name || "",
    author: author || "",
    description: description || "",
    price: price || 0,
    genre: genre || GENRES[0],
    quantity: quantity || 0,
    id: isEditMode ? id : nanoid(),
    publisher: publisher || "",
    rating: rating || 0,
    language: language || BOOK_LANGUAGES[0],
  };

  const saveBook = async (values: BookType) => {
    try {
      console.log('called');
      
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

  const InputWrapper = ({
    fieldName,
    fieldType,
    minMaxValues = [0, 0],
  }: {
    fieldName: string;
    fieldType: string;
    minMaxValues?: [number, number];
  }) => (
    <div className={css.inputError}>
      <Field
        as={fieldName !== "description" ? "input" : "textarea"}
        type={fieldType}
        min={minMaxValues[0]}
        max={minMaxValues[1]}
        name={fieldName}
        className={css.input}
      />
      <ErrorMessage name={fieldName} component="div" className={css.error} />
    </div>
  );

  const InputWithDropdown = ({
    fieldName,
    dropdownOptions,
  }: {
    fieldName: string;
    dropdownOptions: string[];
  }) => (
    <div className={css.inputError}>
      <DropDown options={dropdownOptions} fieldName={fieldName} />
      <ErrorMessage name={fieldName} component="div" className={css.error} />
    </div>
  );

  const dialogContent = (
    <Formik
      initialValues={initialBookState}
      onSubmit={saveBook}
      validationSchema={object({
        name: string().required("Book name is Required"),
        description: string()
          .max(150, "Maximum 150 character allowed")
          .required("Book description is Required"),
        author: string().required("Author name is Required"),
        genre: string().required("Genre is required"),
        language: string().required("Language is required"),
        price: number().required("Price is required"),
        quantity: number().required("Quantity is required"),
        publisher: string().required("Publisher name is Required"),
        rating: string().required("Rating name is Required"),
      })}
    >
      {({ isSubmitting }) => (
        <Form>
          <DialogContent dividers>
            <div className={css.inputWrapper}>
              <label className={css.label}>Name</label>
              <InputWrapper fieldName="name" fieldType="text" />
            </div>

            <div className={css.inputWrapper}>
              <label className={css.label}>Author</label>
              <InputWrapper fieldName="author" fieldType="text" />
            </div>

            <div className={css.inputWrapper}>
              <label className={css.label}>Description</label>
              <InputWrapper fieldName="description" fieldType="text" />
            </div>

            <div className={css.inputWrapper}>
              <label className={css.label}>Genre</label>
              <InputWithDropdown fieldName="genre" dropdownOptions={GENRES} />
            </div>

            <div className={css.inputWrapper}>
              <label className={css.label}>Price</label>
              <InputWrapper
                fieldName="price"
                fieldType="number"
                minMaxValues={[0, 10000]}
              />
            </div>

            <div className={css.inputWrapper}>
              <label className={css.label}>Quantity</label>
              <InputWrapper
                fieldName="quantity"
                fieldType="number"
                minMaxValues={[0, 2000]}
              />
            </div>

            <div className={css.inputWrapper}>
              <label className={css.label}>Language</label>
              <InputWithDropdown
                fieldName="language"
                dropdownOptions={BOOK_LANGUAGES}
              />
            </div>

            <div className={css.inputWrapper}>
              <label className={css.label}>Publisher</label>
              <InputWrapper fieldName="publisher" fieldType="text" />
            </div>

            <div className={css.inputWrapper}>
              <label className={css.label}>Rating</label>
              <InputWrapper
                fieldName="rating"
                fieldType="number"
                minMaxValues={[0, 5]}
              />
            </div>
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
