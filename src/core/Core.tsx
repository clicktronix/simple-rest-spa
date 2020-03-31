import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import * as modules from 'modules';
import { routes } from 'modules/routes';
import { App } from 'core/App';

export const Core = () => (
  <App>
    <BrowserRouter>
      <Route path="/">
        <Switch>
          {Object.values(modules).map(x => x.getRoutes())}
          <Redirect to={routes.mainRoutes.MAIN} />
        </Switch>
      </Route>
    </BrowserRouter>
  </App>
);
