import { message } from 'antd';
import useAuth from 'customHooks/useAuth';
import { Redirect, Route } from 'react-router-dom';

export const RouteWithSubRoutes = (route) => {
  return route.private ? (
    <PrivateRoute route={route} />
  ) : (
    <PublicRoute route={route} />
  );
};
const PrivateRoute = ({ route }) => {
  const auth = useAuth();
  return (
    <Route
      path={route.path}
      render={(props) =>
        auth.user ? (
          <route.component {...props} routes={route.routes} {...route} />
        ) : (
          <Redirect
            to={{
              pathname: '/'
            }}
          />
        )
      }
    />
  );
};
const PublicRoute = ({ route }) => {
  return (
    <Route
      path={route.path}
      render={(props) => (
        <route.component {...props} routes={route.routes} {...route} />
      )}
    />
  );
};
export const displayMsg = (res, onSuccess, onError) => {
  if (res.status > 400 && res.status < 500) {
    return message.error(res.data.msg);
  }
  if (!(res.status >= 200 && res.status < 300)) {
    !!onError && message.error(onError);
  } else {
    !!onSuccess && message.success(onSuccess);
  }
};

export const axiosCng = {
  validateStatus: function (status) {
    // Do not reject. We handle the errors gracefully
    return true;
  }
};
