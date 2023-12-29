import { Field } from "formik";
import css from "./DropDown.module.css";

type DropdownType = {
  options: string[];
  fieldName: string;
};

export const DropDown = ({ options, fieldName }: DropdownType) => {
  return (
    <Field as="select" name={fieldName} className={css["custom-select"]}>
      {options.map((option) => (
        <option value={option} key={option}>
          {option}
        </option>
      ))}
    </Field>
  );
};
