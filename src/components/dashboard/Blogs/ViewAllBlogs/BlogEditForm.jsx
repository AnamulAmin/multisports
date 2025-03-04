import CustomEditor from "../../../../shared/CustomEditor/CustomEditor";
import DragEditUploadImageInput from "../../../../shared/DragEditUploadImageInput";
import useGetAllBlogCategories from "../../../../Hook/GetDataHook/useGetAllBlogCategories";

import { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../Hook/useAxiosSecure";

export default function BlogEditForm({ BlogId, setIsShowModal, isShowModal }) {
  const axiosSecure = useAxiosSecure();
  const [writer, setWriter] = useState("");
  const [blogCategory, setBlogCategory] = useState("");
  const [thumbnailPreview, setThumbnailPreview] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [fullDescription, setFullDescription] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaKeywords, setMetaKeywords] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [slug, setSlug] = useState("");

  const BlogCategories = useGetAllBlogCategories({});

  const [thumbnail, setThumbnail] = useState(null);
  const [title, setTitle] = useState("");

  // Fetch Blog data when component mounts
  useEffect(() => {
    async function fetchBlogData() {
      try {
        const res = await axiosSecure.get(`/blog/${BlogId}`);
        const resBlogData = res?.data?.data;
        // Populate form fields with existing Blog data

        setTitle(resBlogData.title);
        setWriter(resBlogData.writer);
        setThumbnailPreview(resBlogData.image);
        setShortDescription(resBlogData.shortDescription);
        setFullDescription(resBlogData.fullDescription);
        setMetaTitle(resBlogData.metaTitle);
        setMetaKeywords(resBlogData.metaKeywords);
        setMetaDescription(resBlogData.metaDescription);
        setBlogCategory(resBlogData.blogCategory);

        setSlug(resBlogData.slug);
      } catch (error) {
        console.error("Error fetching Blog data:", error);
      }
    }

    if (BlogId) {
      fetchBlogData();
    }

    if (!isShowModal) {
      handleCloseModal();
    }
  }, [BlogId, axiosSecure, isShowModal]);

  const onDropThumbnail = (acceptedFiles) => {
    const file = acceptedFiles[0];
    const previewUrl = URL.createObjectURL(file);
    setThumbnailPreview(previewUrl);
    setThumbnail(acceptedFiles[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("writer", writer);
    formData.append("blogCategory", blogCategory);
    formData.append("shortDescription", shortDescription);
    formData.append("fullDescription", fullDescription);
    formData.append("image", thumbnail);
    formData.append("title", title);
    formData.append("metaTitle", metaTitle);
    formData.append("metaKeywords", metaKeywords);
    formData.append("metaDescription", metaDescription);

    try {
      const res = await axiosSecure.put(`/blog/${BlogId}`, formData);
      if (res.status === 200 || res.status === 201) {
        Swal.fire({
          title: "Success!",
          text: "Blog updated successfully",
          icon: "success",
          confirmButtonText: "Ok",
        });
        handleCloseModal();
        setIsShowModal(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const {
    getRootProps: getBannerRootProps,
    getInputProps: getBannerInputProps,
  } = useDropzone({
    onDrop: onDropThumbnail,
    accept: "image/*",
    multiple: false,
  });

  const handleCloseModal = () => {
    setWriter("");
    setBlogCategory(null);
    setSlug("");
    setTitle("");
    setShortDescription("");
    setFullDescription("");
    setMetaTitle("");
    setMetaKeywords("");
    setMetaDescription("");
    setThumbnail(null);
    setThumbnailPreview("");
  };

  const handleSlug = (input) => {
    const sanitizedInput = input.replace(/[^a-zA-Z0-9]/g, "_");
    setSlug(sanitizedInput);
    setTitle(input);
  };

  return (
    <div className="w-full bg-white rounded-2xl p-10">
      <div className="">
        <h1 className="text-2xl font-semibold mb-5">Blog Edit Form</h1>
        <form onSubmit={handleSubmit}>
          {/* Blog Name */}
          <div className="mb-4">
            <label className="block text-gray-700 ">Name</label>
            <input
              type="text"
              value={writer}
              onChange={(e) => setWriter(e.target.value)}
              className="customInput"
              placeholder="Blog Name"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 ">title </label>
            <input
              type="text"
              value={title}
              className="customInput"
              placeholder="Blog Name"
              required
              onChange={(e) => handleSlug(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 ">Slug</label>
            <input
              type="text"
              value={slug}
              className="customInput"
              placeholder="Slug"
              required
              onChange={(e) => setSlug(e.target.value)}
            />
          </div>

          {/*  Blog Category */}
          <div className="mb-4">
            <label className="block text-gray-700 ">Blog Category</label>
            <select
              value={blogCategory}
              onChange={(e) => setBlogCategory(e.target.value)}
              className="customInput select"
            >
              <option value="">Select One</option>
              {BlogCategories.map((category) => (
                <option value={category.name} key={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Blog Icon */}
          <div className="mb-4">
            <label className="block text-gray-700 ">Blog Thumbnail</label>
            <DragEditUploadImageInput
              getRootProps={getBannerRootProps}
              getInputProps={getBannerInputProps}
              image={thumbnail}
              imagePreview={thumbnailPreview}
            />
          </div>

          <div className="mb-[4rem]">
            <label className="block text-gray-700 text-2xl  mb-4">
              Short Description
            </label>

            <CustomEditor
              value={shortDescription}
              setValue={setShortDescription}
            />
          </div>
          <div className="mb-[4rem]">
            <label className="block text-gray-700 text-2xl mb-4">
              Full Description
            </label>

            <CustomEditor
              value={fullDescription}
              setValue={setFullDescription}
            />
          </div>

          {/* SEO Information */}
          <div className="mb-4 ">
            <h2 className="text-2xl pb-4 mb-4 border-b border-gray-300">
              SEO Information (Optional)
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 ">Meta Title</label>
                <input
                  type="text"
                  value={metaTitle}
                  onChange={(e) => setMetaTitle(e.target.value)}
                  className="customInput"
                />
              </div>
              <div>
                <label className="block text-gray-700 ">Meta Keywords</label>
                <input
                  type="text"
                  value={metaKeywords}
                  onChange={(e) => setMetaKeywords(e.target.value)}
                  className="customInput"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-gray-700 ">Meta Description</label>
                <textarea
                  value={metaDescription}
                  onChange={(e) => setMetaDescription(e.target.value)}
                  className="customInput resize-none"
                  rows="3"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button type="submit" className="customSaveButton">
              Save Blog
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
