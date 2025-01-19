import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import PrivateRoute from "./PrivateRoute";

const Router = () => (
   <BrowserRouter>
      <Routes>
         <Route path="/" element={<Login />} />
         <Route path="/register" element={<Register />} />
         <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
         </Route>
         <Route path="*" element={<h1>Page not found!</h1>} />
      </Routes>
   </BrowserRouter>
);

export default Router;
