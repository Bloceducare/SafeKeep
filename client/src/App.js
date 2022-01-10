import { Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import Home from "./pages/Home";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";
import Roadmap from "./pages/Roadmap";
import Footer from "./components/Footer";
import { UnAuthenticatedHeader } from "./components/Header";

const MainPages = () => {
  return (
    <>
      <UnAuthenticatedHeader />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/road-map" component={Roadmap} />
      </Switch>
    </>
  );
};

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/" component={MainPages} />
        <Route path="/dashboard" component={Dashboard} />
      </Switch>
      <Footer />
    </>
  );
}

export default App;
