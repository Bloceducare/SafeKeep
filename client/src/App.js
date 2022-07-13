import { Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import Home from "./pages/Home";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";
import Roadmap from "./pages/Roadmap";
import Footer from "./components/Footer";
import { AuthenticatedHea, UnAuthenticatedHeader } from "./components/Header";
import {useRouter}  from "next/router";
// import { useMoralis } from "react-moralis";
import Profile from "./components/Profile";
import { useAccount } from "wagmi";

const NotFound = () => {
  const router = useRouter()
  return (
    <div
      style={{
        height: "80vh",
        flexDirection: "column",
      }}
      className="d-flex justify-content-center align-items-center"
    >
      <h1>404 - Page Found</h1>
      <div>
        <button
          className="btn btn-large info btn-outline-light"
          onClick={() => router.push("/")}
        >
          {" "}
          Go Home{" "}
        </button>
      </div>
    </div>
  );
};

function App() {
  const { isConnected } = useAccount();
  return (
    <>
      {" "}
      {!isConnected ? <UnAuthenticatedHeader /> : <AuthenticatedHea />}
      <Profile />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/road-map" component={Roadmap} />
        <Route path="/dashboard" component={Dashboard} />
        <Route component={NotFound} />
      </Switch>
      <Footer />
    </>
  );
}

export default App;
