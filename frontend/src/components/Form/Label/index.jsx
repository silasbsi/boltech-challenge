import classNames from "classnames";
import RequiredField from "../RequiredField";

const Label = ({
   label = "",
   boldLabel = false,
   required = false,
   disabled = false,
   htmlFor = "",
   cssClass = "",
}) => (
   <label
      className={classNames(cssClass, {
         "d-none": label === "",
         "font-weight-bold": boldLabel,
      })}
      htmlFor={htmlFor}
   >
      {label} {required && !disabled && <RequiredField />}
   </label>
);

export default Label;
