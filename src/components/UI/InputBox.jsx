const Input = (
  {
    className = "block",
    labelKey,
    name,
    errorKey,
    placeholderKey,
    variant = "normal",
    shadow = false,
    type = "text",
    disableBorderRadius = false,
    inputClassName,
    ...rest
  },
  ref
) => {
  return (
    <div className={className}>
      {labelKey && (
        <label
          htmlFor={name}
          className="block text-gray-600 font-semibold text-sm leading-none mb-3 cursor-pointer"
        >
          {labelKey}
        </label>
      )}
      <input
        id={name}
        name={name}
        type={type}
        ref={ref}
        // @ts-ignore
        placeholder={placeholderKey}
        className={`normal ${!disableBorderRadius && " rounded-md"}`}
        autoComplete="off"
        spellCheck="false"
        aria-invalid={errorKey ? "true" : "false"}
        {...rest}
      />
      {errorKey && <p className="my-2 text-xs text-red-500">{errorKey}</p>}
    </div>
  );
};

export default Input;
