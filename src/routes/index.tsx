import Login from 'pages/Login';
import { Switch } from 'react-router-dom';

import NotFound from '../pages/NotFound';
import Route from './Route';

const Routes = (): JSX.Element => (
  <Switch>
    <Route Component={Login} path="/" exact />

    <Route Component={NotFound} isPrivate />
  </Switch>
);

export default Routes;
