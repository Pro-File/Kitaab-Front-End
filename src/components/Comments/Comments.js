import React, { useState, useRef, useEffect } from "react";
import {
  List as MUIList,
  Typography,
  TextField,
  Button,
  Slide,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import useStyles from "./styles";
import commentsServices from "../../services/comments/commentsServices";
import {
  addEditComment,
  addNewComment,
  deleteComment,
  setAllComments,
} from "../../redux/slices/comments";
import EditIcon from "@material-ui/icons/Edit";
import moment from "moment";
import { Delete } from "@material-ui/icons";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Comments = ({ book }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [editComment, setEditComment] = useState("");
  const [deleteAble, setDeleteAble] = useState(false);
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    getComments();
  }, [book]);

  const getComments = async () => {
    if (book) {
      const res = await commentsServices.getComments();
      if (res.status === 200) {
        dispatch(setAllComments(res.data));
        const filteredComments = res.data.filter(
          (item) => item.bookId === book._id
        );
        setComments([...filteredComments]);
      }
    }
  };

  const handleClickOpen = (data) => {
    setOpen(true);
    setEditComment(data);
  };

  const handleClose = () => {
    setOpen(false);
    setEditComment("");
  };

  const handleEditComment = (e) => {
    const data = { ...editComment };
    data[e.target.name] = e.target.value;
    setEditComment({ ...data });
  };

  const submitComment = async () => {
    const commentsData = {
      comment: comment,
      name: user.data.name,
      userId: user.data._id ? user.data._id : user.data.googleId,
      bookId: book._id,
      createdAt: moment().format(),
    };
    const res = await commentsServices.createComment(commentsData);
    if (res.status === 200) {
      dispatch(addNewComment(res.data.data));
      setComments([...comments, res.data.data]);
      setComment("");
    }
  };

  const submitEditComment = async () => {
    const res = await commentsServices.editComment(editComment);
    if (res.status === 200) {
      handleClose();
      const updatedComments = comments.map((comment) => {
        if (comment._id === res.data.updatedComment._id) {
          return res.data.updatedComment;
        }
        return comment;
      });
      setComments([...updatedComments]);
      dispatch(addEditComment(res.data.updatedComment));
    }
  };

  const submitDeleteComment = async (_id) => {
    setDeleteAble(true);
    const res = await commentsServices.delete(_id);
    if (res.status === 200) {
      const filteredComments = comments.filter(
        (comment) => comment._id !== _id
      );
      setComments([...filteredComments]);
      dispatch(deleteComment(_id));
    }
  };

  return (
    <div>
      {user?.data?.name && (
        <div className={classes.commentsBox}>
          <Typography gutterBottom variant="h6">
            Write a comment
          </Typography>
          <TextField
            fullWidth
            rows={4}
            variant="outlined"
            label="Comment"
            multiline
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <div className={classes.buttonContainer}>
            <Button
              variant="contained"
              color="secondary"
              className={classes.marginal}
              disabled={!comment}
              onClick={() => setComment("")}
            >
              Clear
            </Button>
            <Button
              variant="contained"
              color="primary"
              className={classes.marginal}
              disabled={!comment}
              onClick={() => submitComment()}
            >
              Comment
            </Button>
          </div>
        </div>
      )}
      <div className={classes.commentsInnerContainer}>
        <Typography gutterBottom varaints="h6">
          Comments
        </Typography>
        <MUIList dense={false} className={classes.commentInnerContainer}>
          {comments &&
            comments.map((comment, index) => {
              return (
                <Slide
                  direction="up"
                  in
                  mountOnEnter
                  unmountOnExit
                  key={comment._id}
                >
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar className={classes.purple} alt={comment.name}>
                        {comment.name?.charAt(0)}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={comment.comment}
                      secondary={`commented by ${
                        comment.userId === user.data._id ? "You" : comment.name
                      } - Added ${moment(comment.createdAt).fromNow()}`}
                    />
                    {comment.userId === user.data._id && (
                      <ListItemSecondaryAction>
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          disabled={deleteAble}
                          className={classes.iconButton}
                          color="secondary"
                          onClick={() => submitDeleteComment(comment._id)}
                        >
                          <Delete />
                        </IconButton>
                        <IconButton
                          edge="end"
                          aria-label="edit"
                          className={classes.iconButton}
                          color="primary"
                          onClick={() => handleClickOpen(comment)}
                        >
                          <EditIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    )}
                  </ListItem>
                </Slide>
              );
            })}
        </MUIList>
        <Dialog
          open={open}
          className={classes.modal}
          TransitionComponent={Transition}
          keepMounted
          maxWidth="lg"
          onClose={handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogContent className={classes.modalPaper}>
            <DialogContentText id="alert-dialog-slide-description">
              <Typography gutterBottom variant="h6">
                Write a comment
              </Typography>
              <TextField
                fullWidth
                autoFocus
                rows={6}
                variant="outlined"
                name="comment"
                multiline
                value={editComment.comment}
                onChange={(e) => handleEditComment(e)}
              />
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              cancel
            </Button>
            <Button onClick={submitEditComment} color="primary">
              submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default Comments;
