import { ReactElement } from 'react';
import { RouteProps } from 'react-router';

export abstract class Module {
  public getRoutes?(): ReactElement<RouteProps> | Array<ReactElement<RouteProps>>;
}

export type AppData = {
  modules: Module[];
};
