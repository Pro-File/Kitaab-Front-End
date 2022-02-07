import React from 'react'
import { Redirect, Route } from 'react-router-dom'

const ProtectedRoute = ({ component: Component, ...rest }) => {

  // Add your own authentication on the below line.
  const isLoggedIn = localStorage.getItem('profile')
  return (
      <Route
      {...rest}
      render={props =>
        isLoggedIn ? (
            <>
            <Component {...props} />
            {console.log(props.location)}
            </>
        ) : (
          <Redirect to={{ pathname: '/', state: { from: props.location } }} />
        )
      }
    />
  )
}

export default ProtectedRoute;