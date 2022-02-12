import React from "react";
import useStyles from "./styles";
import { Typography, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
const RequestBookBanner = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div className={classes.childContainer}>
        <Typography variant="h5" className={classes.heading}>
          Can't find what you're looking for ?
        </Typography>
        <Button
          component={Link}
          to="/requestBook"
          className={classes.button}
          variant="contained"
          color="primary"
        >
          Request a Book
        </Button>
      </div>
    </div>
  );
};

export default RequestBookBanner;
