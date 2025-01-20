import { useContext, useState } from "react";
import ProjectService from "../../../../services/projectService";
import zodSchema, { zodResolver } from "../../../../schema/zod";
import { useForm } from "react-hook-form";
import { DashboardContext } from "../../../../context/DashboardContext";

import { toast } from "react-toastify";

import "./index.scss";

const Header = ({ title, projectId }) => {
   const [projects, setProjects] = useContext(DashboardContext);
   const [isEditingProject, setIsEditingProject] = useState(false);
   const [headerTitle, setHeaderTitle] = useState(title);

   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm({
      resolver: zodResolver(zodSchema.dashboard.projectHeader),
   });

   const onSubmit = handleSubmit(async () => {
      const payload = {
         projectTitle: headerTitle,
         projectId,
      };

      const response = await ProjectService.patch(payload);

      if (response.error) {
         return toast.error(response.error);
      }

      setIsEditingProject(false);

      const projectList = projects.map((project) => {
         if (project.id === projectId) {
            return {
               ...project,
               name: headerTitle,
            };
         }

         return project;
      });

      setProjects(projectList);

      toast.success("Title successfully updated!");
   });

   const handleProjectDelete = async () => {
      try {
         const confirmation = confirm(
            "Are you sure you want to remove this project?"
         );

         if (confirmation) {
            const response = await ProjectService.delete(projectId);

            if (response.error) {
               return toast.error(response.error);
            }

            const projectList = projects.filter(
               (project) => project.id !== response.projectId
            );

            setProjects(projectList);

            toast.success("Project successfully removed!");
         }
      } catch (error) {
         console.error(`Error: ${error}`);
      }
   };

   return (
      <>
         <form onSubmit={onSubmit}>
            <div className="card-header d-flex align-items-center justify-content-between">
               {!isEditingProject && (
                  <a
                     className="title-content"
                     onClick={() => setIsEditingProject(true)}
                  >
                     {headerTitle ? headerTitle : title}
                  </a>
               )}{" "}
               {isEditingProject && (
                  <input
                     {...register("projectTitle")}
                     className="form-control"
                     type="text"
                     placeholder="Task"
                     onBlur={() => setIsEditingProject(false)}
                     onChange={(event) => setHeaderTitle(event.target.value)}
                     value={headerTitle}
                     aria-label="Create a new task"
                  />
               )}
               <div className="d-flex flex-row ms-3">
                  <a onClick={() => setIsEditingProject(!isEditingProject)}>
                     <i className="bi bi-pencil"></i>
                  </a>
                  <a onClick={handleProjectDelete}>
                     <i className="bi bi-trash ms-3"></i>
                  </a>
               </div>
            </div>
         </form>
      </>
   );
};

export default Header;
