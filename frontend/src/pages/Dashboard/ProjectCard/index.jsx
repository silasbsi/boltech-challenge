import zodSchema, { zodResolver } from "../../../schema/zod";
import { useForm } from "react-hook-form";

import "./index.scss";

import "./index.scss";
import TaskService from "../../../services/taskService";
import { useEffect, useState } from "react";

import ProjectHeader from "../ProjectHeader";
import TaskList from "../TaskList";

const ProjectCard = ({ title, id }) => {
   const [tasks, setTasks] = useState([]);

   const {
      register,
      resetField,
      setFocus,
      handleSubmit,
      formState: { errors },
   } = useForm({
      resolver: zodResolver(zodSchema.dashboard.createTask),
   });

   const onSubmit = handleSubmit(async (data) => {
      const payload = {
         description: data.taskName,
         projectId: id,
      };

      const { task } = await TaskService.create(payload);

      setTasks((item) => {
         return [
            ...item,
            {
               id: task._id,
               description: task.description,
               projectId: task.projectId,
               createdAt: task.createdAt,
               finishedAt: task.finishedAt,
            },
         ];
      });

      resetField("taskName");
      setFocus("taskName");
   });

   const updateCallback = (data) => {
      const newList = tasks.map((task) => {
         if (task.id === data._id) {
            return {
               id: data._id,
               description: data.description,
               projectId: data.projectId,
               createdAt: task.createdAt,
               finishedAt: data.finishedAt,
            };
         }

         return task;
      });

      setTasks(newList);
   };

   const deleteCallback = (data) => {
      const newList = tasks.filter((task) => task.id !== data._id);

      setTasks(newList);
   };

   const fetchData = async () => {
      const tasks = await TaskService.get(id);

      const taskList = tasks.map((task) => {
         return {
            id: task._id,
            description: task.description,
            projectId: task.projectId,
            createdAt: task.createdAt,
            finishedAt: task.finishedAt,
         };
      });

      setTasks(taskList);
   };

   useEffect(() => {
      fetchData();
   }, []);

   return (
      <div className="card card-content">
         <ProjectHeader title={title} projectId={id} />

         <div className="card-body">
            <TaskList
               tasks={tasks}
               updateCallback={updateCallback}
               deleteCallback={deleteCallback}
               projectId={id}
            />
         </div>
         <form onSubmit={onSubmit}>
            <div className="card-footer d-flex align-item-center justify-content-between">
               <div className="w-100">
                  <input
                     {...register("taskName")}
                     className="form-control"
                     type="text"
                     placeholder="Task"
                     aria-label="Create a new task"
                  />
               </div>
               <div className="w-25 ms-3">
                  <button type="submit" className="btn btn-success">
                     Add
                  </button>
               </div>

               {errors?.projectName && <p>{errors.projectName.message}</p>}
            </div>
         </form>
      </div>
   );
};

export default ProjectCard;
