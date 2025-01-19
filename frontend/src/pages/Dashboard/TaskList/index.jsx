import { useEffect, useState } from "react";

import classNames from "classnames";

import "./index.scss";
import TaskService from "../../../services/taskService";
import EditingTask from "../EditingTask";
import { toast } from "react-toastify";

const TaskList = ({ tasks, updateCallback, deleteCallback, projectId }) => {
   const [finishedTasks, setFinishedTasks] = useState([]);
   const [activeTasks, setActiveTasks] = useState([]);
   const [isEditingTask, setIsEditingTask] = useState({});

   const handleClick = async (event) => {
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
   };

   useEffect(() => {
      const finished = tasks.filter((task) => task.finishedAt);
      setFinishedTasks(finished);

      const actived = tasks.filter((task) => !task.finishedAt);
      setActiveTasks(actived);
   }, [tasks]);

   return (
      <>
         <h6 className="card-title">To Do</h6>
         <article className="active-tasks">
            {activeTasks &&
               activeTasks?.map((activeTask) => (
                  <div
                     key={activeTask.id}
                     className="task-container d-flex align-items-center justify-content-between"
                  >
                     {isEditingTask.taskId !== activeTask.id && (
                        <div className="form-check">
                           <div
                              className="task-container"
                              title={`Task ${activeTask.description}, created at ${activeTask.createdAt}`}
                           >
                              <input
                                 className="form-check-input"
                                 type="checkbox"
                                 onChange={handleClick}
                                 value={activeTask.id}
                                 id={`task-${activeTask.id}`}
                              />
                              <label
                                 className="form-check-label"
                                 htmlFor={`task-${activeTask.id}`}
                              >
                                 {activeTask.description}
                              </label>
                           </div>
                        </div>
                     )}

                     {isEditingTask.taskId === activeTask.id && (
                        <EditingTask
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
            {activeTasks.length === 0 && <small>No tasks</small>}
         </article>
         <h6 className="card-title mt-3">Done</h6>
         <article className="finished-tasks">
            {finishedTasks &&
               finishedTasks?.map((fininishedTask) => (
                  <div
                     key={fininishedTask.id}
                     className="form-check"
                     title={`Task ${fininishedTask.description}, created at ${fininishedTask.createdAt} and finished at ${fininishedTask.finishedAt}`}
                  >
                     <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id={`task-${fininishedTask.id}`}
                        checked
                        disabled
                     />
                     <label
                        className="form-check-label"
                        htmlFor="flexCheckChecked"
                     >
                        {fininishedTask.description}
                     </label>
                  </div>
               ))}

            {finishedTasks.length === 0 && <small>No tasks</small>}
         </article>
      </>
   );
};

export default TaskList;
