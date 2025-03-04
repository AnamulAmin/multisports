import { IoCloseCircleOutline } from "react-icons/io5";
import ReactSelect from "../../../UI/ReactSelect";
import { useEffect, useState } from "react";
import InputSizeQuantity from "./InputSizeQuantity";

export default function AddNewSizes({
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
}) {
  return (
    <div>
      <h3 className="text-2xl font-semibold mb-3">Add Size And Quantity</h3>
      <div className="flex gap-4">
        <div className="w-full">
          <ReactSelect
            options={productSizes.map((item) => {
              return {
                value: item.sizeName,
                label: item.sizeName,
              };
            })}
            selectOption={productSizeValue}
            formatGroupLabel={(data) => (
              <div
                style={groupStyles}
                key={data.sizeName}
                onClick={() => {
                  setProductSizeValue(data);
                }}
              >
                <span>{data.sizeName}</span>
                <span style={groupBadgeStyles}>{data.options.length}</span>
              </div>
            )}
            onChange={(data) => {
              setProductSizeValue((prev) => {
                data.quantity = 0;
                const allQuantityCount = prev.reduce((acc, curr) => {
                  return Number(acc) + Number(curr.quantity);
                }, 0);

                setAllSizesQuantity(allQuantityCount);
                return prev?.length > 0
                  ? Array.from(
                      new Set([...prev, data].map((obj) => JSON.stringify(obj)))
                    ).map((str) => JSON.parse(str))
                  : [data];
              });
            }}
            isDisabled={
              totalQuantity -
                productSizeValue?.reduce(
                  (acc, curr) => Number(acc) + Number(curr.quantity),
                  0
                ) ===
              0
            }
          />
        </div>
        <span className="text-xs text-gray-500 mt-2 border rounded-lg border-gray-300 px-2 py-1 text-center  flex gap-2 font-bold bg-green-300 h-full">
          {totalQuantity -
            productSizeValue?.reduce(
              (acc, curr) => Number(acc) + Number(curr.quantity),
              0
            ) || 0}
          <b>Left</b>
        </span>
      </div>

      <ul className="grid grid-cols-3 items-start gap-5 mt-3 h-[70px] ">
        {productSizeValue?.length > 0 &&
          productSizeValue.map((item, index) => (
            <li
              key={index}
              className="px-3 py-1 border border-black text-sm capitalize relative rounded-lg  flex justify-between items-center"
            >
              {item?.label}
              <InputSizeQuantity
                setProductSizeValue={setProductSizeValue}
                item={item}
                setParentQuantity={setQuantity}
                totalQuantity={totalQuantity}
                setAllSizesQuantity={setAllSizesQuantity}
                allSizesQuantity={allSizesQuantity}
              />
              <span
                className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 "
                onClick={() => deleteSize(index, "create")}
              >
                <IoCloseCircleOutline size={25} />
              </span>
            </li>
          ))}
      </ul>
    </div>
  );
}
