import React from 'react'
import { Redirect, Route } from 'react-router-dom'

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const isLoggedIn = localStorage.getItem('profile')
  return (
      <Route
      {...rest}
      render={props =>
        isLoggedIn ? (
            <>
            <Component {...props} />
            </>
        ) : (
          <Redirect to={{ pathname: '/', state: { from: props.location } }} />
        )
      }
    />
  )
}

export default ProtectedRoute;