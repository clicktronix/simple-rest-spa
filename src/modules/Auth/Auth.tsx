import * as React from 'react';
import { Route } from 'react-router-dom';

import { Module } from 'shared/types/app';

import * as routes from './routes';
import { SignInLayout } from './view/SignInLayout/SignInLayout';
import { SignUpLayout } from './view/SignUpLayout/SignUpLayout';
import { UnauthorizedLayout } from './view/UnauthorizedLayout/UnauthorizedLayout';

export class AuthModule extends Module {
  public static getRoutes() {
    return [
      (
        <Route exact key={routes.SIGN_IN} path={routes.SIGN_IN} component={SignInLayout} />
      ),
      (
        <Route exact key={routes.SIGN_UP} path={routes.SIGN_UP} component={SignUpLayout} />
      ),
      (
        <Route exact key={routes.AUTH_ERROR} path={routes.AUTH_ERROR} component={UnauthorizedLayout} />
      ),
    ];
  }
}
