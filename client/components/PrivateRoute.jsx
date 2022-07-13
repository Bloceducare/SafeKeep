import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ auth, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (auth) return <Component {...props} />;
        if (!auth)
          return (
            <Redirect to={{ path: "/", state: { from: props.location } }} />
          );
      }}
    />
  );
};

export default ProtectedRoute;

// function PrivateRoute({ children, props, ...rest }) {
//    const {isAuthenticated} = useMoralis()
//    console.log(isAuthenticated)
//     return (
//       <Route
//         {...rest}
//         render={() => isAuthenticated
//           ? children
//           : <Redirect to="/" />
//         }
//       />
//     );
//   }

//   export default PrivateRoute
