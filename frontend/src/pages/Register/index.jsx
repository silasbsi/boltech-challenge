import "./index.scss";

import { useForm } from "react-hook-form";

import zodSchema, { zodResolver } from "../../schema/zod";
import UserService from "../../services/userService";

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Register = () => {
   const navigate = useNavigate();

   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm({ resolver: zodResolver(zodSchema.registerForm) });

   const onSubmit = handleSubmit(async (data) => {
      const payload = {
         name: data.userName,
         email: data.userEmail,
         password: data.userPassword,
      };

      const response = await UserService.register(payload);

      if (response.error) {
         return toast.error(response.error);
      } else {
         toast.success("User successfully registered!");
         navigate("/dashboard");
      }
   });

   return (
      <section className="register-section d-flex align-items-center justify-content-center">
         <div className="row register-container d-flex">
            <article className="register-content d-flex flex-column align-items-center justify-content-center">
               <h2>Register</h2>
               <form className="w-50 mt-3" onSubmit={onSubmit}>
                  <div className="mb-3 row">
                     <input
                        {...register("userName")}
                        type="text"
                        className="form-control"
                        id="userName"
                        placeholder="Name"
                        aria-label="Fill your name"
                     />
                     {errors?.userName && <p>{errors.userName.message}</p>}
                  </div>
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
                        placeholder="Password"
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
         </div>
      </section>
   );
};

export default Register;
