const Button = ({
   children,
   disabled,
   onClick,
   type = "button",
   ...OtherProps
}) => (
   <button {...OtherProps} disabled={disabled} onClick={onClick} type={type}>
      {children}
   </button>
);

export default Button;
