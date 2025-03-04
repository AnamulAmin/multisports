import { BiLeftArrow } from "react-icons/bi";
import useGetTermsCondition from "../../../../Hook/GetPublicDataHook/useGetTermsCondition";

function TermsCondition() {
  const content = useGetTermsCondition({});

  return (
    <>
      <div className=" py-8 min-h-[400px] pb-0 px-4  sm:px-6 lg:px-20 lg:mt-4">
        <div className="terms-and-conditions text-sm md:text-xl text-gray-800">
          <p dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      </div>
    </>
  );
}

export default TermsCondition;
