import { Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import Layout from './components/Layout';
import Home from './pages/Home'
import About from './pages/About'
import Dashboard from './pages/Dashboard';
import BackupAddress from './pages/BackupAddress';


function App() {
  return (
    <Layout>
      <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/about" component={About} />
      <Route exact path="/dashboard" component={Dashboard} />
      <Route exact path="/wallet" component={Dashboard} />
      <Route exact path="/inheritors" component={Dashboard} />
      <Route exact path="/ping" component={Dashboard} />
      <Route exact path="/backupaddress" component={BackupAddress} />
    </Switch>
    </Layout>
  );
}

export default App;
