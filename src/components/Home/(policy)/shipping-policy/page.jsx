import useGetShippingPolicy from "../../../../Hook/GetPublicDataHook/useGetShippingPolicy";

function ShippingPublicPolicy() {
  const content = useGetShippingPolicy({});
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

export default ShippingPublicPolicy;
