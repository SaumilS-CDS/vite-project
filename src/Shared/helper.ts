import { GridSortDirection } from "@mui/x-data-grid";

export const getCharacterValidationError = (str: string) =>
  `Your password must have at least 1 ${str} character`;

/**
 * Comparator function for descending order based on a specified property (orderBy) of objects of type T.
 *
 * @param a - The first object for comparison.
 * @param b - The second object for comparison.
 * @param orderBy - The property of the objects to be used for comparison.
 * @returns - Returns -1 if b[orderBy] < a[orderBy], 1 if b[orderBy] > a[orderBy], and 0 if they are equal.
 */
export function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

/**
 * Function to generate a comparator based on the specified order and property (orderBy).
 * It returns a comparator function that can be used for sorting an array of objects.
 *
 * @param order - Sorting order ('asc' for ascending, 'desc' for descending).
 * @param orderBy - The property of the object to be used for sorting.
 * @returns - Returns a comparator function based on the specified order and property.
 */
export const getComparator = <Key extends keyof any>(
  order: GridSortDirection,
  orderBy: Key
): ((
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number) =>
  order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
