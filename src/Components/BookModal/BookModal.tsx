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

type InputType = {
  label: string;
  name: string;
  type: string;
  dropdownOptions?: string[];
  minMaxValues?: [number, number];
};

const inputFields: InputType[] = [
  { label: "Name", name: "name", type: "text" },
  { label: "Author", name: "author", type: "text" },
  { label: "Description", name: "description", type: "text" },
  { label: "Genre", name: "genre", type: "dropdown", dropdownOptions: GENRES },
  { label: "Price", name: "price", type: "number", minMaxValues: [0, 10000] },
  {
    label: "Quantity",
    name: "quantity",
    type: "number",
    minMaxValues: [0, 2000],
  },
  {
    label: "Language",
    name: "language",
    type: "dropdown",
    dropdownOptions: BOOK_LANGUAGES,
  },
  { label: "Publisher", name: "publisher", type: "text" },
  { label: "Rating", name: "rating", type: "number", minMaxValues: [0, 5] },
];

const validationSchema = object({
  name: string().required("Book name is Required"),
  description: string()
    .max(150, "Maximum 150 character allowed")
    .required("Book description is Required"),
  author: string().required("Author name is Required"),
  genre: string().required("Genre is required"),
  language: string().required("Language is required"),
  price: number()
    .max(10000, "Price must be less than 10,000")
    .required("Price is required"),
  quantity: number()
    .max(200, "Quantities can't be greater than 2000")
    .required("Quantity is required"),
  publisher: string().required("Publisher name is Required"),
  rating: string().required("Rating name is Required"),
});

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

  const InputField = ({
    label,
    name,
    type,
    dropdownOptions = [],
    minMaxValues = [0, 0],
  }: {
    label: string;
    name: string;
    type: string;
    dropdownOptions?: string[];
    minMaxValues?: [number, number];
  }) => (
    <div className={css.inputWrapper}>
      <label className={css.label}>{label}</label>
      {type === "dropdown" ? (
        <InputWithDropdown fieldName={name} dropdownOptions={dropdownOptions} />
      ) : (
        <InputWrapper
          fieldName={name}
          fieldType={type}
          minMaxValues={minMaxValues}
        />
      )}
    </div>
  );

  const dialogContent = (
    <Formik
      initialValues={initialBookState}
      onSubmit={saveBook}
      validationSchema={validationSchema}
    >
      {({ isSubmitting }) => (
        <Form>
          <DialogContent dividers className={css.content}>
            {inputFields.map((field) => (
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
