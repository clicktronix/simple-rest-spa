import * as React from 'react';
import { Route } from 'react-router-dom';

import { Module } from 'shared/types/app';

import * as routes from './routes';
import { MainLayout } from './view/MainLayout';

export class MainModule extends Module {
  public static getRoutes() {
    return [(
      <Route path={routes.MAIN} component={MainLayout} exact />
    )];
  }
}
