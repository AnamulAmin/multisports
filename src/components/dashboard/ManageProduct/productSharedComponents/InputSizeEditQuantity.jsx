import { useEffect, useState } from "react";

export default function InputSizeEditQuantity({
  setEditingSize,
  item,
  totalQuantity,
  setParentQuantity,
  setAllSizesQuantity,
  allSizesQuantity,
  editingQuantity,
  setEditingQuantity = () => {},
  editingSize,
  setTotalQuantity,
  stock,
}) {
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    // let itemsTotalQuantity = 0;
    // itemsTotalQuantity = editingSize.reduce((acc, curr) => {
    //   return Number(acc) + Number(curr.quantity);
    // }, 0);

    // // !isEditing && setParentQuantity(itemsTotalQuantity);
    // setAllSizesQuantity(Number(itemsTotalQuantity));
    // setEditingQuantity(itemsTotalQuantity + quantity);

    setEditingSize((prev) => {
      const newArr = prev.map((item2) => {
        if (item2.value === item.value) {
          item2.quantity = quantity;
        }
        return item2;
      });
      return newArr;
    });
  }, [quantity, item, setAllSizesQuantity, setEditingSize]);

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
          if (allSizesQuantity < stock) {
            setQuantity(e.target.value);
          }
        }}
      />
      <button
        type="button"
        className="hover:bg-gray-300  outline outline-gray-300 w-5 h-5  rounded-full"
        onClick={() => {
          if (allSizesQuantity < stock)
            setQuantity((prev) => {
              return Number(prev) + 1;
            });
        }}
        disabled={stock - allSizesQuantity === 0}
      >
        +
      </button>
    </div>
  );
}
