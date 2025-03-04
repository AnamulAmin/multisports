import React from "react";
import Switch from "react-switch";
function SwitchInput({
  label,
  checked,
  setChecked,
  height = 20,
  width = 40,
  handleDiameter = 16,
  offColor = "#ccc",
  onColor = "#00b894",
  uncheckedIcon = false,
  checkedIcon = false,
  className = "",
}) {
  return (
    <div className={`mb-6 flex items-center ${className}`}>
      <label className="block text-gray-700 font-semibold mr-2">{label}</label>
      <Switch
        id="switch"
        checked={checked}
        onChange={setChecked}
        offColor={offColor}
        onColor={onColor}
        checkedIcon={checkedIcon}
        uncheckedIcon={uncheckedIcon}
        handleDiameter={handleDiameter}
        height={height}
        width={width}
      />
    </div>
  );
}

export default SwitchInput;
