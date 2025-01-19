import { useContext, useState, useEffect } from "react";

import { DashboardContext } from "../../../../context/DashboardContext";

import "./index.scss";
import Project from "..";

const List = () => {
   const [projects] = useContext(DashboardContext);

   const [projectList, setProjectList] = useState([]);

   useEffect(() => {
      const projectsSortedDescending = projects.sort((a, b) => {
         return new Date(b.createdAt) - new Date(a.createdAt);
      });

      setProjectList(projectsSortedDescending);
   }, [projects]);

   return (
      <div className="flex-wrap cards-container">
         {projectList &&
            projectList.map((project) => (
               <Project.Card
                  key={project.id}
                  title={project.name}
                  id={project.id}
               />
            ))}
         {projectList.length === 0 && <small>No projects</small>}
      </div>
   );
};

export default List;
