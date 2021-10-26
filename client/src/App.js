import { Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css'
import './App.css';
import Layout from './components/Layout';
import Home from './pages/Home'
import About from './pages/About'

function App() {
  return (
    <Layout>
      <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/about" component={About} />
    </Switch>
    </Layout>
  );
}

export default App;
