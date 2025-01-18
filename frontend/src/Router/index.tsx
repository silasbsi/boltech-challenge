import { Routes, Route, HashRouter } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";

const Router = () => (
   <HashRouter>
      <Routes>
         <Route path="/" element={<Login />} />
         <Route path="/register" element={<Register />} />
      </Routes>
   </HashRouter>
);

export default Router;
