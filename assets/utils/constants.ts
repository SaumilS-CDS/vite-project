import { number, object, string } from "yup";
import { InputType } from "../../src/Components/BookModal/BookModal";
import { getCharacterValidationError } from "../../src/Shared/helper";

export const GENRES = [
  "Action",
  "Adventure",
  "Comedy",
  "Drama",
  "Fantasy",
  "Horror",
  "Mystery",
  "Romance",
  "Science Fiction",
  "Thriller",
  "Western",
];

export const BOOK_LANGUAGES = ["English", "Gujarati", "Spanish", "Russian"];

// Validation Schema for Book
export const BookValidationSchema = object({
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

// Validation schema for Registration
export const RegistrationValidationSchema = object({
  email: string()
    .email()
    .required("Email is Required")
    .matches(/^(?!.*@[^,]*,)/),
  password: string()
    .required("Password is Required")
    // check minimum characters
    .min(8, "Password must have at least 8 characters")
    // different error messages for different requirements
    .matches(/[0-9]/, getCharacterValidationError("digit"))
    .matches(/[a-z]/, getCharacterValidationError("lowercase"))
    .matches(/[A-Z]/, getCharacterValidationError("uppercase")),
  firstName: string().required("First Name is Required"),
  lastName: string().required("Last Name is Required"),
});

// Validation Schema for Login
export const LoginValidationSchema = object({
  email: string()
    .email()
    .required("Email is Required")
    .matches(/^(?!.*@[^,]*,)/),
  password: string()
    .required("Password is Required")
    // check minimum characters
    .min(8, "Password must have at least 8 characters")
    // different error messages for different requirements
    .matches(/[0-9]/, getCharacterValidationError("digit"))
    .matches(/[a-z]/, getCharacterValidationError("lowercase"))
    .matches(/[A-Z]/, getCharacterValidationError("uppercase")),
});

// Create Book Input array
export const BookFields: InputType[] = [
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
