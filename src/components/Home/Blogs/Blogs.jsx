import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Link } from "react-router-dom";
import axios from "axios";
import blogBg from "../../../assets/blogs/blog_banner.jpg";
import BlogCard from "../../../shared/Cards/BlogCard/BlogCard";
import useGetAllBlogs from "../../../Hook/GetPublicDataHook/useGetAllBlogs";
// import Modal from "../../../shared/Modal/Modal";
import BlogDetail from "./BlogDetail";
import Modal from "../../partial/Modal/Modal";

const Blogs = () => {
  const [blogData, setBlogData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [singleData, setSingleData] = useState({});
  const [isShowModal, setIsShowModal] = useState(false);
  //   const axiosPublic = useAxiosPublic();
  

  const blogs = useGetAllBlogs({});

  return (
    <>
      <section className="bg-primary-300 text-white pb-24" id="blog">
        <div
          className="w-full h-[400px] flex justify-center items-center flex-col gap-4 mb-14"
          style={{
            backgroundImage: `url(${blogBg})`,
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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
              {blogs?.length > 0 &&
                blogs.map((blog, index) => {
                  return (
                    <BlogCard
                      key={index}
                      data={blog}
                      setSingleData={setSingleData}
                      setIsShowModal={setIsShowModal}
                    />
                  );
                })}
            </div>
          )}
        </div>
      </section>
      {/* <Modal isShowModal={isShowModal} setIsShowModal={setIsShowModal}>
        <BlogDetail data={singleData} />
      </Modal> */}
      <Modal isShowModal={isShowModal} children={<BlogDetail data={singleData}/>} setIsShowModal={setIsShowModal}></Modal>
    </>
  );
};

export default Blogs;
