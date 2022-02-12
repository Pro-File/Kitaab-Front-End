import { Grid } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import Loader from '../Loader/Loader'
import BookItem from './BookItem/BookItem';
import useStyles from './styles';
export const BooksList = () => {
    const {isLoading, value} = useSelector((state) => state.books)
    const classes = useStyles();
    return (
        <div>
       { isLoading ? <Grid container className={classes.mainContainer}>
           <Loader/> 
       </Grid> 
       : (
           <Grid className={classes.container} container alignItems="stretch" spacing={4}>
           {value.map((book) => (
               <Grid key={book._id} item xs={12} sm={6} md={4} lg={3}>
                         <BookItem book={book} />
                     </ Grid>
                )) }
                </Grid>
                )}
    </div>
    )
};
