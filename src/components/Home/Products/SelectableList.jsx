const SelectableList = ({
  items,
  labelKey,
  toggleSelection,
  selectedItems,
  slug,
  existingFilterItems,
}) => {
  return (
    <div className="space-y-4">
      {items.length == 0
        ? // Loading skeleton when items.length is 0
          Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="flex items-center space-x-4 animate-pulse"
            >
              <div className="w-5 h-5 bg-gray-200 rounded"></div>
              <div className="h-5 bg-gray-200 rounded-full w-2/3"></div>
            </div>
          ))
        : // Actual items when items.length > 0
          items.map((item, index) => (
            <label
              key={index}
              className="flex items-center cursor-pointer transition-colors group"
            >
              <input
                type="checkbox"
                className="peer hidden"
                checked={selectedItems?.includes(item[labelKey])}
                onChange={() => toggleSelection(item[labelKey], labelKey)}
              />
              <span className="w-5 h-5 border-2 border-gray-200 rounded mr-4 flex items-center justify-center peer-checked:bg-black peer-checked:border-black group-hover:border-gray-700 transition-all duration-300 delay-100">
                {selectedItems?.includes(item[labelKey]) && (
                  <svg className="w-4 h-4 text-white" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M9 16.2l-4.2-4.2-1.4 1.4 5.6 5.6 12-12-1.4-1.4z"
                    />
                  </svg>
                )}
              </span>
              <p className="transition-all text-sm duration-300 delay-100 capitalize flex justify-between items-center gap-5 w-full">
                {item[labelKey]?.includes("-")
                  ? item[labelKey]?.replaceAll("-", " ")
                  : item[labelKey]?.replaceAll("_", " ")}

                {labelKey == "colorLabel" || labelKey == "sizeValue" ? (
                  <></>
                ) : (
                  <span className="text-gray-500 font-bold text-[10px] border rounded-md w-8 h-8 items-center justify-center flex">
                    {" "}
                    {/* {item["productCount"]} */}
                    {labelKey == "brand" ? item["stock"] : item["productCount"]}
                  </span>
                )}
              </p>
            </label>
          ))}
    </div>
  );
};

export default SelectableList;
