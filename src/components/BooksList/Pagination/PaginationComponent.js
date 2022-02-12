import React, { useEffect } from "react";
import { Pagination, PaginationItem } from "@material-ui/lab";
import useStyles from "./styles";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  endBookLoading,
  getAllBooks,
  startBookLoading,
} from "../../../redux/slices/books";
import booksServices from "../../../services/books/booksServices";

const PaginationComponent = ({ page }) => {
  const { numberOfPages, isLoading } = useSelector((state) => state.books);
  const clases = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    if (page) {
      getData(page);
    }
  }, [page]);

  const getData = async (page) => {
    dispatch(startBookLoading());
    const res = await booksServices.getBooks(page);
    if (res.status === 200) {
      dispatch(getAllBooks(res.data));
      dispatch(endBookLoading());
    }
  };

  return (
    <div>
      {!isLoading && (
        <Pagination
          className={clases.ul}
          count={numberOfPages}
          page={Number(page) || 1}
          variant="outlined"
          color="primary"
          renderItem={(item) => (
            <PaginationItem
              {...item}
              component={Link}
              to={`/books?page=${item.page}`}
            />
          )}
        />
      )}
    </div>
  );
};

export default PaginationComponent;
