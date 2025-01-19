import { Card } from "../../../components";
import zodSchema, { zodResolver } from "../../../schema/zod";
import { useForm } from "react-hook-form";

import "./index.scss";
import { useContext } from "react";
import { DashboardContext } from "../../../context/DashboardContext";
import ProjectService from "../../../services/projectService";

const CreateProject = () => {
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
      const { project } = await ProjectService.create(data);

      setProjects((item) => {
         return [...item, { id: project._id, name: project.name }];
      });

      resetField("projectName");
      setFocus("projectName");
   });

   return (
      <Card>
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
      </Card>
   );
};

export default CreateProject;
