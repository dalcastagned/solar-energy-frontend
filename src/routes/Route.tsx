import { ComponentType } from 'react';

import {
  Redirect,
  Route as ReactDOMRoute,
  RouteComponentProps,
  RouteProps as ReactDOMRouteProps,
} from 'react-router-dom';
import { whereRedirect } from 'utils/tests/where-redirect';

import { useAuth } from '../hooks/auth';

export type RouteProps = {
  isPrivate?: boolean;
  Component: ComponentType<RouteComponentProps>;
  roles?: string[];
} & ReactDOMRouteProps;

const Route = ({
  isPrivate = false,
  Component,
  ...props
}: RouteProps): JSX.Element => {
  const { user } = useAuth();

  const render = (params: RouteComponentProps): React.ReactNode => {
    const isAuthenticated = isPrivate === !!user;

    if (!isAuthenticated) {
      return (
        <Redirect
          to={{
            pathname: whereRedirect(isPrivate),
            state: { from: params.location },
          }}
        />
      );
    }

    return <Component {...params} />;
  };

  return <ReactDOMRoute {...props} render={render} />;
};

export default Route;
