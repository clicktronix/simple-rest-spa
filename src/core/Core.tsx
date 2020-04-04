import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import * as modules from 'modules';
import { routes } from 'modules/routes';
import { App } from 'core/App';
import { AuthChecker } from 'modules/shared/AuthChecker/AuthChecker';

export const Core = () => (
  <BrowserRouter>
    <App>
      <AuthChecker>
        <Route path="/">
          <Switch>
            {Object.values(modules).map(x => x.getRoutes())}
            <Redirect to={routes.mainRoutes.MAIN} />
          </Switch>
        </Route>
      </AuthChecker>
    </App>
  </BrowserRouter>
);
