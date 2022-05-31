import Layout from '../pages/Layout';
import Route, { RouteProps } from './Route';

type LayoutRouteProps = {
  Title?: string;
} & RouteProps;

const LayoutRoute = ({
  Title,
  Component,
  ...props
}: LayoutRouteProps): JSX.Element => {
  return (
    <Layout Title={Title}>
      <Route Component={Component} {...props} />
    </Layout>
  );
};

export default LayoutRoute;
