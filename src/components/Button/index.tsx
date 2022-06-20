import "./Button.css";

interface ButtonProps {
  label: string;
  operation?: boolean;
  double?: boolean;
  triple?: boolean;
  click?: (args: string) => void;
}

const Button: React.FC<ButtonProps> = ({
  label,
  operation,
  double,
  triple,
  click,
}) => {
  return (
    <button
      onClick={() => click && click(label)}
      className={`
    button
    ${operation ? "operation" : ""}
    ${double ? "double" : ""}
    ${triple ? "triple" : ""}
  `}
    >
      {label}
    </button>
  );
};

export default Button;
