import { useContext } from "react";
import { useForm } from "react-hook-form";

import { DashboardContext } from "../../../../context/DashboardContext";
import ProjectService from "../../../../services/projectService";

import zodSchema, { zodResolver } from "../../../../schema/zod";

import { toast } from "react-toastify";

import "./index.scss";

const Create = () => {
   const [, setProjects] = useContext(DashboardContext);
   const {
      register,
      resetField,
      setFocus,
      handleSubmit,
      formState: { errors },
   } = useForm({
      resolver: zodResolver(zodSchema.dashboard.createProject),
   });

   const onSubmit = handleSubmit(async (data) => {
      const response = await ProjectService.create(data);

      if (response.errors) {
         return toast.error(response.error);
      }

      const { project } = response;

      setProjects((item) => {
         return [
            ...item,
            {
               id: project._id,
               name: project.name,
               createdAt: project.createdAt,
            },
         ];
      });

      resetField("projectName");
      setFocus("projectName");

      toast.success("Project successfully created!");
   });

   return (
      <article className="create-project-article m-5">
         <form className="pt-2" onSubmit={onSubmit}>
            <h3>Create a new project</h3>
            <input
               {...register("projectName")}
               className="form-control mb-3"
               type="text"
               placeholder="Project name"
               aria-label="Create a new project"
            />
            {errors?.projectName && <p>{errors.projectName.message}</p>}
            <button type="submit" className="w-100 btn btn-primary">
               Create Project
            </button>
         </form>
      </article>
   );
};

export default Create;
