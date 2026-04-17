
function Button({ children, variant = "primary", type = "button" }) {
  return (
    <button 
      type={type}
      className={`hero-btn ${variant}`}
    >
      {children}
    </button>
  );
}
export default Button;