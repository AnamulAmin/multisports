import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import useGetAllProductBrands from "../../../Hook/GetDataHook/useGetAllProductBrands";
import useGetAllProductColors from "../../../Hook/GetDataHook/useGetAllProductColors";
import useGetAllProductSizes from "../../../Hook/GetDataHook/useGetAllProductSizes";
import ProductsArea from "./ProductsArea";

import ProductFilterGroup from "../../../shared/ProductFilterGroup";
import { RiDeleteBin7Line } from "react-icons/ri";
import Suggestion from "./Suggestion";
import DrawerComponent from "./DrawerComponent";
import SelectableList from "./SelectableList";
import useGetExistQueries from "../../../Hook/GetPublicDataHook/useGetExistQueries";

import useGetAllSubCategories from "../../../Hook/GetPublicDataHook/useGetAllSubCategories";
import useAxiosPublic from "../../../Hook/useAxiosPublic";
import BrandHeader from "../../UI/BrandHeader";

function ProductPage() {
  const [selectedItems, setSelectedItems] = useState([]);

  const params = useParams();
  const location = useLocation();
  location.search, "searchParams";
  const [brandFilter, setBrandFilter] = useState([]);
  const [colorFilter, setColorFilter] = useState([]);
  const [sizeFilter, setSizesFilter] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState([]);
  const [subcategoryFilter, setSubCategoryFilter] = useState([]);
  const [singleBrand, setSingleBrand] = useState({});
  const productBrands = useGetAllProductBrands({});
  const [priceRange, setPriceRange] = useState(0);
  const axiosPublic = useAxiosPublic();
  // const categories = useGetAllCategories({});
  const {
    categories,
    brands,
    subcategories: querySubcategories,
    colors,
    sizes,
    highestPrice,
  } = useGetExistQueries({});
  const subcategories = useGetAllSubCategories({
    query: `slug=${
      // categoryFilter.length > 0 ? categoryFilter.join(",") : params.id
      categoryFilter.join(",")
    }`,
  });

  const productColors = useGetAllProductColors({});
  const productSizes = useGetAllProductSizes({});

  const toggleSelection = (name, labelKey) => {
    const searchParams = location?.search?.split("?")[1];
    const brandQuery = searchParams?.split("=")[1];
    const isExistBrand = brands.map((item) => item?.brand).includes(brandQuery);
    isExistBrand, "isExistBrand toggle";
    if (isExistBrand) {
      setBrandFilter((prev) => [...new Set([...prev, brandQuery])]);
      setSubCategoryFilter((prev) => prev.filter((item) => item !== "all"));
    } else {
      setSubCategoryFilter((prev) => prev.filter((item) => item !== "all"));
      setBrandFilter((prev) => [...prev]);
    }
    setSelectedItems((prev) => {
      return prev.includes(name)
        ? prev.filter((item) => item !== name)
        : [...prev, name];
    });
    switch (labelKey) {
      case "category":
        setCategoryFilter((prev2) =>
          prev2.includes(name)
            ? prev2.filter((item) => item !== name)
            : [...prev2, name]
        );
        break;
      case "subcategory":
        setSubCategoryFilter((prev2) =>
          prev2.includes(name)
            ? prev2.filter((item) => item !== name)
            : [...prev2, name]
        );
        break;
      case "brand":
        setBrandFilter((prev2) =>
          prev2.includes(name)
            ? prev2.filter((item) => item !== name)
            : [...prev2, name]
        );

        (prev2) =>
          prev2.includes(name)
            ? prev2.filter((item) => item !== name)
            : [...prev2, name],
          "brandFilter";
        break;
      case "colorLabel":
        setColorFilter((prev2) =>
          prev2.includes(name)
            ? prev2.filter((item) => item !== name)
            : [...prev2, name]
        );
        break;
      case "sizeValue":
        setSizesFilter((prev2) =>
          prev2.includes(name)
            ? prev2.filter((item) => item !== name)
            : [...prev2, name]
        );
        break;
      default:
        break;
    }
  };

  const handleRemoveItem = (itemToRemove) => {
    setSelectedItems((prevSelected) =>
      prevSelected.filter((item) => item !== itemToRemove)
    );
    setColorFilter((prevColor) =>
      prevColor.filter((item) => item !== itemToRemove)
    );
    setSizesFilter((prevSize) =>
      prevSize.filter((item) => item !== itemToRemove)
    );
    setBrandFilter((prevBrand) =>
      prevBrand.filter((item) => item !== itemToRemove)
    );
    setCategoryFilter((prevCategory) =>
      prevCategory.filter((item) => item !== itemToRemove)
    );
    setSubCategoryFilter((prevSubcategory) =>
      prevSubcategory.filter((item) => item !== itemToRemove)
    );
  };

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

  // useEffect(() => {
  //   ReactGA.send({
  //     hitType: "pageview",
  //     page: window.location.pathname,
  //     title: "ProductPage.jsx",
  //   });

  //   ReactGA.event({
  //     category: "Product Visiting",
  //     action: "ProductPage ",
  //   });
  // }, []);

  // useEffect(() => {

  // }, [subcategories]);

  useEffect(() => {
    setPriceRange(highestPrice[0]?.highestPrice);
    const searchParams = location?.search
      ? location?.search?.split("?")[1]
      : "";
    const brand = searchParams?.split("=")[1];

    const isExist = categories
      .map((item) => item?.category)
      .includes(params.id);
    const isExistBrand = productBrands
      .map((item) => item?.slug)
      .includes(brand);

    isExist, "isExist", isExistBrand, "parentCategory";
    if (isExist) {
      setCategoryFilter((prev) => [...new Set([...prev, params?.id])]);
      setSubCategoryFilter([]);
      // const filteredSubcat = [...new Set([...prev, ...prev2, params?.id])];
    } else if (isExistBrand) {
      setSubCategoryFilter((prev) => prev.filter((item) => item !== "all"));
      setBrandFilter([brand]);
    } else {
      setSubCategoryFilter([params?.id]);
      const parentCategory = querySubcategories.find((category) => {
        category.slug == params.id, "parentCategory";
        return category.slug == params.id;
      });
      parentCategory, isExistBrand, "parentCategory";
      if (parentCategory?.category) {
        setCategoryFilter([parentCategory?.category]);
      }
    }

    params.id, "parentCategory";
  }, [params.id, categories, querySubcategories]);

  useEffect(() => {
    const paramsId = location?.search?.split("?")[1]?.split("=")[1];
    paramsId, "singleBrand";
    const fetchBrand = async () => {
      try {
        const res = await axiosPublic.get(`/product-brands/single/${paramsId}`);
        res, "singleBrand";
        if (res.status === 200 || res.status === 201) {
          setSingleBrand(res.data.data);
        }
      } catch (error) {
        console.error("Error fetching brand:", error);
      }
    };

    if (singleBrand) {
      fetchBrand();
    }
  }, [axiosPublic, location]);

  singleBrand, "singleBrand";

  return (
    <div>
      {/* suggestion bar */}

      <div className="w-[90%] mx-auto my-10">
        {params.id !== "all" ? (
          <Suggestion
            toggleSelection={toggleSelection}
            subcategories={subcategories}
          />
        ) : (
          <>
            {
              <BrandHeader
                pageHeader={singleBrand?.brandName}
                src={singleBrand?.banner}
              />
            }
          </>
        )}
        {/* <div>
          <Suggestion
            toggleSelection={toggleSelection}
            subcategories={subcategories}
          />
        </div> */}
      </div>
      <div className="flex lg:ml-12 flex-col">
        <div className="block md:hidden mt-3">
          <DrawerComponent setSelectedItems={setSelectedItems}>
            <div
              className={`md:hidden block transition-all duration-500  overflow-auto`}
            >
              <ul className="menu gap-3">
                {/* Filtering section */}
                <section className="border-b">
                  <div>
                    {/* items here */}
                    {selectedItems && (
                      <div className="my-4 flex flex-wrap gap-1">
                        {/* <p className="border max-w-min py-2 px-4 rounded-2xl bg-slate-50">itfems</p> */}
                        {selectedItems.map((item, indx) => {
                          return (
                            <p
                              key={indx}
                              onClick={() => handleRemoveItem(item)}
                              className="border py-2 px-3 rounded-xl bg-slate-50 text-xs hover:bg-red-500 hover:text-white cursor-pointer transition-all duration-300 ease-in-out transform active:scale-95 flex items-center gap-2"
                            >
                              {item}{" "}
                              <RiDeleteBin7Line className="transition-transform duration-300 ease-in-out group-hover:rotate-12" />
                            </p>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </section>
                <div className="space-y-3 ">
                  <ProductFilterGroup groupName="Categories">
                    <SelectableList
                      items={querySubcategories}
                      toggleSelection={toggleSelection}
                      selectedItems={selectedItems}
                      labelKey="subcategoryName"
                    />
                  </ProductFilterGroup>

                  <ProductFilterGroup groupName="Brands">
                    <SelectableList
                      items={productBrands}
                      toggleSelection={toggleSelection}
                      selectedItems={selectedItems}
                      labelKey="brandName"
                    />
                  </ProductFilterGroup>

                  <ProductFilterGroup groupName="Colors">
                    <SelectableList
                      items={productColors}
                      toggleSelection={toggleSelection}
                      selectedItems={selectedItems}
                      labelKey="productColorName"
                    />
                  </ProductFilterGroup>

                  <ProductFilterGroup groupName="Sizes">
                    <SelectableList
                      items={productSizes}
                      toggleSelection={toggleSelection}
                      selectedItems={selectedItems}
                      labelKey="sizeName"
                    />
                  </ProductFilterGroup>
                </div>
              </ul>
            </div>
          </DrawerComponent>
        </div>
        {/* <div className="container mx-auto min-w-[900px] max-w-[1200px]  overflow-hidden px-8">
          <div className="w-full flex justify-center items-baseline  gap-8 mx-auto mt-8">
            {subcategories.length > 0 &&
              subcategories.slice(0, 8).map((item, index) => (
                <div
                  className="w-full h-[220px] max-w-[220px] flex flex-col items-center justify-center gap-2 group flex-shrink-0 lg:flex-shrink  "
                  key={index}
                  onClick={() =>
                    toggleSelection(item["slug"], "subcategoryName")
                  }
                >
                  <div className="w-full aspect-square rounded-full overflow-hidden">
                    <img
                      src={item.subcategoryIcon || "/no-image.png"}
                      alt="subcategoryIcon"
                      className="w-full h-full object-cover group-hover:scale-110 duration-300 ease-in-out"
                    />
                  </div>
                  <h3 className="text-center text-lg font-bold group-hover:text-blue-400">
                    {item.subcategoryName}
                  </h3>
                </div>
              ))}
          </div>
        </div> */}
        <div className="flex  flex-1 relative z-[1] ">
          <div
            className={`hidden lg:block transition-all duration-500  overflow-auto absolute top-0 left-0 lg:relative pt-8 z-[3] w-[300px]`}
          >
            <ul className="menu gap-3">
              {/* Filtering section */}
              <section className="border-b">
                <p className="text-sm">
                  <span className="text-gray-500">Home </span> / Products
                </p>
                <div className="mt-12">
                  <div className="flex justify-between items-center">
                    <p className="text-3xl font-normal">Filters</p>
                    <p
                      onClick={() => {
                        setSelectedItems([]);
                      }}
                      className="text-sm cursor-pointer"
                    >
                      Clear All
                    </p>
                  </div>
                  {/* items here */}
                  {selectedItems && (
                    <div className="my-7 flex flex-wrap gap-2">
                      {/* <p className="border max-w-min py-2 px-4 rounded-2xl bg-slate-50">itfems</p> */}
                      {selectedItems.map((item, indx) => {
                        return (
                          <p
                            key={indx}
                            onClick={() => handleRemoveItem(item)}
                            className="border py-2 px-4 rounded-2xl bg-slate-50 hover:bg-red-500 hover:text-white cursor-pointer transition-all duration-300 ease-in-out transform active:scale-95 flex items-center gap-2"
                          >
                            {item}{" "}
                            <RiDeleteBin7Line className="transition-transform duration-300 ease-in-out group-hover:rotate-12" />
                          </p>
                        );
                      })}
                    </div>
                  )}
                </div>
              </section>

              <div className="space-y-4">
                <p className="transition-all text-sm duration-300 delay-100 capitalize flex justify-between items-center gap-5 w-full">
                  <b>Price </b>
                  <span className="text-gray-700 font-semibold text-[14px]  rounded-md  items-center justify-center flex">
                    $0.00 - ${Number(priceRange).toFixed(2)}
                  </span>
                </p>
                <input
                  type="range"
                  min={0}
                  max={highestPrice[0]?.highestPrice}
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="range range-xs mb-5"
                />
                <ProductFilterGroup groupName="Categories">
                  <SelectableList
                    // items={categories}
                    items={categories || []}
                    toggleSelection={toggleSelection}
                    selectedItems={categoryFilter}
                    labelKey="category"
                    slug={"slug"}
                    existingFilterItems={categoryFilter}
                  />
                </ProductFilterGroup>
                <ProductFilterGroup groupName="Subcategories">
                  <SelectableList
                    items={querySubcategories || []}
                    toggleSelection={toggleSelection}
                    selectedItems={subcategoryFilter}
                    labelKey="subcategory"
                    slug={"slug"}
                    existingFilterItems={subcategoryFilter}
                  />
                </ProductFilterGroup>

                <ProductFilterGroup groupName="Brands">
                  <SelectableList
                    items={brands || []}
                    toggleSelection={toggleSelection}
                    selectedItems={brandFilter}
                    labelKey="brand"
                    slug={"slug"}
                    existingFilterItems={brandFilter}
                  />
                </ProductFilterGroup>

                <ProductFilterGroup groupName="Colors">
                  <SelectableList
                    items={colors || []}
                    toggleSelection={toggleSelection}
                    selectedItems={colorFilter}
                    labelKey="colorLabel"
                    existingFilterItems={colorFilter}
                  />
                </ProductFilterGroup>

                <ProductFilterGroup groupName="Sizes">
                  <SelectableList
                    items={sizes || []}
                    toggleSelection={toggleSelection}
                    selectedItems={sizeFilter}
                    labelKey="sizeValue"
                    existingFilterItems={sizeFilter}
                  />
                </ProductFilterGroup>
              </div>
            </ul>
          </div>
          <div className="flex-1 md:px-14 md:py-9 p-4 overflow-auto dark:bg-white relative">
            <ProductsArea
              slug={""}
              sizeFilter={sizeFilter}
              colorFilter={colorFilter}
              brandFilter={brandFilter}
              query={location.search}
              subcategoryFilter={subcategoryFilter}
              categoryFilter={categoryFilter}
              priceRange={priceRange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
