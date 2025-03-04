import useGetAllCategories from "../../Hook/GetDataHook/useGetAllCategories";
// import {Link} from "react-router-dom";
import { useState, useEffect } from "react";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";

import "./horizontalMenuStyle.css";
import useGetAllSubCategories from "../../Hook/GetDataHook/useGetAllSubCategories";
import SubcategoryMenu from "./SubMenu/SubcategoryMenu";
import useGetAllChildCategories from "../../Hook/GetDataHook/useGetAllChildCategories";
import { Link } from "react-router-dom";
function HorizontalMenu() {
  const [activeCategory, setActiveCategory] = useState("");
  const [categoryImage, setCategoryImage] = useState("");
  const [isHover, setIsHover] = useState(false);
  const categories = useGetAllCategories({ query: `showOnNavbar=Yes` });
  const chaiCategories = useGetAllChildCategories({
    query: `showOnNavbar=Yes`,
  });
  const [currentSubCategories, setCurrentSubCategories] = useState([]);

  // const subcategories = useGetAllSubCategories({
  //   query: `category=${activeCategory}`,
  //   activeCategory,
  // });
  const subcategories = useGetAllSubCategories({
    // query: `category=${activeCategory}`,
    // activeCategory,
  });

  useEffect(() => {
    const currentCategory = categories.find(
      (category) => category.slug === activeCategory
    );
    if (!currentCategory) {
      return;
    }
    setCategoryImage(currentCategory.categoryBanner);

    const currentSubCategoriesData = subcategories.filter(
      (subcategory) => subcategory.category === currentCategory.slug
    );
    setCurrentSubCategories(currentSubCategoriesData);
  }, [activeCategory]);

  activeCategory, "activeCategory";
  return (
    <div className="relative md:block hidden">
      <header className="w-full  flex justify-center  ">
        <div className="container flex px-2 gap-4 ">
          <Swiper
            slidesPerView={"auto"}
            spaceBetween={10}
            className="horizontal_menu"
            navigation={false}
            modules={[Navigation]}
          >
            {categories?.length > 0 &&
              categories.map((category, index) => (
                <SwiperSlide key={index}>
                  <button
                    className={`py-2 md:py-3 px-2 text-xs md:text-base relative cursor-pointer 
              hover:bg-white 
              before:absolute before:bottom-0 before:left-0 
              before:w-0 before:h-[2px] before:bg-gray-900 
              before:transition-all before:duration-500 
              hover:before:w-full
              ${
                isHover && category?.slug === activeCategory
                  ? "text-gray-900" // Optional for text color change
                  : "text-gray-700"
              }`}
                    onMouseEnter={() => {
                      setActiveCategory(category.slug);
                      setIsHover(true);
                    }}
                    onMouseLeave={() => {
                      setIsHover(false);
                    }}
                  >
                    <Link
                      to={`/products/${category.slug}`}
                      className="relative z-10"
                    >
                      {category.categoryName.charAt(0).toUpperCase() +
                        category.categoryName.slice(1).toLowerCase()}
                    </Link>
                  </button>
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </header>

      <SubcategoryMenu
        subcategories={currentSubCategories}
        setActiveCategory={setActiveCategory}
        isHover={isHover}
        setIsHover={setIsHover}
        categoryImage={categoryImage}
        chaiCategories={chaiCategories}
      />
    </div>
  );
}

export default HorizontalMenu;
