import React, { useContext } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

import { routes } from 'modules/routes';
import { AuthContext } from 'services/auth';

export const PrivateRoute = ({ component, ...routeProps }: RouteProps) => {
  const auth = useContext(AuthContext);
  const Component = component !== undefined ? component : () => null;

  const renderComponent = () => (
    <>
      {auth?.user
        ? (<Component />)
        : (<Redirect to={routes.authRoutes.AUTH_ERROR} />)}
    </>
  );

  return <Route {...routeProps} render={renderComponent} />;
};
