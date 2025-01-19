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
         const payload = {
            userEmail: response.user.email,
            userPassword: data.userPassword,
         };

         const authResponse = await UserService.authenticate(payload);

         if (authResponse.error) {
            return toast.error(authResponse.error);
         }

         toast.success("User successfully registered!");
         navigate("/dashboard");
      }
   });

   return (
      <section className="register-section ">
         <div className="row register-container d-flex">
            <article className="register-content">
               <h2>Register</h2>
               <form className="mt-3" onSubmit={onSubmit}>
                  <div className="mb-3 row">
                     <input
                        {...register("userName")}
                        type="text"
                        className="form-control"
                        id="userName"
                        placeholder="name"
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
                        placeholder="password"
                        aria-label="Fill your password"
                     />
                     {errors?.userPassword && (
                        <p>{errors.userPassword.message}</p>
                     )}
                  </div>
                  <div className="row">
                     <button
                        className="btn btn-outline-light w-100"
                        type="submit"
                     >
                        Create user
                     </button>
                  </div>
               </form>
            </article>
         </div>
      </section>
   );
};

export default Register;
