import { Switch } from 'react-router-dom';

import ListPlants from '../pages/ListPlants';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';
import ResetPassword from '../pages/ResetPassword';
import SignUp from '../pages/SignUp';
import LayoutRoute from './LayoutRoute';
import Route from './Route';

const Routes = (): JSX.Element => (
  <Switch>
    <Route Component={Login} path="/" exact />

    <Route Component={ResetPassword} path="/reset-password" exact />

    <Route Component={SignUp} path="/signup" exact />

    <LayoutRoute
      Component={ListPlants}
      path="/plants"
      Title="Lista de Unidades"
      exact
      isPrivate
    />

    <LayoutRoute Component={NotFound} Title="Página não encontrada" isPrivate />
  </Switch>
);

export default Routes;
