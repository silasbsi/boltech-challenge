import { createContext, useEffect, useState } from "react";

import fetcher from "../services/fetcher";

export const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
   const [projects, setProjects] = useState([]);

   const setInitialState = async () => {
      const { projects } = await fetcher.get("projects");

      const dataProjects = projects.map((project) => {
         return {
            id: project._id,
            name: project.name,
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
