import { useEffect } from "react";

import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import zodSchema, { zodResolver } from "../../schema/zod";

import UserService from "../../services/userService";
import Form from "../../components/Form";

import { toast } from "react-toastify";

import "./index.scss";

const Login = () => {
   const navigate = useNavigate();

   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm({ resolver: zodResolver(zodSchema.loginForm) });

   const onSubmit = handleSubmit(async (data) => {
      const response = await UserService.authenticate(data);

      if (response.error) {
         return toast.error(response.error);
      }

      setTimeout(() => {
         navigate("/dashboard");
      }, 1000);
   });

   const otherProps = {
      errors,
      register,
   };

   useEffect(() => {
      const isAuthenticated = localStorage.getItem("app-token");

      if (isAuthenticated) {
         navigate("/dashboard");
      }
   }, []);

   return (
      <section className="login-section">
         <div className="row login-container">
            <article className="col col-12 col-xl-7 login-content">
               <form onSubmit={onSubmit}>
                  <h2>Sign in</h2>
                  <div className="mb-3 row">
                     <Form.Input
                        {...otherProps}
                        id="userEmail"
                        label=""
                        placeholder="name@example.com"
                        required
                        type="email"
                        aria-label="Fill your email"
                     />
                  </div>
                  <div className="mb-3 row">
                     <Form.Input
                        {...otherProps}
                        id="userPassword"
                        label=""
                        placeholder="password"
                        required
                        type="password"
                        aria-label="Fill your email"
                     />
                  </div>
                  <div className="row">
                     <Form.Button
                        className="btn btn-primary w-100"
                        title="Login"
                        type="submit"
                     >
                        Login
                     </Form.Button>
                  </div>
               </form>
            </article>
            <article className="col col-12 col-xl-5 register-content">
               <h2>Hello,</h2>
               <p>Enter your personal details</p>
               <Link to="/register" className="btn btn-outline-light mt-2">
                  Sign up
               </Link>
            </article>
         </div>
      </section>
   );
};

export default Login;
