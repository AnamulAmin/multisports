const PasswordInput = ({ labelKey, errorKey, ...rest }) => {
  return (
    <div className="flex flex-col">
      <label className="text-sm mb-1 font-medium">{labelKey}</label>
      <input type="password" className="border p-2 rounded" {...rest} />
      {errorKey && (
        <span className="text-red-500 text-xs mt-1">{errorKey}</span>
      )}
    </div>
  );
};

export default PasswordInput;
