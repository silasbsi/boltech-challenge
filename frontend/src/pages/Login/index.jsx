import { useEffect } from "react";
import "./index.scss";

import { useForm } from "react-hook-form";

import zodSchema, { zodResolver } from "../../schema/zod";
import { Link, Navigate, useNavigate } from "react-router-dom";
import fetcher from "../../services/fetcher";
import UserService from "../../services/userService";
import { toast } from "react-toastify";

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

      navigate("/dashboard");
   });

   useEffect(() => {
      const isAuthenticated = localStorage.getItem("app-token");
      if (isAuthenticated) {
         navigate("/dashboard", { replace: true });
      }
   }, [navigate]);

   return (
      <section className="login-section">
         <div className="row login-container">
            <article className="col col-12 col-xl-7 login-content">
               <form onSubmit={onSubmit}>
                  <h2>Sign in</h2>
                  <div className="mb-3 row">
                     <input
                        {...register("userEmail")}
                        type="email"
                        className="form-control"
                        id="userEmail"
                        placeholder="name@example.com"
                        aria-label="Fill your email"
                     />
                     {errors?.userEmail && <p>{errors.userEmail.message}</p>}
                  </div>
                  <div className="mb-3 row">
                     <input
                        {...register("userPassword")}
                        type="password"
                        id="userPassword"
                        className="form-control"
                        placeholder="password"
                        aria-label="Fill your password"
                     />
                     {errors?.userPassword && (
                        <p>{errors.userPassword.message}</p>
                     )}
                  </div>
                  <div className="row">
                     <button className="btn btn-primary w-100" type="submit">
                        Login
                     </button>
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
