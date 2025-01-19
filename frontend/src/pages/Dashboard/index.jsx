import { Navbar } from "../../components";
import { DashboardProvider } from "../../context/DashboardContext";

import "./index.scss";
import Project from "./Project";

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
                  <Project.List />
               </div>
               <div className="col col-12 col-xl-12 col-xxl-4 mt-5 card-section">
                  <Project.Create />
               </div>
            </section>
         </div>
      </DashboardProvider>
   );
};

export default Dashboard;
