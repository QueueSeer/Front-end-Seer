const ButtonComponent = ({ label, onClick, className }) => (
    <button onClick={onClick} className={className}>
      {label}
    </button>
  );
  
  export default ButtonComponent;
  