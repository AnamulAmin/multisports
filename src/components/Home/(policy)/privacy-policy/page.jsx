import useGetPrivacyPolicy from "../../../../Hook/GetPublicDataHook/useGetPrivacyPolicy";

function PrivacyPolicy() {
  const content = useGetPrivacyPolicy({});
  return (
    <>
      <div className="min-h-[300px] py-8 px-4  sm:px-6 lg:px-8">
        <div className="max-w-[97%] mx-auto">
          <p dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      </div>
    </>
  );
}

export default PrivacyPolicy;
