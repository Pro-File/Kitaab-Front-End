import React from 'react'
import { Redirect, Route } from 'react-router-dom'

const PublicRoute = ({ component: Component, ...rest }) => {

  // Add your own authentication on the below line.
  const isLoggedIn = localStorage.getItem('profile')
  return (
      <Route
      {...rest}
      render={props =>
        isLoggedIn ? (
            <>
            <Redirect to={{ pathname: '/home', state: { from: props.location } }} />
            {console.log(props.location)}
            </>
        ) : (
            <Component {...props} />
            )
      }
    />
  )
}

export default PublicRoute;