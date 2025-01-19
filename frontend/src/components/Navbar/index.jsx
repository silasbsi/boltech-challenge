import { Navigate, useNavigate } from "react-router-dom";

const Navbar = ({ title, userName }) => {
   const navigate = useNavigate();

   const handleLogout = () => {
      localStorage.removeItem("app-token");
      localStorage.removeItem("user-name");

      navigate("/");
   };

   return (
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
         <div className="container px-4">
            <a className="navbar-brand" href="#">
               {title}
            </a>

            <div
               className="collapse navbar-collapse justify-content-end"
               id="navbarNavDropdown"
            >
               <ul className="navbar-nav">
                  <li className="nav-item dropdown">
                     <a
                        className="nav-link dropdown-toggle"
                        href="#"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                     >
                        {userName}
                     </a>
                     <ul className="dropdown-menu">
                        <li>
                           <a className="dropdown-item" onClick={handleLogout}>
                              Logout
                           </a>
                        </li>
                     </ul>
                  </li>
               </ul>
            </div>
         </div>
      </nav>
   );
};

export default Navbar;
