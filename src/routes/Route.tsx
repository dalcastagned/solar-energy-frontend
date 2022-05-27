import { ComponentType } from 'react';

import {
  Redirect,
  Route as ReactDOMRoute,
  RouteComponentProps,
  RouteProps as ReactDOMRouteProps,
} from 'react-router-dom';

import { useAuth } from '../hooks/auth';
import { checkRoles } from '../utils/check-roles';

export type RouteProps = {
  isPrivate?: boolean;
  Component: ComponentType<RouteComponentProps>;
  roles?: string[];
} & ReactDOMRouteProps;

const Route = ({
  isPrivate = false,
  Component,
  roles = [],
  ...props
}: RouteProps): JSX.Element => {
  const { user } = useAuth();

  const render = (params: RouteComponentProps): React.ReactNode => {
    const isAuthenticated = isPrivate === !!user;
    const userHasRequiredRole = user && checkRoles(roles);

    if (!isAuthenticated || (user && !userHasRequiredRole)) {
      return (
        <Redirect
          to={{
            pathname: '/',
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
