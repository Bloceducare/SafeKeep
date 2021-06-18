import { BrowserRouter as Router, Route, Switch, useLocation } from 'react-router-dom';
import Nav from './component/Nav';
import Index from './component/index';
import './App.css';
import fitext from 'fitext'

// import ProtectedRoute from './components/ProtectedRoute';

function AppContainer() {
  const location = useLocation();
  const NoAuthRoutes = ['/dashboard', '/admin']

  fitext(true);

  return (
    <>
      {!NoAuthRoutes.includes(location.pathname) ? <Nav /> : ''}
      <Switch>
      <Route path="/" exact component={Index} />
      </Switch>
    </>
  );
}

function App() {
  return (
    <div className="app-container">
      <Router>
        <AppContainer />
      </Router>
    </div>
  );
}

export default App;
