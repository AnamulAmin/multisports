import React from "react";

function MemberRegisterSelect({
  label,
  type,
  children,
  register,
  error,
  name,
  isRequired = false,
  onChange = () => {},
  ...res
}) {
  return (
    <div className={"w-[95%] flex flex-col space-y-2 pt-2"}>
      <label htmlFor={label} className="capitalize  text-[0.9rem]">
        {label}
      </label>
      <select
        type={type}
        id={label}
        className={`customInput select`}
        {...register(name, { required: isRequired, onChange: onChange })}
        {...res}
      >
        {children}
      </select>
      {error?.[name]?.message && (
        <p className="text-red-500 pt-2 pl-2">{error?.[name]?.message}</p>
      )}
    </div>
  );
}

export default MemberRegisterSelect;
