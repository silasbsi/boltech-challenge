import { createContext, useEffect, useState } from "react";

import ProjectService from "../services/projectService";

export const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
   const [projects, setProjects] = useState([]);

   const setInitialState = async () => {
      const { projects } = await ProjectService.get();

      const dataProjects = projects.map((project) => {
         return {
            id: project._id,
            name: project.name,
            createdAt: project.createdAt,
         };
      });

      setProjects(dataProjects);
   };

   useEffect(() => {
      setInitialState();
   }, []);

   return (
      <DashboardContext.Provider value={[projects, setProjects]}>
         {children}
      </DashboardContext.Provider>
   );
};
