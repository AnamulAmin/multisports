import { useEffect, useState } from "react";

export default function InputSizeQuantity({
  setProductSizeValue,
  item,
  totalQuantity,
  setParentQuantity,
  setAllSizesQuantity,
  allSizesQuantity,
  isEditing = false,
  setEditingQuantity = () => {},
}) {
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    let itemsTotalQuantity = 0;
    setProductSizeValue((prev) => {
      const newArr = prev.map((item2) => {
        if (item2.value === item.value) {
          item2.quantity = quantity;
        }
        return item2;
      });

      itemsTotalQuantity = newArr.reduce((acc, curr) => {
        return Number(acc) + Number(curr.quantity);
      }, 0);
      return newArr;
    });

    !isEditing && setParentQuantity(itemsTotalQuantity);
    setAllSizesQuantity(itemsTotalQuantity);
    isEditing && setEditingQuantity(itemsTotalQuantity);
  }, [
    quantity,
    item,
    setProductSizeValue,
    totalQuantity,
    setParentQuantity,
    setAllSizesQuantity,
  ]);

  useEffect(() => {
    setQuantity(item?.quantity);
  }, [item]);
  return (
    <div className="flex gap-2 items-center">
      <button
        type="button"
        className="hover:bg-gray-300  outline outline-gray-300 w-5 h-5  rounded-full"
        onClick={() =>
          setQuantity((prev) => (Number(prev) > 0 ? Number(prev) - 1 : 0))
        }
      >
        -
      </button>
      <input
        type="text"
        name="size"
        className="w-10 border rounded p-1"
        min={0}
        value={quantity}
        onChange={(e) => {
          if (allSizesQuantity < totalQuantity) {
            setQuantity(e.target.value);
          }
        }}
      />
      <button
        type="button"
        className="hover:bg-gray-300  outline outline-gray-300 w-5 h-5  rounded-full"
        onClick={() => {
          if (allSizesQuantity < totalQuantity)
            setQuantity((prev) => Number(prev) + 1);
        }}
      >
        +
      </button>
    </div>
  );
}
