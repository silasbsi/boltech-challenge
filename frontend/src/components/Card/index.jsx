import classNames from "classnames";
import "./index.scss";

const Card = ({ children }) => {
   return (
      <div className="card-container">
         <div className="card text-center mb-3">
            <div className="card-body">{children}</div>
         </div>
      </div>
   );
};

export default Card;
