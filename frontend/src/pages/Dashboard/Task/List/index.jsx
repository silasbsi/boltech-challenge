import { useEffect, useState } from "react";

import TaskService from "../../../../services/taskService";
import Task from "..";

import { toast } from "react-toastify";

import "./index.scss";
import { Form, Loading } from "../../../../components";

const List = ({ tasks, updateCallback, deleteCallback, projectId }) => {
   const [finishedTasks, setFinishedTasks] = useState([]);
   const [activeTasks, setActiveTasks] = useState([]);
   const [isEditingTask, setIsEditingTask] = useState({});
   const [loading, setLoading] = useState(true);

   const handleClick = async (event) => {
      const confirmation = confirm(
         "Are you sure you want to finish this task?"
      );

      if (confirmation) {
         const taskId = event.target.value;

         const payload = {
            taskId,
            projectId,
         };

         const response = await TaskService.finish(payload);

         if (response.error) {
            return toast.error(response.error);
         }

         updateCallback(response);

         toast.success("Task successfully finished!");
      }
   };

   const handleUpdate = (taskId, response) => {
      if (response) {
         updateCallback(response);
      }

      if (isEditingTask?.taskId) {
         return setIsEditingTask({});
      }

      setIsEditingTask({
         taskId,
      });
   };

   const handleDelete = async (taskId, projectId) => {
      const confirmation = confirm(
         "Are you sure you want to remove this task?"
      );

      if (confirmation) {
         const payload = {
            taskId,
            projectId,
         };

         const response = await TaskService.delete(payload);

         if (response.error) {
            return toast.error(response.error);
         }

         deleteCallback(response);

         toast.success("Task successfully removed!");
      }
   };

   useEffect(() => {
      const finished = tasks.filter((task) => task.finishedAt);
      setFinishedTasks(finished);

      const actived = tasks.filter((task) => !task.finishedAt);
      setActiveTasks(actived);

      setTimeout(() => setLoading(false), 500);
   }, [tasks]);

   return (
      <>
         <h6 className="card-title">To Do</h6>
         <article className="active-tasks">
            {loading && <Loading size="sm" />}
            {activeTasks &&
               !loading &&
               activeTasks?.map((activeTask) => (
                  <div
                     key={activeTask.id}
                     className="task-container d-flex align-items-center justify-content-between"
                  >
                     {isEditingTask.taskId !== activeTask.id && (
                        <div className="form-check">
                           <div
                              className="task-container"
                              title={`Task ${
                                 activeTask.description
                              }, created at ${new Date(activeTask.createdAt)}`}
                           >
                              <Form.Checkbox
                                 className="form-check-input"
                                 id={`task-${activeTask.id}`}
                                 label={activeTask.description}
                                 onChange={handleClick}
                                 value={activeTask.id}
                              />
                           </div>
                        </div>
                     )}

                     {isEditingTask.taskId === activeTask.id && (
                        <Task.Edit
                           task={activeTask}
                           handleUpdate={handleUpdate}
                        />
                     )}
                     {isEditingTask.taskId !== activeTask.id && (
                        <div className="buttons-container ms-3 d-flex">
                           <div
                              className="edit-button"
                              onClick={() => handleUpdate(activeTask.id)}
                           >
                              <i className="bi bi-pencil" title="Task edit"></i>
                           </div>
                           <div
                              className="delete-button"
                              onClick={() =>
                                 handleDelete(
                                    activeTask.id,
                                    activeTask.projectId
                                 )
                              }
                           >
                              <i
                                 className="bi bi-trash ms-3"
                                 title="Task delete"
                              ></i>
                           </div>
                        </div>
                     )}
                  </div>
               ))}
            {activeTasks.length === 0 && !loading && <small>No tasks</small>}
         </article>
         <h6 className="card-title mt-3">Done</h6>
         <article className="finished-tasks">
            {loading && <Loading />}
            {finishedTasks &&
               !loading &&
               finishedTasks?.map((fininishedTask) => (
                  <div
                     key={fininishedTask.id}
                     className="form-check"
                     title={`Task ${
                        fininishedTask.description
                     }, created at ${new Date(
                        fininishedTask.createdAt
                     )} and finished at ${new Date(fininishedTask.finishedAt)}`}
                  >
                     <Form.Checkbox
                        className="form-check-input"
                        id={`task-${fininishedTask.id}`}
                        label={fininishedTask.description}
                        checked
                        disabled
                     />
                  </div>
               ))}

            {finishedTasks.length === 0 && !loading && <small>No tasks</small>}
         </article>
      </>
   );
};

export default List;
