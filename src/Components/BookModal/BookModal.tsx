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

const initialBookState = {
  name: "",
  description: "",
  price: 0,
  category: "",
  quantity: 0,
  rating: 0,
};

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export const BookModal = () => {
  const { addBookToList } = useBooks();

  const [open, setOpen] = useState<boolean>(false);
  const [showToast, setShowToast] = useState<boolean>(false);

  const saveBook = async (values: BookType) => {
    try {
      // Adding 4s delay to show loader like API calls.
      await new Promise((resolve) => setTimeout(resolve, 4000));
      addBookToList({ ...values, id: nanoid() });
    } catch (error) {
      console.error(error);
    } finally {
      setOpen(false);
    }
  };

  const InputWrapper = ({
    fieldName,
    fieldType,
  }: {
    fieldName: string;
    fieldType: string;
  }) => (
    <div className={css.inputError}>
      <Field type={fieldType} name={fieldName} className={css.input} />
      <ErrorMessage name={fieldName} component="div" className={css.error} />
    </div>
  );

  return (
    <>
      <Button variant="outlined" onClick={() => setOpen(true)}>
        Open dialog
      </Button>
      <BootstrapDialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Register a book
        </DialogTitle>
        <IconButton
          onClick={() => setOpen(false)}
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
              .max(50, "Maximum 50 character allowed")
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
                  <InputWrapper fieldName="price" fieldType="number" />
                </div>

                <div className={css.inputWrapper}>
                  <label className={css.label}>Category</label>
                  <InputWrapper fieldName="category" fieldType="text" />
                </div>

                <div className={css.inputWrapper}>
                  <label className={css.label}>Quantity</label>
                  <InputWrapper fieldName="quantity" fieldType="number" />
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
