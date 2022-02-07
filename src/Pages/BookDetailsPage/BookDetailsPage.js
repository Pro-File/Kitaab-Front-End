import React, { useEffect, useState } from "react";
import { Paper, Typography, Divider, ListItemText, Grid } from "@material-ui/core";
import Loader from "../../components/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import booksServices from "../../services/books/booksServices";
import moment from "moment";

import { useParams, useHistory } from "react-router-dom";

import useStyles from "./styles";
import CurrencyFormatter from "../../components/CurrencyFormatter/CurrencyFormatter";
import { Rating } from "@material-ui/lab";
import Comments from "../../components/Comments/Comments";
import { addReview } from "../../redux/slices/books";
import Breadcums from "../../components/Breadcrums/breadcrums";

const BookDetailsPage = () => {
  const books = useSelector((state) => state.books.value);
  const [book, setBook] = useState(null);
  const user = JSON.parse(localStorage.getItem("profile"));
  const [rating, setRating] = useState(0);
  const [ratingStatus, setRatingStatus] = useState(false);
  const [recommendedBooks, setRecommendedBooks] = useState([])
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const { id } = useParams();

  useEffect(() => {
    getBookData();
  }, [id]);

  const openBook = (id) => {
    console.log("Clicked Book: ");
    history.push(`/books/${id}`)
  }
  
  const getBookData = async () => {
    if (books) {
      const res = await booksServices.getBook(id);
      console.log("Specifc Book: ", res);
      if(res.status === 200){
        setBook(res.data);
        console.log(books);
        const filteredBooks = books.filter((item) => {
            if (item._id !== res.data._id){
              return item.category[0].label === res.data.category[0].label
            }
        })
        setRecommendedBooks([...filteredBooks])
        console.log("Filtered Books: ", filteredBooks);
      }
    }
  };

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
      getBookData()
      dispatch(addReview({id: book._id, data: res.data.review}));
    }
  };

  const pathNames = [
    {
      name: 'Books',
      to: '/home',
    },
    {
      name: 'Book',
      to: '/home'
    }
  ]


  return (
    <>
    <Breadcums pathNames={pathNames}/>
      {book ? (
        <div className={classes.card}>
          <div className={classes.section}>
            <div style={{ display: "flex" }}>
              <Typography variant="h3" component="h2">
                {book.title}
              </Typography>
              <ListItemText
                style={{
                  textAlign: "right",
                }}
                primary={
                  <span className={classes.cutPrice}>
                    <CurrencyFormatter total={book.oldPrice} variant="h6" />
                  </span>
                }
                secondary={
                  <span className={classes.original}>
                    <CurrencyFormatter total={book.price} variant="h4" />
                  </span>
                }
              />
            </div>
            {book.reviews.find(
          (item) =>
            item.user === (user.data.googleId ? user.data.googleId : user.data._id)
        ) ? (
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
        ) : (
            <Rating
              className={classes.rating}
              name="simple-controlled"
              disabled={ratingStatus}
              value={rating}
              onClick={handleRating}
            />
        )}
        <div className={classes.ratingSection}>
        <Typography variant="subtitle1" gutterBottom>
          {` Average Reviews: ${
            book.averageReviews ? book.averageReviews?.toFixed(1) : 0
          } + `}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          {` Total Reviews: ${
            book.totalReviews ? book.totalReviews : 0
          } Reviews`}
        </Typography>
        </div>

            <Typography
              gutterBottom
              variant="subtitle1"
              color="textSecondary"
              component="h2"
            >
              Related Categories:{" "}
              {book.category.map((item) => `${item.label}, `)} etc.
            </Typography>
            <Typography
              gutterBottom
              variant="subtitle1"
              color="textSecondary"
              component="h2"
            >
              ISNB Numbers: {book.isbns.map((item) => `${item}, `)} etc.
            </Typography>

            <Typography
              gutterBottom
              variant="h6"
              align="justify"
              className={classes.marginal}
              component="h2"
            >
              {book.description}
            </Typography>
            <Typography variant="subtitle1">
              Published by: <b>{book.publisher}</b>
            </Typography>
            <Typography variant="subtitle1">
              Written by: <b>{book.author}</b>
            </Typography>
            <Typography variant="subtitle1">
              Added: <b>{moment(book.createdAt).fromNow()}</b>
            </Typography>
            <Typography variant="subtitle1">Pages: <b>{book.pages}</b></Typography>

            <Divider style={{ margin: "20px 0" }} />
           <Comments book={book}/>
            <Divider style={{ margin: "20px 0" }} />
          </div>
          <div className={classes.imageSection}>
            <img
              className={classes.media}
              src={
                book.bookImage ||
                "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
              }
              alt={book.title}
            />
          </div>
        </div>
      ) : (
        <Paper elevation={6} className={classes.loadingPaper}>
          <Loader />
        </Paper>
      )}
    {
      recommendedBooks.length>0 && (
        <div className={classes.section}>
          <Typography gutterBottom variant="h5">You Might Also Like</Typography>
          <Divider/>
          <Grid className={classes.container} container alignItems="stretch" spacing={4}>
          {
            recommendedBooks.map((book) => {
                return   <Grid key={book._id} item xs={12} sm={6} md={4} lg={3}>
                <div style={{margin: '20px', cursor: 'pointer'}} onClick={() => openBook(book._id)} key={book._id}>
                    <Typography gutterBottom variant="h6">
                    {book.title}
                    </Typography>
                    <Typography gutterBottom variant="subtitle2">
                    {book.author}
                    </Typography>
                    <Typography gutterBottom variant="subtitle2">
                    {book.publisher}
                    </Typography>
                    <Typography gutterBottom variant="subtitle2">
                    {book.desciption}
                    </Typography>
                    <img alt={book._id} src={book.bookImage} width="200px"/>
                </div>
                </Grid>
            })
          }
          </Grid>
        </div>
      )
    }
    </>
  );
};

export default BookDetailsPage;
