import { useForm } from "react-hook-form";

import "./index.scss";

import { useEffect, useState } from "react";

import { toast } from "react-toastify";
import zodSchema, { zodResolver } from "../../../../schema/zod";

import Project from "..";
import TaskService from "../../../../services/taskService";
import Task from "../../Task";
import Form from "../../../../components/Form";

const Card = ({ title, id }) => {
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

      const response = await TaskService.create(payload);

      if (response.error) {
         return toast.error(response.error);
      }

      const { task } = response;

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

      toast.success("Task successfully created!");
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

   const otherProps = {
      errors,
      register,
   };

   useEffect(() => {
      fetchData();
   }, []);

   return (
      <div className="card card-content">
         <Project.Header title={title} projectId={id} />

         <div className="p-3">
            <div className="card-body">
               <Task.List
                  tasks={tasks}
                  updateCallback={updateCallback}
                  deleteCallback={deleteCallback}
                  projectId={id}
               />
            </div>
            <form onSubmit={onSubmit}>
               <div className="card-footer d-flex align-item-center justify-content-between">
                  <Form.Input
                     {...otherProps}
                     id="taskName"
                     label=""
                     placeholder="Task"
                     required
                     type="text"
                     aria-label="Create a new task"
                  />

                  <div className="ms-3">
                     <Form.Button
                        className="btn btn-success"
                        id={id}
                        title="Add task"
                        type="submit"
                     >
                        Add
                     </Form.Button>
                  </div>

                  {errors?.projectName && <p>{errors.projectName.message}</p>}
               </div>
            </form>
         </div>
      </div>
   );
};

export default Card;
