import Select from "react-select";

const ReactSelect = ({
  formatGroupLabel,
  options,
  onChange,
  selectOption,
  ...rest
}) => (
  <Select
    defaultValue={selectOption}
    options={options}
    value={selectOption}
    formatGroupLabel={formatGroupLabel}
    onChange={onChange}
    {...rest}
  />
);

export default ReactSelect;
