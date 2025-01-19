import fetcher from "./fetcher";

const ProjectService = {
   create: async (data) => {
      return await fetcher.post("projects/create", {
         name: data.projectName,
      });
   },
   patch: async (payload) => {
      return await fetcher.patch("projects/update", payload);
   },
   get: () => {},
   delete: async (projectId) => {
      return await fetcher.delete("projects/delete", {
         projectId,
      });
   },
};

export default ProjectService;
