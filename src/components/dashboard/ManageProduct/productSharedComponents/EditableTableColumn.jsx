import { useEffect, useState } from "react";
import ReactSelect from "../../../UI/ReactSelect";
import { MdDeleteForever } from "react-icons/md";
import AddNewSizes from "./AddNewSizes";
import EditSizes from "./EditSizes";

export default function EditableTableColumn({
  productColors,
  setColorAndSize,
  productSizes,
  colorAndSize,
  totalQuantity,
  setTotalQuantity,
  stock,
  isEditState = false,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingColor, setEditingColor] = useState(null);
  const [editingSize, setEditingSize] = useState([]);
  const [editingQuantity, setEditingQuantity] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const [faceState, setFaceState] = useState("");
  const [isSizeFocus, setIsSizeFocus] = useState(false);
  const [allSizesQuantity, setAllSizesQuantity] = useState(0);

  const [productColorValue, setProductColorValue] = useState(null);
  const [productSizeValue, setProductSizeValue] = useState([]);

  const handleColorAndSize = () => {
    setColorAndSize((prev) => [
      ...prev,
      { color: productColorValue, size: productSizeValue, quantity: quantity },
    ]);

    setTotalQuantity((prev) => {
      const total = prev - quantity;

      return total;
    });

    setProductColorValue([]);
    setProductSizeValue([]);
    setQuantity(0);
  };

  const deleteSize = (index, stage) => {
    if (stage === "edit") {
      setEditingSize((prev) => {
        return prev.filter((item, i) => i !== index);
      });
    } else {
      setProductSizeValue((prev) => {
        return prev.filter((item, i) => i !== index);
      });
    }
  };

  const handleDeleteColorAndSize = (index) => {
    // Extract the quantity to be added back to `totalQuantity`
    const quantityToAddBack = colorAndSize[index].quantity;

    // Update the colorAndSize list by removing the selected item
    setColorAndSize((prev) => prev.filter((_, i) => i !== index));

    // Update totalQuantity by adding back the removed quantity
    setTotalQuantity(
      (prevQuantity) => prevQuantity + Number(quantityToAddBack)
    );
  };

  const handleUpdateColorAndSize = (index) => {
    setColorAndSize((prev) => {
      const newArr = [...prev];
      newArr[index].color = editingColor;
      newArr[index].size = editingSize;
      newArr[index].quantity = editingQuantity;

      const totalSizeQuantity = newArr.reduce((acc, curr) => {
        return Number(acc) + Number(curr.quantity);
      }, 0);

      setTotalQuantity(totalSizeQuantity);
      return newArr;
    });

    setEditingQuantity(0);
    setEditingColor(null);
    setEditingSize(null);
  };

  useEffect(() => {
    const total = colorAndSize.reduce(
      (acc, item) => acc + Number(item.quantity),
      0
    );
    if (isEditState) {
      setTotalQuantity(Number(stock) - total);
      // setAllSizesQuantity(Number(stock) - total);
    } else {
      if (colorAndSize.length > 0) {
        const total = colorAndSize.reduce(
          (acc, item) => acc + Number(item.quantity),
          0
        );
        setTotalQuantity(stock - total);
        // setTotalQuantity(stock);
      } else {
        setTotalQuantity(stock);
      }
    }
    // setTotalQuantity(total + Number(stock));
  }, [stock, setTotalQuantity, colorAndSize, editingSize]);

  const groupStyles = {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  };

  const groupBadgeStyles = {
    display: "inline-block",
    width: "1.5rem",
    height: "1.5rem",
    borderRadius: "9999px",
    backgroundColor: "#e2e8f0",
    color: "#3182ce",
    fontSize: "0.625rem",
    lineHeight: "1",
    textAlign: "center",
    whiteSpace: "nowrap",
  };

  useEffect(() => {
    let total = 0;

    if (colorAndSize.length > 0) {
      total = colorAndSize.reduce(
        (acc, item) => acc + Number(item.quantity),
        0
      );
    }
    setTotalQuantity((prev) => prev - total);
  }, []);

  return (
    <div className="w-full relative ">
      <div className=" border mb-4 rounded-xl bg-gray-50 min-h-[250px]">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>Sl</th>
              <th>Color</th>
              <th>Size</th>
              <th>Quantity (Remaining: {totalQuantity - quantity})</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {colorAndSize.map((item, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>
                  {isEditing && editingIndex === index ? (
                    <ReactSelect
                      options={productColors.map((item) => {
                        return {
                          value: item.productColor,
                          label: item.productColorName,
                        };
                      })}
                      formatGroupLabel={(data) => (
                        <div
                          style={groupStyles}
                          key={data.productColor}
                          onClick={() => {
                            setProductColorValue(data);
                          }}
                        >
                          <span>{data.productColorName} </span>
                          <span style={groupBadgeStyles}>
                            {data.options.length}
                          </span>
                        </div>
                      )}
                      selectOption={editingColor}
                      onChange={(e) => {
                        setEditingColor(e);
                      }}
                    />
                  ) : (
                    <div>
                      {item?.color?.label}{" "}
                      <span
                        className="inline-block w-3 h-3 rounded-full border border-gray-300"
                        style={{ backgroundColor: item?.color?.value }}
                      ></span>
                    </div>
                  )}
                </td>
                <td>
                  {isEditing && editingIndex === index ? (
                    <input
                      type="text"
                      className="customInput"
                      value={
                        editingSize?.length > 0
                          ? editingSize.map((item) => item.value).join(", ")
                          : ""
                      }
                      onFocus={() => {
                        setIsSizeFocus(true);
                        setFaceState("editing");
                      }}
                      placeholder="Enter Size"
                    />
                  ) : (
                    `${
                      item.size?.length > 0
                        ? item.size.map((item) => item?.label).join(", ")
                        : item.size[0]?.label
                    }`
                  )}
                </td>
                <td>
                  {isEditing && editingIndex === index ? (
                    <input
                      type="number"
                      defaultValue={item.quantity}
                      value={editingQuantity}
                      onChange={(e) => {
                        setEditingQuantity(e.target.value);
                        setTotalQuantity(
                          item?.quantity - Number(e.target.value)
                        );
                      }}
                      className="customInput"
                      // max={totalQuantity}
                      // min={0}
                      readOnly
                    />
                  ) : (
                    `${item.quantity}`
                  )}
                </td>
                <td className="space-x-2 flex ">
                  {isEditing && editingIndex === index ? (
                    <button
                      type="button"
                      className="py-1 px-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 hover:scale-110 transition-all duration-300 disabled:bg-gray-100 disabled:text-gray-500"
                      onClick={() => {
                        setIsEditing(false);
                        handleUpdateColorAndSize(index);
                      }}
                      disabled={
                        totalQuantity < 0 ||
                        editingColor === null ||
                        editingSize === null
                      }
                    >
                      Done
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="py-1 px-2 bg-green-500 text-white rounded-md hover:bg-yellow-600 hover:scale-110 transition-all duration-300 "
                      onClick={() => {
                        setIsEditing(true);
                        setEditingIndex(index);
                        setEditingColor(item.color);
                        setEditingSize(item.size);
                        setEditingQuantity(item.quantity);
                      }}
                    >
                      Edit
                    </button>
                  )}

                  <button
                    type="button"
                    className="p-1 bg-gray-200 rounded-md hover:bg-gray-300 hover:scale-110 transition-all duration-300"
                    onClick={() => handleDeleteColorAndSize(index)}
                  >
                    <MdDeleteForever size={18} />
                  </button>
                </td>
              </tr>
            ))}
            {totalQuantity > 0 && (
              <tr>
                <th></th>
                <td>
                  <ReactSelect
                    options={productColors.map((item) => {
                      return {
                        value: item.productColor,
                        label: item.productColorName,
                      };
                    })}
                    selectOption={productColorValue}
                    formatGroupLabel={(data) => (
                      <div
                        style={groupStyles}
                        key={data.productColor}
                        onClick={() => {
                          setProductColorValue(data);
                        }}
                      >
                        <span>{data.productColorName}</span>
                        <span style={groupBadgeStyles}>
                          {data.options.length}
                        </span>
                      </div>
                    )}
                    onChange={(e) => {
                      setProductColorValue(e);
                    }}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    className="customInput"
                    value={
                      productSizeValue?.length > 0
                        ? productSizeValue.map((item) => item.value).join(", ")
                        : ""
                    }
                    onFocus={() => {
                      setIsSizeFocus(true);
                      setFaceState("create");
                    }}
                    placeholder="Enter Size"
                    readOnly
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => {
                      if (e.target.value <= totalQuantity) {
                        setQuantity(e.target.value);
                      }
                    }}
                    className="customInput"
                    max={totalQuantity}
                    min={0}
                  />
                </td>
                <td className="space-x-2">
                  <button
                    type="button"
                    className="py-1 px-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 hover:scale-110 transition-all duration-300 disabled:bg-gray-100 disabled:text-gray-500"
                    onClick={handleColorAndSize}
                    disabled={
                      totalQuantity + 1 - Number(quantity) <= 0 ||
                      productColorValue === null ||
                      productSizeValue === null
                    }
                  >
                    Done
                  </button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div
        className={`absolute top-0 bottom-0 transition-all duration-300 ${
          isSizeFocus ? "right-0 w-full px-8" : "right-full w-0 px-0"
        } p-2 bg-white  pt-6 pb-2 overflow-auto`}
      >
        {faceState === "create" ? (
          <AddNewSizes
            {...{
              productSizes,
              productSizeValue,
              setProductSizeValue,
              deleteSize,
              groupBadgeStyles,
              groupStyles,
              setQuantity,
              totalQuantity,
              allSizesQuantity,
              setAllSizesQuantity,
            }}
          />
        ) : (
          <EditSizes
            {...{
              productSizes,
              editingSize,
              deleteSize,
              groupStyles,
              groupBadgeStyles,
              setEditingSize,
              totalQuantity,
              setAllSizesQuantity,
              allSizesQuantity,
              setEditingQuantity,
              setTotalQuantity,
              editingColor,
              colorAndSize,
              editingIndex,
              isSizeFocus,
              editingQuantity,
              isEditing,
              setColorAndSize,
              stock,
            }}
          />
        )}

        <button
          className="block btn ml-auto"
          onClick={() => {
            setIsSizeFocus(false);
            setFaceState("");
          }}
          type="button"
        >
          Close
        </button>
      </div>
    </div>
  );
}
