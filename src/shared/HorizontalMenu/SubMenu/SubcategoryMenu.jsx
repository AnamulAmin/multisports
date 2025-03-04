

import CustomImage from "../../ImageComponents/CustomImage";
import SubcategoryLink from "./SubcategoryLink";

function SubcategoryMenu({
  subcategories,
  setActiveCategory,
  isHover,
  setIsHover,
  categoryImage,
  chaiCategories
}) {
  return (
    <nav
      className={`flex flex-wrap bg-slate-50  rounded justify-center md:justify-between items-center gap-x-8 gap-y-4 text-left w-[80%] absolute  left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-1000 z-[999]  ${isHover
        ? "opacity-100 translate-y-0 pointer-events-auto"
        : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >

      <div className={`container mx-auto flex gap-8`}>
        <div className="flex flex-wrap flex-col max-h-[300px] p-10 items-start  gap-x-8  text-left w-8/12">
          {subcategories.map((subcategory, index) => (
            <SubcategoryLink subcategory={subcategory} key={index} childCategoryItem={chaiCategories} ></SubcategoryLink>
          ))}
        </div>
        <div className="flex flex-wrap flex-col rounded-2xl max-h-[300px] p-10 items-start  gap-x-8 gap-y-4 text-left w-4/12 ">
          <CustomImage imageKey={categoryImage} />
        </div>
      </div>
    </nav>
  );
}

export default SubcategoryMenu;
