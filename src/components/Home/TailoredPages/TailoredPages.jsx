import { useEffect, useState } from "react";
import Modal from "../../../shared/Modal/Modal";
import useAxiosPublic from "../../../Hook/useAxiosPublic";
import { useParams } from "react-router-dom";
import CustomImage from "../../../shared/ImageComponents/CustomImage";

const TailoredPages = () => {
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(false);
  const [singleData, setSingleData] = useState({});
  const [isShowModal, setIsShowModal] = useState(false);
  //   const axiosPublic = useAxiosPublic();

  const slug = useParams().slug;

  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        const res = await axiosPublic.get(`/custom-pages?slug=${slug}`);

        if (res.status === 200 || res.status === 201) {
          setContent(res.data.data);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching content:", error);
        setLoading(false);
        throw new Error("Failed to fetch content");
      }
    };

    fetchContent();
  }, [axiosPublic, slug]);

  return (
    <>
      <section className="bg-primary-300 pb-24" id="blog">
        {content?.image && (
          <div className="w-full h-[400px] flex justify-center items-center flex-col gap-4 mb-14">
            <CustomImage
              imageKey={content?.image}
              alt={content?.title}
              className="w-full h-full object-contain"
            />
          </div>
        )}

        <div className="container mx-auto min-h-[600px] mt-10">
          {loading ? (
            <h2>Loading...</h2>
          ) : (
            <div className="w-full">
              <h2 className="text-2xl font-bold mb-4 text-center">
                {content?.title}
              </h2>
              <p dangerouslySetInnerHTML={{ __html: content?.content }} />
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default TailoredPages;
