import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import { Users } from 'modules';

import { ROUTE_BASE } from './routes';

export const App = () => (
  <BrowserRouter>
    <Switch>
      <Route key={ROUTE_BASE} path={ROUTE_BASE} component={Users} />
      <Redirect to={ROUTE_BASE} />
    </Switch>
  </BrowserRouter>
);
