import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Typography,
  Paper,
  Grid,
  Snackbar,
} from "@material-ui/core";
import Select from "react-select";
// import { useDispatch, useSelector } from 'react-redux';
import FileBase from "react-file-base64";

import useStyles from "./styles";
import { useDispatch } from "react-redux";
import booksServices from "../../services/books/booksServices";
import { addNewBook } from "../../redux/slices/books";
// import { createPost, updatePost } from '../../actions/posts';
import MuiAlert from "@material-ui/lab/Alert";

function ErrorAlert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const categories = [
  {
    label: "Horror",
    value: 1,
  },
  {
    label: "Sci-Fiction",
    value: 2,
  },
  {
    label: "Acedemic",
    value: 3,
  },
  {
    label: "Story",
    value: 4,
  },
  {
    label: "Novel",
    value: 5,
  },
  {
    label: "Children",
    value: 6,
  },
  {
    label: "Adult",
    value: 7,
  },
  {
    label: "Travel",
    value: 8,
  },
];
const AddBookForm = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({
    oldPrice: "",
    price: "",
    pages: "",
    title: "",
    author: "",
    publisher: "",
    description: "",
    isbns: "",
    category: "",
    bookImage: "",
  });
  //   const post = useSelector((state) => (currentId ? state.posts.find((description) => description._id === currentId) : null));
  const dispatch = useDispatch();
  var [formError, setFormError] = useState({
    message: "",
    open: false,
    status: "success",
  });
  const classes = useStyles();

  //   useEffect(() => {
  //     if (post) setPostData(post);
  //   }, [post]);

  const clear = () => {
    setCurrentId(0);
    setPostData({
      oldPrice: "",
      price: "",
      pages: "",
      title: "",
      author: "",
      publisher: "",
      description: "",
      isbns: "",
      category: "",
      bookImage: "",
    });
  };

  const customStyles = {
    control: (_, { selectProps: { width } }) => ({
      width: 400,
    }),
    indicatorsContaner: () => ({
      background: "#000",
    }),
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await booksServices.createBook(postData);
    if (res.status === 200) {
      setFormError({
        message: res.data.message,
        open: true,
        status: "success",
      });
      dispatch(addNewBook(res.data.data));
      clear();
    }
    // if (currentId === 0) {
    // //   dispatch(createPost(postData));
    //   clear();
    // } else {
    // //   dispatch(updatePost(currentId, postData));
    //   clear();
    // }
  };

  return (
    <Paper className={classes.paper} elevation={4}>
      <Snackbar
        open={formError.open}
        autoHideDuration={3000}
        onClose={() => setFormError({ ...formError, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <ErrorAlert
          onClose={() => setFormError({ ...formError, open: false })}
          severity={formError.status}
        >
          {formError.message}
        </ErrorAlert>
      </Snackbar>
      <Typography variant="h4" className={classes.mainHead}>
        {" "}
        Add New Book Form
      </Typography>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        {/* <Typography variant="h6">{currentId ? `Editing "${post.title}"` : 'Creating a Memory'}</Typography> */}
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={6}>
            <TextField
              name="title"
              variant="outlined"
              label="Title"
              fullWidth
              value={postData.title}
              onChange={(e) =>
                setPostData({ ...postData, title: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <TextField
              name="author"
              variant="outlined"
              label="Author"
              fullWidth
              value={postData.author}
              onChange={(e) =>
                setPostData({ ...postData, author: e.target.value })
              }
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={6}>
            <TextField
              name="isbns"
              variant="outlined"
              label="ISBN (comma separated)"
              fullWidth
              value={postData.isbns}
              onChange={(e) =>
                setPostData({ ...postData, isbns: e.target.value.split(",") })
              }
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <TextField
              name="publisher"
              variant="outlined"
              label="Publisher"
              fullWidth
              value={postData.publisher}
              onChange={(e) =>
                setPostData({ ...postData, publisher: e.target.value })
              }
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={6}>
            <TextField
              name="oldPrice"
              type="number"
              variant="outlined"
              label="Original Price"
              fullWidth
              value={postData.oldPrice}
              onChange={(e) =>
                setPostData({ ...postData, oldPrice: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <TextField
              name="price"
              type="number"
              variant="outlined"
              label="Discounted Price"
              fullWidth
              value={postData.price}
              onChange={(e) =>
                setPostData({ ...postData, price: e.target.value })
              }
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={6}>
            <TextField
              name="pages"
              type="number"
              variant="outlined"
              label="Numner of Pages"
              fullWidth
              value={postData.pages}
              onChange={(e) =>
                setPostData({ ...postData, pages: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <Select
              placeholder={"Select Categories"}
              fullWidth
              options={categories}
              onChange={(e) => {
                setPostData({ ...postData, category: e });
              }}
              isMulti
              styles={customStyles}
            />
          </Grid>
        </Grid>
        <TextField
          name="description"
          variant="outlined"
          label="Description"
          fullWidth
          multiline
          rows={4}
          value={postData.description}
          onChange={(e) =>
            setPostData({ ...postData, description: e.target.value })
          }
        />
        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, bookImage: base64 })
            }
          />
        </div>
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          Submit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default AddBookForm;
