import React, { useState } from "react";

function MemberRegisterInput({
  label,
  type,
  readOnly,
  register,
  error,
  name,
  isRequired = true,
  onChange = { onChange: () => {} },
  ...res
}) {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };
  return (
    <div className={"w-[95%] flex flex-col space-y-1 md:space-y-2 pt-2 relative"}>
    <label htmlFor={label} className="capitalize text-[0.9rem]">
      {label}
    </label>
    <input
      type={isShowPassword ? "text" : type}
      id={label}
      className={`customInput ${
        readOnly && "cursor-not-allowed bg-[#eee]"
      }`}
      readOnly={readOnly}
      // Only spread the register function if the name is provided
      {...(name ? register(name, { required: isRequired, onChange }) : {})}
      {...res}
    />

    {error?.[name]?.message && (
      <p className="text-red-500 pt-2 pl-2">{error?.[name]?.message}</p>
    )}

    {
      type === "password" && (
        <div className="flex items-center justify-end absolute right-4 top-10">
          
          <button
            onClick={handleClickShowPassword}
            className="text-sm text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            {isShowPassword ? "Hide" : "Show"}
          </button>
        </div>
      )
    }

  </div>
  );
}

export default MemberRegisterInput;
