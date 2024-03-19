// import React from "react";
import { Routes, Route } from "react-router-dom";
import { AdminRoute, PublicRoute, wrapWithSuspense } from "./routes";
import PrivateRoute from "./routes/PrivateRoute";

function App(): JSX.Element {
  return (
    <Routes>
      {PublicRoute.map((r, index) => (
        <Route key={index} path={r.path} element={wrapWithSuspense(r.element,"client")} />
      ))}
      <Route element={<PrivateRoute />} >
        {AdminRoute.map((r, index) => (
          <Route  key={index} path={r.path} element={wrapWithSuspense(r.element,"admin")} />
        ))}

      </Route>
    </Routes>
  );
}
export default App;
