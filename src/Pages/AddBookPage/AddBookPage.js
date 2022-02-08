import { Grid } from '@material-ui/core';
import React, {useState, useEffect} from 'react';
import AddBookForm from '../../components/AddBookForm/AddBookForm';
import Breadcums from '../../components/Breadcrums/breadcrums';

const AddBookPage = () => {
  const [currentId, setCurrentId] = useState(null);

  useEffect(() => {
    const user  = JSON.parse(localStorage.getItem('profile'));
    setCurrentId(user.data.email);
  }, []);

  const pathNames = [
    {
      name: 'Add New Book',
      to: '/home',
    },
  ]

  
  return <>
  <Breadcums pathNames={pathNames}/>
  <Grid container spacing={2}>

      <Grid item xs={0} sm={1} md={2} lg={2}></Grid>
      <Grid item xs={12} sm={10} md={8} lg={8}>
      <AddBookForm currentId={currentId} setCurrentId={setCurrentId}/>
      </Grid>
      <Grid item xs={0} sm={1} md={2} lg={2}></Grid>
  </Grid>
  </>
};

export default AddBookPage;
