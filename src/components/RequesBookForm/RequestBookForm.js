import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper, Grid, Snackbar } from "@material-ui/core";
import Select from "react-select";
// import { useDispatch, useSelector } from 'react-redux';
import FileBase from "react-file-base64";

import useStyles from "./styles";
import { useDispatch } from "react-redux";
import booksServices from "../../services/books/booksServices";
import { addNewBook } from "../../redux/slices/books";
import bookingServices from "../../services/bookings/bookingServices";
import MuiAlert from '@material-ui/lab/Alert';


function ErrorAlert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


const RequestBookForm = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({
    name: "",
    contact: "",
    email: "",
    address: "",
    title: "",
    author: "",
    volume: "",
    description: "",
    isbns: "",
  });
  var [formError, setFormError]= useState({
    message: '',
    open: false,
    status: 'success',
  })
  //   const post = useSelector((state) => (currentId ? state.posts.find((description) => description._id === currentId) : null));
  const dispatch = useDispatch();
  const classes = useStyles();

  //   useEffect(() => {
  //     if (post) setPostData(post);
  //   }, [post]);

  const clear = () => {
    setCurrentId(0);
    setPostData({
      name: "",
      contact: "",
      email: "",
      address: "",
      title: "",
      author: "",
      volume: "",
      description: "",
      isbns: "",
    });
  };

  const customStyles = {
    control: (_, { selectProps: { width } }) => ({
      width: 400,
    }),
    indicatorsContainer: () => ({
      background: "#000",
    }),
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await bookingServices.createBooking(postData);
    if (res.status === 200) {
      setFormError({
        message: res.data.message,
        open: true,
        status: 'success',
      })
      clear();
    }
  };

  return (
    <Paper className={classes.paper} elevation={4}>
       <Snackbar open={formError.open} autoHideDuration={3000} onClose={() => setFormError({ ...formError, open: false })}  anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <ErrorAlert onClose={() => setFormError({ ...formError, open: false })} severity={formError.status}>
          {formError.message}
        </ErrorAlert>
      </Snackbar>
      <Typography variant="h4" className={classes.mainHead}>
        {" "}
        Request Book Form
      </Typography>
      <form
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
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
              name="volume"
              variant="outlined"
              label="Volume / Edition (Optional)"
              fullWidth
              value={postData.volume}
              onChange={(e) =>
                setPostData({ ...postData, volume: e.target.value })
              }
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={6}>
            <TextField
              name="name"
              variant="outlined"
              label="Full Name"
              fullWidth
              value={postData.name}
              onChange={(e) =>
                setPostData({ ...postData, name: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <TextField
              name="contact"
              type="number"
              variant="outlined"
              label="Contact Number"
              fullWidth
              value={postData.contact}
              onChange={(e) =>
                setPostData({ ...postData, contact: e.target.value })
              }
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={6}>
            <TextField
              name="email"
              type="email"
              variant="outlined"
              label="Email Address"
              fullWidth
              value={postData.email}
              onChange={(e) =>
                setPostData({ ...postData, email: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <TextField
              name="address"
              variant="outlined"
              label="Address"
              fullWidth
              value={postData.address}
              onChange={(e) =>
                setPostData({ ...postData, address: e.target.value })
              }
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12} lg={12}>
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
          </Grid>
        </Grid>
        <Grid container spacing={2}>
            <Grid item xs={12} md={6} lg={6}>
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
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="secondary"
          size="large"
          onClick={clear}
          fullWidth
        >
          Clear
        </Button>

            </Grid>
        </Grid>
      </form>
              <div className={classes.notice}>
              <Typography variant="h6" color="secondary">
        Note:
      </Typography>
      <Typography variant="body2" color="textSecondary">
        If your desired book is not available with us, you can place a request
        for it by filling out the above form. Our team will respond you in
        the next 48 to 72 hours.
      </Typography>
              </div>
    </Paper>
  );
};

export default RequestBookForm;
