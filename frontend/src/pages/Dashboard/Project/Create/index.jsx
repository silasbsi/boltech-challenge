import { useContext } from "react";
import { useForm } from "react-hook-form";

import { DashboardContext } from "../../../../context/DashboardContext";
import ProjectService from "../../../../services/projectService";

import zodSchema, { zodResolver } from "../../../../schema/zod";

import { toast } from "react-toastify";

import "./index.scss";
import Form from "../../../../components/Form";

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

   const otherProps = {
      errors,
      register,
   };

   return (
      <article className="create-project-article m-5">
         <form className="pt-2" onSubmit={onSubmit}>
            <h3>Create a new project</h3>
            <Form.Input
               {...otherProps}
               id="projectName"
               label=""
               required
               placeholder="Project name"
               type="text"
               aria-label="Create a new project"
            />
            <Form.Button
               className="w-100 btn btn-primary mt-3"
               title="Create Project"
               type="submit"
            >
               Create Project
            </Form.Button>
         </form>
      </article>
   );
};

export default Create;
