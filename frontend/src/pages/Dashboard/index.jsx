import { useEffect } from "react";
import { Navbar } from "../../components";
import { DashboardProvider } from "../../context/DashboardContext";
import CreateProject from "./CreateProject";
import ProjectList from "./ProjectList";

import "./index.scss";

const Dashboard = () => {
   return (
      <DashboardProvider>
         <section className="row header-container">
            <Navbar
               title="EDirectInsure TODO List"
               userName={localStorage.getItem("user-name")}
            />
         </section>
         <div className="container">
            <section className="row body-container">
               <div className="col col-12 col-xl-12 col-xxl-8 mt-5">
                  <ProjectList />
               </div>
               <div className="col col-12 col-xl-12 col-xxl-4 mt-5 card-section">
                  <CreateProject />
               </div>
            </section>
         </div>
      </DashboardProvider>
   );
};

export default Dashboard;
