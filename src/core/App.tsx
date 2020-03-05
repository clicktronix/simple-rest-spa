import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import { Users, Main } from 'modules';
import { routes } from 'modules/routes';

export const App = () => (
  <BrowserRouter>
    <Route path="/">
      <Switch>
        <Route exact key={routes.userRoutes.USERS} path={routes.userRoutes.USERS} component={Users} />
        <Route key={routes.mainRoutes.MAIN} path={routes.mainRoutes.MAIN} component={Main} />
        <Redirect to={routes.mainRoutes.MAIN} />
      </Switch>
    </Route>
  </BrowserRouter>
);
