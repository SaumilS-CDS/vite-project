import { useMemo, useState } from "react";
import {
  DataGrid,
  GridPaginationModel,
  GridRenderCellParams,
  GridSortItem,
} from "@mui/x-data-grid";
import { Button, IconButton } from "@mui/material";

import css from "./Table.module.css";

import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import { useNavigate } from "react-router-dom";
import { BookModal } from "../Components/BookModal/BookModal";
import { useBooks } from "../Core/BookContext";
import { getComparator } from "../Shared/helper";

export const SortAndFilterTable = () => {
  const navigate = useNavigate();
  const { bookList } = useBooks();

  const [isOpenSaveBookModal, setIsOpenSaveBookModal] =
    useState<boolean>(false);
  const [sortModel, setSortModel] = useState<GridSortItem[]>([
    { field: "name", sort: "asc" },
  ]);
  const [searchString, setSearchString] = useState<string>("");
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    pageSize: 10,
    page: 0,
  });

  const columns = useMemo(() => {
    return [
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
        width: 200,
        disableColumnMenu: true,
      },
      {
        field: "author",
        headerName: "Author",
        width: 150,
        disableColumnMenu: true,
      },
      {
        field: "price",
        headerName: "Price",
        width: 150,
        disableColumnMenu: true,
      },
      {
        field: "genre",
        headerName: "Genre",
        width: 150,
        disableColumnMenu: true,
      },
      {
        field: "quantity",
        headerName: "Quantity",
        width: 120,
        disableColumnMenu: true,
      },
      {
        field: "language",
        headerName: "Language",
        width: 150,
        disableColumnMenu: true,
      },
      {
        field: "publisher",
        headerName: "Publisher",
        width: 200,
        disableColumnMenu: true,
      },
      {
        field: "rating",
        headerName: "Rating",
        width: 150,
        disableColumnMenu: true,
      },
    ];
  }, [bookList]);

  const visibleRows = useMemo(() => {
    const order = sortModel.length ? sortModel[0].sort : "asc";
    const orderBy = sortModel.length ? sortModel[0].field : "quantity";
    const page = paginationModel.page;
    const pageSize = paginationModel.pageSize;

    return [...bookList]
      .slice()
      .sort(getComparator(order, orderBy))
      .filter((book) => book.name.toLowerCase().includes(searchString))
      .slice(page * pageSize, page * pageSize + pageSize);
  }, [sortModel, paginationModel, searchString, bookList]);

  return (
    <>
      <div className={css["books-list-wrapper"]}>
        <div className={css["book-list-header"]}>
          <h3 className={css["book-title"]}>List of Books</h3>
          <div>
            <input
              type="text"
              className={css.input}
              value={searchString}
              onChange={(event) => setSearchString(event.target.value)}
            />
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
          rows={visibleRows}
          sx={{
            "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
              outline: "none !important",
            },
            "button:focus": {
              outline: "none !important",
            },
          }}
          disableRowSelectionOnClick
          pageSizeOptions={[5, 10]}
          columns={columns}
          sortingMode="server"
          paginationMode="server"
          sortModel={sortModel}
          onSortModelChange={(model) => setSortModel(model)}
          onPaginationModelChange={(model) => setPaginationModel(model)}
        />
      </div>
      <BookModal
        isOpenModal={isOpenSaveBookModal}
        changedIsOpenModal={() => setIsOpenSaveBookModal((prev) => !prev)}
      />
    </>
  );
};
