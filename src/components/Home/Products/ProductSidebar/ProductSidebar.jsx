import ActiveLink from "@/shared/ActiveLink";
import FilterRadioInput from "@/shared/FilterRadioInput";
import GroupLink from "@/shared/GroupLink";
import useGetAllProductBrands from "../../../Hook/GetDataHook/useGetAllProductBrands";
import useGetAllProductColors from "../../../Hook/GetDataHook/useGetAllProductColors";
import useGetAllProductSizes from "../../../Hook/GetDataHook/useGetAllProductSizes";
import useGetAllSubCategories from "../../../Hook/GetDataHook/useGetAllSubCategories";
import React, { useState } from "react";
import { FaUser } from "react-icons/fa";

export default function ProductSidebar({ query, params }) {
  const [brandFilter, setBrandFilter] = useState([]);
  const [colorFilter, setColorFilter] = useState([]);
  const [sizeFilter, setSizesFilter] = useState([]);

  const productBrands = useGetAllProductBrands({});
  const subcategories = useGetAllSubCategories({});
  const productColors = useGetAllProductColors({});
  const productSizes = useGetAllProductSizes({});

  const handleFilterChange = (checked, value, type) => {
    value, checked, type, "value, checked";
    // setBrandFilter((prev) =>{

    // const   [...prev, value]

    // });

    switch (type) {
      case "brand":
        setBrandFilter((prev) => {
          if (checked) {
            [...prev, value], "prev";
            return [...prev, value];
          } else {
            prev.filter((item) => item !== value), "prev";
            return prev.filter((item) => item !== value);
          }
        });
        break;
      case "color":
        setColorFilter((prev) => {
          if (checked) {
            [...prev, value], "prev";
            return [...prev, value];
          } else {
            prev.filter((item) => item !== value), "prev";
            return prev.filter((item) => item !== value);
          }
        });
        break;
      case "size":
        setSizesFilter((prev) => {
          if (checked) {
            return [...prev, value];
          } else {
            return prev.filter((item) => item !== value);
          }
        });
        break;
      default:
        break;
    }
  };

  query, params.id, "query";

  return (
    <div
      className={` transition-all duration-500  h-[90vh] overflow-auto absolute top-0 left-0 lg:relative pt-8 z-[3] bg-gray-100 w-[300px]`}
    >
      <ul className="menu gap-3">
        {/* {currentUserRoute} */}

        <GroupLink groupName="Categories" icon={<FaUser />}>
          {subcategories.length > 0 &&
            subcategories.map((item, index) => (
              <ActiveLink key={index} href={`/products/${item.slug}`}>
                {item.subcategoryName}
              </ActiveLink>
            ))}
        </GroupLink>
        <GroupLink groupName="Brands" icon={<FaUser />}>
          {productBrands?.length > 0 &&
            productBrands?.map((item, index) => (
              <FilterRadioInput
                label={item.brandName}
                id={item.slug}
                key={index}
                name={item.slug}
                value={item.slug}
                checked={brandFilter.includes(item.slug)}
                onChange={handleFilterChange}
                type="brand"
                query={query}
                params={params}
              />
            ))}
        </GroupLink>

        <GroupLink groupName="Colors" icon={<FaUser />}>
          {productColors?.length > 0 &&
            productColors?.map((item, index) => (
              <FilterRadioInput
                label={item.productColorName}
                id={item.productColorName}
                key={index}
                name={item.productColorName}
                checked={colorFilter.includes(item.productColorName)}
                onChange={handleFilterChange}
                type="color"
                query={query}
                params={params}
              />
            ))}
        </GroupLink>

        <GroupLink groupName="Sizes" icon={<FaUser />}>
          {productSizes?.length > 0 &&
            productSizes?.map((item, index) => (
              <FilterRadioInput
                label={item.sizeName}
                id={item.sizeName}
                key={index}
                name={item.sizeName}
                checked={sizeFilter.includes(item.sizeName)}
                onChange={handleFilterChange}
                type="size"
                query={query}
                params={params}
              />
            ))}
        </GroupLink>
      </ul>
    </div>
  );
}
