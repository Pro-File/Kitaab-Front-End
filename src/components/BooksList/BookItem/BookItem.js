import React, { useState, useEffect } from "react";
import useStyles from "./styles";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  ListItemText,
  ButtonBase,
} from "@material-ui/core";
import moment from "moment";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";
import { useHistory } from "react-router-dom";
import Rating from "@material-ui/lab/Rating";
import CurrencyFormatter from "../../CurrencyFormatter/CurrencyFormatter";
import booksServices from "../../../services/books/booksServices";
import { addReview } from "../../../redux/slices/books";
import { useDispatch } from "react-redux";

const BookItem = ({ book }) => {
  const [rating, setRating] = useState(0);
  const [ratingStatus, setRatingStatus] = useState(false);
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));
  const classes = useStyles();
  const history = useHistory();

  const handleRating = async(e) => {
    console.log(Number(e.target.outerText.split(" ")[0]));
    const id = book._id;
    const data = {
      userId: user.data.googleId ? user.data.googleId : user.data._id,
      rating: Number(e.target.outerText.split(" ")[0])
    }
    const res = await booksServices.addReview(data, id);
    if(res.status === 200){
      setRatingStatus(true)
      dispatch(addReview({id: book._id, data: res.data.review}));
    }
  };

  const handleBookClick = () => {
    history.push(`/books/${book._id}`);
  };

  return (
    <Card className={classes.card} elevation={10}>
      <CardMedia
        className={classes.media}
        image={book.bookImage}
        title={book.title}
      />
      <div className={classes.overlay}>
        <Typography variant="h6">{book.title}</Typography>
        <Typography variant="body2">
          {`Added ${moment(book.createdAt).fromNow()}`}
        </Typography>
        <div className={classes.ratingSection}>
          <Typography variant="subtitle1">By: {book.author}</Typography>
          <Typography variant="body1">Pages: {book.pages}</Typography>
        </div>
      </div>
      <div className={classes.overlay2}>
        <ListItemText
          style={{
            textAlign: "initial",
          }}
          primary={
            <span className={classes.cutPrice}>
              <CurrencyFormatter total={book.oldPrice} variant="body2" />
            </span>
          }
          secondary={
            <span className={classes.rs}>
              <CurrencyFormatter total={book.price} variant="h6" />
            </span>
          }
        />
      </div>
      <div className={classes.details}>
        {book.reviews?.find(
          (item) =>
            item.user ===
            (user.data.googleId ? user.data.googleId : user.data._id)
        ) ? (
          <div className={classes.ratingContainer}>
            <Rating
              className={classes.rating}
              name="simple-controlled"
              disabled
              value={
                book.reviews.find(
                  (item) =>
                    item.user ===
                    (user.data.googleId ? user.data.googleId : user.data._id)
                ).rating
              }
            />
          </div>
        ) : (
          <div className={classes.ratingContainer}>
            <Rating
              className={classes.rating}
              name="simple-controlled"
              disabled={ratingStatus}
              value={rating}
              onClick={handleRating}
            />
          </div>
        )}
        <Typography variant="subtitle2">
          {` Average Reviews: ${
            book.averageReviews ? book.averageReviews?.toFixed(1) : 0
          } + `}
        </Typography>
        <Typography variant="subtitle2">
          {` Total Reviews: ${
            book.totalReviews ? book.totalReviews : 0
          } Reviews`}
        </Typography>
      </div>
      <CardContent className={classes.content}>
        <Typography variant="body2" color="textSecondary">
          Categories: {book.category.map((item) => `${item.label}, `)} etc.
        </Typography>
        <Typography variant="body2" color="textSecondary">
          ISBNS: {book.isbns.map((item) => `${item}, `)} etc.
        </Typography>
        <div className={classes.detailsBtn}>
          <Button color="primary" onClick={handleBookClick}>
            view more <ArrowRightAltIcon className={classes.detailsBtnIcon} />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookItem;
