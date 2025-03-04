const ProductFilterGroup = ({ children, groupName }) => {
  let catalogName;

  if (groupName === "Brands") {
    catalogName = "Stock";
  } else if (groupName === "Colors") {
    catalogName = "";
  } else if (groupName === "Sizes") {
    catalogName = "";
  } else {
    catalogName = "Collection";
  }
  return (
    <div className="border-b pb-9 pt-3 transition-all duration-300 h-full max-h-[400px] overflow-auto">
      <p className="font-semibold text-lg mb-7 flex items-center gap-2 justify-between">
        {groupName} <b className="text-sm capitalize "><span className="font-semibold">{catalogName}</span></b>
      </p>
      <div className="">{children}</div>
    </div>
  );
};

export default ProductFilterGroup;
