import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";

const Router = () => (
   <BrowserRouter>
      <Routes>
         <Route path="/" element={<Login />} />
         <Route path="/register" element={<Register />} />
      </Routes>
   </BrowserRouter>
);

export default Router;
