import { Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import Layout from './components/Layout';
import Home from './pages/Home'
import About from './pages/About'
import Dashboard from './pages/Dashboard';
import BackupAddress from './pages/BackupAddress';
import Roadmap from './pages/Roadmap';


function App() {
  return (
    <Layout>
      <Switch>
      <Route exact path="/" component={Home} />
      <Route  path="/about" component={About} />
      <Route path="/road-map" component={Roadmap} />
      <Route  path="/dashboard" component={Dashboard} />
    </Switch>
    </Layout>
  );
}

export default App;
