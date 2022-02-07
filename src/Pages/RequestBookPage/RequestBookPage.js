import { Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import Breadcums from '../../components/Breadcrums/breadcrums';
import RequestBookForm from '../../components/RequesBookForm/RequestBookForm';

const RequestBookPage = () => {
    const [currentId, setCurrentId] = useState(null);

    useEffect(() => {
      const user  = JSON.parse(localStorage.getItem('profile'));
      console.log(user);
      setCurrentId(user.data.email);
    }, []);
    const pathNames = [
        {
          name: 'Request a Book',
          to: '/home',
        },
      ]

  return <div>
      <Breadcums pathNames={pathNames} />
      <Grid container spacing={2}>
      <Grid item xs={false} sm={1} md={2} lg={2}></Grid>
      <Grid item xs={12} sm={10} md={8} lg={8}>
      <RequestBookForm currentId={currentId} setCurrentId={setCurrentId}/>
      </Grid>
      <Grid item xs={false} sm={1} md={2} lg={2}></Grid>
  </Grid>
  </div>;
};

export default RequestBookPage;
