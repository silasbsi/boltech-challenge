import { forwardRef } from "react";
import Label from "../Label";

const Input = forwardRef(
   (
      {
         comment = "",
         disabled = false,
         errors,
         id,
         label = "",
         boldLabel = false,
         onBlur,
         onChange,
         placeholder = "",
         register = () => {},
         required = false,
         type = "text",
         value,
         ...otherProps
      },
      ref
   ) => (
      <>
         <Label
            htmlFor={id}
            label={label}
            boldLabel={boldLabel}
            required={required}
            disabled={disabled}
         />

         <input
            className="form-control"
            disabled={disabled}
            id={id}
            placeholder={placeholder}
            type={type}
            value={value}
            ref={ref}
            {...otherProps}
            {...register(id, { onBlur, onChange, required })}
         />

         {comment && (
            <small id={id + "-comment"} className="form-text text-muted">
               {comment}
            </small>
         )}
      </>
   )
);

export default Input;
