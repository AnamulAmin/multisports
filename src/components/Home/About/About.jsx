import CustomImage from "../../../shared/ImageComponents/CustomImage";
import { useState } from "react";
import useGetAbout from "../../../Hook/GetPublicDataHook/useGetAbout";
import { baseImageUrl } from "../../../apis/apis";
import useGetAboutVision from "../../../Hook/GetPublicDataHook/useGetAboutVision";
import useGetAboutMission from "../../../Hook/GetPublicDataHook/useGetAboutMission";
import WhyUs from "./WhyUs";

export default function About() {
  const [loading, setLoading] = useState(false);
  const content = useGetAbout({ setLoading });
  const contentVision = useGetAboutVision({ setLoading });
  const contentMission = useGetAboutMission({ setLoading });

  return (
    <>
      <section className="bg-primary-300  text-white" id="blog">
        {/* Banner Section */}
        <div
          className="w-full h-[180px] md:h-[400px] flex justify-center items-center flex-col gap-4 mb-14"
          style={{
            backgroundImage: `url(${baseImageUrl}/${content?.bannerImage})`,
            backgroundSize: "cover",
            backdropFilter: "brightness(0.5)",
          }}
        >
          <h2 className="uppercase font-bold text-center text-4xl">
            About Us
          </h2>
        </div>

        {/* Content Section */}
        <div className="container md:w-full w-[90%] mx-auto">
          {loading ? (
            <h2>Loading...</h2>
          ) : (
            <>
              {/* About Content */}
              <ContentSection
                image={content?.sideImage}
                title={content?.title}
                description={content?.description}
              />

              {/* Vision Content */}
              <div className="mt-20">
                <ContentSection
                  image={contentVision?.image}
                  title={contentVision?.title}
                  description={contentVision?.description}
                />
              </div>

              {/* Mission Content */}
              <div className="mt-20">
                <ContentSection
                  image={contentMission?.image}
                  title={contentMission?.title}
                  description={contentMission?.description}
                />
              </div>
            </>
          )}
        </div>

        {/* Why Us Section */}
        <WhyUs />
      </section>
    </>
  );
}

function ContentSection({ image, title, description, reverse }) {
  return (
    <div
      className={`flex flex-col md:flex-row p-3 md:p-5 bg-white rounded-2xl shadow-xl text-neutral-900 border border-gray-200 ${
        reverse ? "flex-row-reverse" : ""
      }`}
    >
      {/* Left Section with Image */}
      <div
        className={`flex   md:border-dashed border-red-500 ${
          reverse ? "md:border-l md:pl-8" : "md:border-r md:pr-8"
        } items-center justify-center md:w-1/3 rounded-l-2xl`}
      >
        <CustomImage
          imageKey={image}
          width={200}
          height={200}
          alt="icon"
          className="w-full h-auto object-contain"
        />
      </div>

      {/* Right Section with Content */}
      <div className="md:w-2/3 p-3 md:p-6">
        <h4 className="md:text-2xl text-lg md:mb-9 text-red-600">{title}</h4>
        <p
          className="md:mt-4 mt-2 text-gray-700 md:text-xl leading-relaxed"
          dangerouslySetInnerHTML={{ __html: description }}
        ></p>
      </div>
    </div>
  );
}
