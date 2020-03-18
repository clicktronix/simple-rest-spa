import * as React from 'react';
import { Route } from 'react-router-dom';

import { Module } from 'shared/types/app';

import * as routes from './routes';
import { ProfileLayout } from './view/ProfileLayout';

export class ProfileModule extends Module {
  public static getRoutes() {
    return [(
      <Route exact key={routes.PROFILE} path={routes.PROFILE} component={ProfileLayout} />
    )];
  }
}
