import { useMemo, useState } from "react";
import { DataGrid, GridRenderCellParams, GridSortItem } from "@mui/x-data-grid";
import { Button, IconButton } from "@mui/material";

import css from "./Table.module.css";

import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import { useNavigate } from "react-router-dom";
import { BookModal } from "../Components/BookModal/BookModal";
import { useBooks } from "../Core/BookContext";


export const SortAndFilterTable = () => {
  const navigate = useNavigate();
  const { bookList } = useBooks();

  const [filteredRows, setFilteredRows] = useState([...bookList]);
  const [isOpenSaveBookModal, setIsOpenSaveBookModal] =
    useState<boolean>(false);
  const [sortModel, setSortModel] = useState<GridSortItem[]>([
    { field: "name", sort: "asc" },
  ]);

  const columns = useMemo(
    () => [
      {
        field: "id",
        headerName: "ID",
        width: 70,
        renderCell: (dataValue: GridRenderCellParams<any>) => {
          return (
            <IconButton
              className={css.iconButton}
              onClick={() => {
                console.log(dataValue);
                navigate(`/book/${dataValue.id}`);
              }}
            >
              <RemoveRedEyeOutlinedIcon />
            </IconButton>
          );
        },
        sortable: false,
        disableColumnMenu: true,
      },
      {
        field: "name",
        headerName: "Name",
        width: 150,
        sortable: false,
        disableColumnMenu: true,
      },
      {
        field: "author",
        headerName: "Author",
        width: 150,
        sortable: false,
        disableColumnMenu: true,
      },
      {
        field: "price",
        headerName: "Price",
        width: 150,
        sortable: false,
        disableColumnMenu: true,
      },
      {
        field: "publishedYear",
        headerName: "Published Yr",
        width: 120,
        sortable: false,
        disableColumnMenu: true,
      },
      {
        field: "genre",
        headerName: "Genre",
        width: 150,
        sortable: false,
        disableColumnMenu: true,
      },
      {
        field: "quantity",
        headerName: "Quantity",
        width: 120,
        sortable: false,
        disableColumnMenu: true,
      },
      {
        field: "language",
        headerName: "Language",
        width: 150,
        sortable: false,
        disableColumnMenu: true,
      },
      {
        field: "publisher",
        headerName: "Publisher",
        width: 200,
        sortable: false,
        disableColumnMenu: true,
      },
    ],
    []
  );

  return (
    <>
      <div className={css["books-list-wrapper"]}>
        <div className={css["book-list-header"]}>
          <h3>List of Books</h3>
          <div>
            <input type="text" className={css.input} />
            <Button
              sx={{ ml: "15px" }}
              variant="contained"
              onClick={() => setIsOpenSaveBookModal(true)}
            >
              Add New Book
            </Button>
          </div>
        </div>
        <DataGrid
          rows={filteredRows}
          sx={{
            "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
              outline: "none !important",
            },
            "button:focus": {
              outline: "none !important",
            },
          }}
          disableRowSelectionOnClick
          pageSizeOptions={[5]}
          columns={columns}
          sortingMode="server"
          sortModel={sortModel}
          onSortModelChange={(model) => setSortModel(model)}
        />
      </div>
      <BookModal
        isOpenModal={isOpenSaveBookModal}
        changedIsOpenModal={() => setIsOpenSaveBookModal((prev) => !prev)}
      />
    </>
  );
};
