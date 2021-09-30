import './stylesheets/App.css';
import 'antd/dist/antd.css';
import routes from './routes/routes';
import { RouteWithSubRoutes } from './common/index';
import { Switch } from 'react-router-dom';
import { useEffect } from 'react';
import useAuth from 'customHooks/useAuth';
import NavBar from 'components/NavBar';
import Aos from 'aos';
import 'aos/dist/aos.css';
import FullScreenLoader from 'components/LoadingSpinner/LoadingSpinner';
function App() {
  const auth = useAuth();
  useEffect(() => {
    Aos.init();
    auth.setLoading(true);
    auth.getUser(() => {
      auth.setLoading(false);
    });
  }, []);
  return (
    <div className="App">
      <NavBar />
      <Switch>
        {routes.map((route, i) => (
          <RouteWithSubRoutes key={i} {...route} />
        ))}
      </Switch>
      <FullScreenLoader />
    </div>
  );
}

export default App;
