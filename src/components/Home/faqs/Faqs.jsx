import useGetAllFaq from "../../../Hook/GetPublicDataHook/useGetAllFaq";

const Faqs = () => {
  const faq = useGetAllFaq({});
  return (
    <>
      <div className="min-h-[400px] mx-auto py-8 pb-1 px-4  sm:px-6 lg:px-8">
        <h2 className="text-center md:text-3xl font-semibold mb-6 text-lg md:mb-12">Frequently Asked Questions (FAQ)</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5">
          {faq.map((item, index) => (
            <div
              tabIndex={index}
              className="collapse rounded-md collapse-arrow border-base-300 border"
              key={index}
            >
              <div className="collapse-title md:text-xl font-medium">
                {item.question}
              </div>
              <div className="collapse-content">
                <p>{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};



export default Faqs;
