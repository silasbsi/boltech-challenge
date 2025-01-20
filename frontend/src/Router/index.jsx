import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import PrivateRoute from "./PrivateRoute";

const PageNotFound = () => (
   <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
   >
      <h1>Page not found!</h1>
   </div>
);

const Router = () => (
   <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<PrivateRoute />}>
         <Route path="/dashboard" element={<Dashboard />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
   </Routes>
);

export default Router;
