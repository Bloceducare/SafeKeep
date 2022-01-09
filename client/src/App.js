import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { useMoralis } from "react-moralis";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";
import Roadmap from "./pages/Roadmap";
import { checkVaultAsync } from "./pages/Wallet/state";
import CreateVaultModal from "./pages/Wallet/Components/Deposit/CreateVault";
import { getUserAddress } from "./state/user";

function App() {
  const dispatch = useDispatch();
  const { user } = useMoralis();
  const address = user?.get("ethAddress");

  useEffect(() => {
    if (!address) return;
    dispatch(getUserAddress(address));
    localStorage.setItem("safekeepAddress", address);

    if (address) {
      dispatch(checkVaultAsync(address));
    }
  }, [address, dispatch]);

  return (
    <Layout>
      <CreateVaultModal />
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
