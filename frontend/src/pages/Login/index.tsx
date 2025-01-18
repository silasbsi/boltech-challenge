import { useEffect } from "react";
import "./index.scss";

import { useForm } from "react-hook-form";

import zodSchema, { zodResolver } from "../../common/schema/zod";
import { Link } from "react-router-dom";

type FormValues = {
   userEmail: string;
   userPassword: string;
};

const Login = () => {
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<FormValues>({ resolver: zodResolver(zodSchema.loginForm) });

   const onSubmit = handleSubmit((data) => console.log(data));

   useEffect(() => {
      console.log(errors);
   }, [errors]);
   return (
      <section className="login-section d-flex align-items-center justify-content-center">
         <div className="row login-container d-flex">
            <article className="col col-7 login-content d-flex flex-column align-items-center justify-content-center">
               <form className="w-50" onSubmit={onSubmit}>
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
                        aria-label="Fill your password"
                     />
                     {errors?.userPassword && (
                        <p>{errors.userPassword.message}</p>
                     )}
                  </div>
                  <div className="row">
                     <input
                        className="btn btn-primary w-100"
                        type="submit"
                        value="Submit"
                     ></input>
                  </div>
               </form>
            </article>
            <article className="col col-5 register-content d-flex flex-column align-items-center justify-content-center">
               <h2>Hello,</h2>
               <p>Enter your personal details</p>
               <Link to="/register" className="btn btn-outline-light">
                  Sign up
               </Link>
            </article>
         </div>
      </section>
   );
};

export default Login;
