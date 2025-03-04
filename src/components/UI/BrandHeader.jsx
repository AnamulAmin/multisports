import { baseImageUrl } from "../../apis/apis";

const BrandHeader = ({ pageSubHeader = "", pageHeader = "", src }) => {
  return (
    <div
      className="flex justify-center p-6 md:p-10 2xl:p-8 relative bg-no-repeat bg-center bg-cover h-[200px]"
      style={{
        backgroundImage: `url(${baseImageUrl}/${src})`,
      }}
    >
      <div className="absolute top-0 ltr:left-0 rtl:right-0 bg-black w-full h-full opacity-50 transition-opacity duration-500 group-hover:opacity-80" />
      <div className="w-full flex items-center justify-center relative z-10 ">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white text-center">
          <span className="font-satisfy block font-normal mb-3">
            {pageSubHeader}
          </span>
          {pageHeader}
        </h2>
      </div>
    </div>
  );
};

export default BrandHeader;
