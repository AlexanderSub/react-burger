import React, { useState, useEffect } from "react"
import { Route, Redirect } from "react-router-dom"
import { useAuth } from '../../services/auth'

const ProtectedRoute = ({children, ...rest}) => {
  let { getUser, ...auth } = useAuth()
  const [ isUserLoaded, setUserLoaded ] = useState(false)

  const init = async () => {
    await getUser();
    setUserLoaded(true);
  };

  useEffect(() => {
    init();
  }, []);

  if (!isUserLoaded) {
    return null;
  }

  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

export default ProtectedRoute