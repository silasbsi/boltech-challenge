import { useContext, useState, useEffect } from "react";

import ProjectCard from "../ProjectCard";
import { DashboardContext } from "../../../context/DashboardContext";

import "./index.scss";

const ProjectList = () => {
   const [projects] = useContext(DashboardContext);

   const [projectList, setProjectList] = useState([]);

   useEffect(() => {
      setProjectList(projects);
   }, [projects]);

   return (
      <div className="flex-wrap cards-container">
         {projectList &&
            projectList.map((project) => (
               <ProjectCard
                  key={project.id}
                  title={project.name}
                  id={project.id}
               />
            ))}
      </div>
   );
};

export default ProjectList;
