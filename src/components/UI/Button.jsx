const Button = ({ children, loading, ...rest }) => {
  return (
    <button
      className={`bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-2 rounded ${
        rest.disabled && "opacity-50 cursor-not-allowed"
      }`}
      {...rest}
    >
      {loading ? "Loading..." : children}
    </button>
  );
};

export default Button;
