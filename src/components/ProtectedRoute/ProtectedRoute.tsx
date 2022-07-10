import { useSelector } from '../../services/hooks'
import { Route, Redirect, RouteProps } from "react-router-dom"
import { FC } from 'react';

const ProtectedRoute: FC<RouteProps> = ({children, ...rest}) => {
  const isAuthorized = useSelector(state => state.auth.authorized)

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthorized ? (
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