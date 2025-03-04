import { useState } from "react";
import { baseImageUrl } from "../../../apis/apis";
import CustomImage from "../../../shared/ImageComponents/CustomImage";
import useGetAboutVision from "../../../Hook/GetPublicDataHook/useGetAboutVision";

export default function AboutVision() {
  const [loading, setLoading] = useState(false);
  const content = useGetAboutVision({ setLoading });

  return (
    <>
      <section className="bg-primary-300 text-white pb-24" id="blog">
        <div
          className="w-full h-[400px] flex justify-center items-center flex-col gap-4 mb-14"
          style={{
            backgroundImage: `url(${baseImageUrl}/${content?.bannerImage})`,
            backgroundSize: "cover",
            backdropFilter: "brightness(0.5)",
          }}
        >
          <h2 className="uppercase font-bold text-center text-4xl">
            OUR Blogs
          </h2>
          <h4 className="text-center text-lg text-gray-500 mb-6">
            LATEST BLOG POSTS
          </h4>
        </div>

        <div className="container mx-auto">
          {loading ? (
            <h2>Loading...</h2>
          ) : (
            <div className="flex p-4 relative bg-white rounded-2xl  border-t-0 border-l-0 shadow text-neutral-900">
              <CustomImage
                imageKey={content?.sideImage}
                width={200}
                height={200}
                alt="icon"
                className="w-full h-full max-w-[400px] object-contain"
              />
              <div className="pl-20 pt-16 p-8 relative z-[1]">
                <div className="w-0 h-0  bg-[#E9F1FA] rounded-2xl absolute top-0 left-0 group-hover:h-full group-hover:w-full transition-all duration-500 z-[-1]"></div>
                <h4 className="text-lg font-bold">{content?.title}</h4>
                <p
                  className="mt-2"
                  dangerouslySetInnerHTML={{ __html: content?.description }}
                ></p>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
