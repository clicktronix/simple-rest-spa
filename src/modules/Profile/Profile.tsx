import * as React from 'react';

import { Module } from 'shared/types/app';
import { PrivateRoute } from 'modules/shared/ProtectedRoute/ProtectedRoute';

import * as routes from './routes';
import { ProfileLayout } from './view/ProfileLayout';

export class ProfileModule extends Module {
  public static getRoutes() {
    return [(
      <PrivateRoute path={`${routes.PROFILE}/:userId`} component={ProfileLayout} exact />
    )];
  }
}
