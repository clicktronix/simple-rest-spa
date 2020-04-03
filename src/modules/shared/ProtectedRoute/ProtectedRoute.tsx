import React, { useContext } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

import { routes } from 'modules/routes';
import { AuthContext } from 'services/auth';

export const PrivateRoute = ({ component, ...routeProps }: RouteProps) => {
  const auth = useContext(AuthContext);
  const Component = component !== undefined ? component : () => null;
  console.log(auth?.isLoading);

  const renderData = () => (
    <>
      {auth?.user
        ? (<Component />)
        : (<Redirect to={routes.authRoutes.AUTH_ERROR} />)}
    </>
  );

  const renderComponent = () => (
    <>
      {auth?.isLoading
        ? (<div>Loading</div>)
        : renderData()}
    </>
  );

  return <Route {...routeProps} render={renderComponent} />;
};
