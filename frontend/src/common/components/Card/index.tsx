import classNames from "classnames";
import "./index.scss";

type cardType = {
   children: JSX.Element;
};

const Card: React.FC<cardType> = ({ children }) => {
   return (
      <div
         className={classNames(
            "card-container d-flex align-items-center justify-content-center"
         )}
      >
         <div className="card text-center mb-3">
            <div className="card-body">{children}</div>
         </div>
      </div>
   );
};

export default Card;
