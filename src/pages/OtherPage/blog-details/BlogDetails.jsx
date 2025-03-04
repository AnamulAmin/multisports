import { useParams } from "react-router-dom";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaClock } from "react-icons/fa";
import { CiFacebook } from "react-icons/ci";
import {
  SlSocialInstagram,
  SlSocialReddit,
  SlSocialTwitter,
} from "react-icons/sl";
import useGetSocialLink from "../../../Hook/GetPublicDataHook/useGetSocialLink";
import MetaTags from "../../../components/Home/MetaTags/MetaTags";
const BlogDetails = () => {
  const id = useParams().id;
  const content = useGetSocialLink({});
  const axiosSecure = useAxiosSecure();
  const [blog, setBlog] = useState({});

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const res = await axiosSecure.get(`/blog/${id}`);
        if (res.status === 200 || res.status === 201) {
          setBlog(res.data.data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchBlogData();
  }, []);
  const navigate = useNavigate();
  const readingTime = Math.ceil(blog?.fullDescription?.split(" ").length / 200);
  // blogCategory , fullDescription , image , shortDescription , title , writer
  console.log(blog);
  return (
    <div className="max-w-[1440px] mx-auto mt-4 md:mt-10 px-6">
      <MetaTags
        metaTitle={blog?.metaTitle}
        metaDescription={blog?.metaDescription}
        metaKeywords={blog?.metaKeywords}
      />
      <div className="">
        <h1 className="text-xl md:text-3xl  font-semibold text-gray-900 mb-2">
          {blog?.title}
        </h1>
        <div className="flex gap-3 md:gap-4 mb-4 text-gray-600">
          <p className="text-base md:text-lg">
            By <span className="font-semibold">{blog?.writer}</span>
          </p>
          <p className="flex items-center text-base md:text-lg">
            <FaClock className="mr-1 md:mr-2 text-gray-500" />
            {readingTime} min read
          </p>
        </div>
      </div>
      {/* Blog Header Section */}
      <div className=" mb-12">
        <img
          src={`https://mgpwebaps.s3.eu-north-1.amazonaws.com/multi-sports/${blog?.image}`}
          alt={blog?.title}
          className="w-full h-[400px] object-cover rounded-lg"
        />
      </div>

      {/* Main Blog Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-12">
        {/* Blog Main Content */}
        <div className="col-span-2">
          <div className="prose lg:prose-xl max-w-none text-gray-800">
            <div
              className="md:text-xl font-semibold"
              dangerouslySetInnerHTML={{ __html: blog?.shortDescription }}
            />
            <div
              dangerouslySetInnerHTML={{ __html: blog?.fullDescription }}
              className="mt-6"
            />
          </div>
          <button
            onClick={() => navigate(-1)}
            className="mt-8 px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
          >
            Go Back
          </button>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Categories Section */}
          <div className="bg-white border rounded-lg p-6">
            <h3 className="font-bold text-lg text-gray-500 mb-4">CATEGORY</h3>
            <p className="text-gray-700">{blog?.blogCategory}</p>
          </div>

          {/* Social Media Links */}
          {/* <div className="bg-white shadow-md rounded-lg p-6">
                        <h3 className="font-bold text-lg text-gray-500 mb-4">FOLLOW THE LATEST</h3>
                        <div className="flex items-center gap-6">
                            <Link to={content?.facebook}>
                                <CiFacebook className="text-2xl text-gray-500 hover:text-gray-500 transition cursor-pointer" />
                            </Link>
                            <Link to={content?.twitter}>
                                <SlSocialTwitter className="text-2xl text-gray-500 hover:text-gray-500 transition cursor-pointer" />
                            </Link>
                            <Link to={content?.instagram}>
                                <SlSocialInstagram className="text-2xl text-gray-500 hover:text-gray-500 transition cursor-pointer" />
                            </Link>
                        </div>
                    </div> */}

          {/* Subscription Section */}
          <div className="bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-lg p-6">
            <h3 className="font-bold text-lg mb-4">GET UPDATES</h3>
            <p className="text-sm mb-4">
              Subscribe to stay updated with the latest blogs and news.
            </p>
            <input
              type="text"
              placeholder="Email"
              className="w-full px-4 py-2 rounded-md text-gray-800 mb-4 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="w-full px-4 py-2 bg-white text-gray-600 rounded-lg hover:bg-gray-100 transition">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
