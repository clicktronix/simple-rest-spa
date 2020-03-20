import * as React from 'react';

import { Module } from 'shared/types/app';
import { PrivateRoute } from 'modules/shared/ProtectedRoute/ProtectedRoute';

import * as routes from './routes';
import { UsersLayout } from './view/UsersLayout';

export class UsersModule extends Module {
  public static getRoutes() {
    return [(
      <PrivateRoute exact key={routes.USERS} path={routes.USERS} component={UsersLayout} />
    )];
  }
}
