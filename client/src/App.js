import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { useMoralis } from "react-moralis";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";
import Roadmap from "./pages/Roadmap";
import { checkVaultIdAsync, checkVaultAsync } from "./pages/Wallet/state";

function App() {
  const dispatch = useDispatch();
  const { user } = useMoralis();
  const address = user?.get("ethAddress");
  const id = useSelector((state) => state.vault.id);

  useEffect(() => {
    if (!address) return;
    if (!id && address) {
      dispatch(checkVaultIdAsync(address));
    }

    if (id && address) {
      dispatch(checkVaultAsync(id));
    }
  }, [address, id, dispatch]);

  return (
    <Layout>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/road-map" component={Roadmap} />
        <Route path="/dashboard" component={Dashboard} />
      </Switch>
    </Layout>
  );
}

export default App;
