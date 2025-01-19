import fetcher from "./fetcher";

const TaskService = {
   create: async (data) => {
      return await fetcher.post("tasks/create", data);
   },
   patch: async (payload) => {
      const { task } = await fetcher.patch("tasks/update", payload);

      return task;
   },
   get: async (projectId) => {
      const { tasks } = await fetcher.get(`tasks?projectId=${projectId}`);

      return tasks;
   },
   finish: async (payload) => {
      const { task } = await fetcher.patch("tasks/finish", payload);

      return task;
   },
   delete: async (payload) => {
      const { task } = await fetcher.delete("tasks/delete", payload);

      return task;
   },
};

export default TaskService;
