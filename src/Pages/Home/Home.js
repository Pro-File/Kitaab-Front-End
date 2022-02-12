import { Grow } from "@material-ui/core";
import React from "react";
import { BooksList } from "../../components/BooksList/BooksList";
import PaginationComponent from "../../components/BooksList/Pagination/PaginationComponent";
import RequestBookBanner from "../../components/RequestBookBanner/RequestBookBanner";
import { useLocation } from "react-router-dom";
import useStyles from "./styles";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const classes = useStyles();
  const query = useQuery();
  const page = query.get("page") || 1;
  return (
    <Grow in>
      <div>
        <BooksList />
        <div className={classes.pagination}>
          <PaginationComponent page={page} />
        </div>
        <RequestBookBanner />
      </div>
    </Grow>
  );
};

export default Home;
