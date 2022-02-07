import React from "react";
import NavBar from "./components/NavBar/NavBar";
import AddBookPage from "./Pages/AddBookPage/AddBookPage";
import {Switch, Route} from 'react-router-dom';
import Home from "./Pages/Home/Home";
import { Container } from "@material-ui/core";
import AuthenticationPage from "./Pages/AuthenticationPage/AuthenticationPage";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import BookDetailsPage from "./Pages/BookDetailsPage/BookDetailsPage";
import RequestBookPage from "./Pages/RequestBookPage/RequestBookPage";

function App() {

  return (
    <Container maxWidth="lg">
          <NavBar/>
      <Switch>
          <PublicRoute path="/" exact component={AuthenticationPage}/>   
          <ProtectedRoute path="/home" exact component={Home}/>
          <ProtectedRoute path="/requestBook" exact component={RequestBookPage}/>     
          <ProtectedRoute path="/addBook" exact component={AddBookPage}/>
          <ProtectedRoute path="/books/:id" exact component={BookDetailsPage}/>
      </Switch>
    </Container>
  );
}

export default App;
