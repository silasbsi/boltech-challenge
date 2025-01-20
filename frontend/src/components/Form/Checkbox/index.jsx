import Label from "../Label";

const Checkbox = ({
   id,
   label,
   boldLabel = false,
   disabled = false,
   register = () => {},
   ...otherProps
}) => {
   return (
      <div className="d-flex align-items-baseline">
         <input
            className="form-check-input"
            disabled={disabled}
            id={id}
            type="checkbox"
            {...otherProps}
            {...register(id)}
         />

         <Label
            boldLabel={boldLabel}
            disabled={disabled}
            htmlFor={id}
            label={label}
            cssClass="ms-2 d-flex align-self-center form-check-label"
         />
      </div>
   );
};

export default Checkbox;
