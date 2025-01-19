import { useEffect, useState } from "react";

import "./index.scss";
import TaskService from "../../../services/taskService";

const TaskList = ({ tasks, updateCallback, deleteCallback, projectId }) => {
   const [finishedTasks, setFinishedTasks] = useState([]);
   const [activeTasks, setActiveTasks] = useState([]);

   const handleClick = async (event) => {
      const taskId = event.target.value;

      const payload = {
         taskId,
         projectId,
      };

      const task = await TaskService.finish(payload);

      updateCallback(task);
   };

   const handleDelete = async (taskId, projectId) => {
      const payload = {
         taskId,
         projectId,
      };

      const task = await TaskService.delete(payload);

      deleteCallback(task);
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
                     className="form-check d-flex "
                     title={`Task ${activeTask.description}, created at ${activeTask.createdAt}`}
                  >
                     <div className="task-container">
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
                     <div
                        className="trash-container"
                        onClick={() =>
                           handleDelete(activeTask.id, activeTask.projectId)
                        }
                     >
                        <i className="bi bi-trash"></i>
                     </div>
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
