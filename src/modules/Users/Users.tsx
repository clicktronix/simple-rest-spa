import * as React from 'react';
import { Route } from 'react-router-dom';

import { Module } from 'shared/types/app';

import * as routes from './routes';
import { UsersLayout } from './view/UsersLayout';

export class UsersModule extends Module {
  public static getRoutes() {
    return [(
      <Route exact key={routes.USERS} path={routes.USERS} component={UsersLayout} />
    )];
  }
}
