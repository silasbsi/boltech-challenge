import { useForm } from "react-hook-form";
import zodSchema, { zodResolver } from "../../../../schema/zod";
import { useState } from "react";
import TaskService from "../../../../services/taskService";
import { toast } from "react-toastify";
import Form from "../../../../components/Form";

const Edit = ({ task, handleUpdate }) => {
   const [taskDescription, setTaskDescription] = useState(task.description);
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm({
      resolver: zodResolver(zodSchema.dashboard.taskList),
   });

   const onSubmit = handleSubmit(async () => {
      const payload = {
         description: taskDescription,
         projectId: task.projectId,
         taskId: task.id,
      };

      const response = await TaskService.patch(payload);

      if (response.error) {
         return toast.error(response.error);
      }

      handleUpdate(task.id, response);

      toast.success("Task successfully updated!");
   });

   const otherProps = {
      errors,
      register,
   };

   return (
      <form className="w-100 py-1 " onSubmit={onSubmit}>
         <Form.Input
            {...otherProps}
            id="taskDescription"
            label=""
            className="form-control form-control-sm"
            placeholder="Task"
            required
            autoFocus={true}
            onBlur={() => handleUpdate(task.id, false)}
            onChange={(event) => setTaskDescription(event.target.value)}
            value={taskDescription}
            type="text"
            aria-label="Edit task description"
         />
      </form>
   );
};

export default Edit;
