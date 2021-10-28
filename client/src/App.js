import { Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import Layout from './components/Layout';
import Home from './pages/Home'
import About from './pages/About'
import Roadmap from './pages/Roadmap';

function App() {
  return (
    <Layout>
      <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/about" component={About} />
      <Route exact path="/road-map" component={Roadmap} />
    </Switch>
    </Layout>
  );
}

export default App;
