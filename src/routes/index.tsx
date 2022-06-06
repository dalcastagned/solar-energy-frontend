import Dashboard from 'pages/Dashboard';
import ListGenerations from 'pages/ListGenerations';
import { Switch, useLocation } from 'react-router-dom';

import ListPlants from '../pages/ListPlants';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';
import ResetPassword from '../pages/ResetPassword';
import SignUp from '../pages/SignUp';
import LayoutRoute from './LayoutRoute';
import Route from './Route';

const Routes = (): JSX.Element => {
  const location = useLocation();

  return (
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

      <LayoutRoute
        Component={Dashboard}
        path="/dashboard"
        Title="Dashboard"
        exact
        isPrivate
      />

      <LayoutRoute
        Component={ListGenerations}
        path="/generations"
        Title={`Gerações da Unidade ${
          location.state?.plantName &&
          location.state?.plantName[0].toUpperCase() +
            location.state?.plantName.slice(1).toLowerCase()
        }`}
        exact
        isPrivate
      />
      <LayoutRoute
        Component={NotFound}
        Title="Página não encontrada"
        isPrivate
      />
    </Switch>
  );
};

export default Routes;
