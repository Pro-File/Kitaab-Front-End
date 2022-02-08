import { Container, Grid, Grow } from '@material-ui/core';
import React, {useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { BooksList } from '../../components/BooksList/BooksList';
import RequestBookBanner from '../../components/RequestBookBanner/RequestBookBanner';
import { getAllBooks } from '../../redux/slices/books';
import booksServices from '../../services/books/booksServices';

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    getData()
  }, []);

  const getData = async() => {
    const res = await booksServices.getBooks();
    if(res.status === 200){
      dispatch(getAllBooks(res.data))
    }
  }
  
  return <Grow in>
  
     
            {/* <h1>Display Posts</h1> */}
          <div>
          <BooksList/>
            <RequestBookBanner/>
          </div>
          {/* <Posts setCurrentId-{setCurrentId} /> */}
        {/* <Grid item xs={12} sm={4}>
            <h1>Display Form</h1>
       </ Grid> */}

  </ Grow>
};

export default Home;
