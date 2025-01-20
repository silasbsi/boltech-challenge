import "./index.scss";

import { useForm } from "react-hook-form";

import zodSchema, { zodResolver } from "../../schema/zod";
import UserService from "../../services/userService";

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Form from "../../components/Form";

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

         setTimeout(() => {
            navigate("/dashboard");
         }, 1000);
      }
   });

   const otherProps = {
      errors,
      register,
   };

   return (
      <section className="register-section ">
         <div className="row register-container d-flex">
            <article className="register-content">
               <h2>Register</h2>
               <form className="mt-3" onSubmit={onSubmit}>
                  <div className="mb-3 row">
                     <Form.Input
                        {...otherProps}
                        id="userName"
                        label=""
                        placeholder="name"
                        required
                        type="text"
                        aria-label="Fill your name"
                     />
                  </div>
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
                        aria-label="Fill your password"
                     />
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
