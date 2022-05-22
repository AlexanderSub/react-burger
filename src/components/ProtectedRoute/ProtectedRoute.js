
import React from "react"
import { useSelector } from "react-redux"
import { Route, Navigate, useNavigate } from "react-router-dom"

const ProtectedRoute = ({children, ...rest}) => {
  const navigate = useNavigate()
  const isAuthorized = useSelector(state => state.auth.authorized)

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthorized ? (
          children
        ) : (
          navigate('/login')
        )
      }
    />
  );
}

export default ProtectedRoute