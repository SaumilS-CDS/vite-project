import { useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { number, object, string } from "yup";
import { nanoid } from "nanoid";

import { useBooks } from "../../Core/BookContext";

import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import css from "./BookModal.module.css";
import { BookType } from "../../Types/Book.type";
import { Snackbar } from "@mui/material";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

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

  const { name, description, price, category, quantity, rating, id } =
    bookData || {};

  const initialBookState = {
    name: name || "",
    description: description || "",
    price: price || 0,
    category: category || "",
    quantity: quantity || 0,
    rating: rating || 0,
    id: isEditMode ? id : nanoid(),
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

  return (
    <>
      <BootstrapDialog open={isOpenModal} onClose={changedIsOpenModal}>
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Register a book
        </DialogTitle>
        <IconButton
          onClick={changedIsOpenModal}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <Formik
          initialValues={initialBookState}
          onSubmit={saveBook}
          validationSchema={object({
            name: string().required("Book name is Required"),
            description: string()
              .max(150, "Maximum 150 character allowed")
              .required("Book description is Required"),
            price: number().required("Price is required"),
            category: string().required("Category is required"),
            quantity: number().required("Quantity is required"),
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
                  <label className={css.label}>Description</label>
                  <InputWrapper fieldName="description" fieldType="text" />
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
                  <label className={css.label}>Category</label>
                  <InputWrapper fieldName="category" fieldType="text" />
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
                  <label className={css.label}>Rating</label>
                  <InputWrapper
                    fieldName="rating"
                    fieldType="number"
                    minMaxValues={[0, 5]}
                  />
                </div>
              </DialogContent>
              <DialogActions>
                <Button type="submit" disabled={isSubmitting}>
                  Save Book
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </BootstrapDialog>
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
