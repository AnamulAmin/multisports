import CustomEditor from "../../../../shared/CustomEditor/CustomEditor";
import DragUploadImageInput from "../../../../shared/DragUploadImageInput";
import useGetAllBlogCategories from "../../../../Hook/GetDataHook/useGetAllBlogCategories";

import { useState } from "react";
import { useDropzone } from "react-dropzone";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../Hook/useAxiosSecure";

export default function BlogCreateForm() {
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
  const [isLoading, setIsLoading] = useState(false);

  const BlogCategories = useGetAllBlogCategories({});

  const [thumbnail, setThumbnail] = useState(null);
  const [title, setTitle] = useState("");

  const onDropIcon = (acceptedFiles) => {
    // Process the files
    const file = acceptedFiles[0]; // Assuming one file for simplicity

    // Create a local URL for the dropped image
    const previewUrl = URL.createObjectURL(file);

    // Set the state with the URL
    setThumbnailPreview(previewUrl);

    setThumbnail(acceptedFiles[0]);
  };

  const onDropBanner = (acceptedFiles) => {
    // Process the files
    const file = acceptedFiles[0]; // Assuming one file for simplicity

    // Create a local URL for the dropped image
    const previewUrl = URL.createObjectURL(file);
    // Set the state with the URL
    setBlogBannerImagePreview(previewUrl);
    setBlogBanner(acceptedFiles[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here

    if (
      !title ||
      !shortDescription ||
      !fullDescription ||
      !thumbnail ||
      !slug ||
      !metaTitle ||
      !metaDescription ||
      !blogCategory
    ) {
      Swal.fire({
        title: "Error!",
        text: `${title ? "" : `Title is required`} ${
          shortDescription ? "" : `Short Description is required`
        } ${fullDescription ? "" : `Full Description is required`} ${
          thumbnail ? "" : `Image is required`
        } ${slug ? "" : `Slug is required`} ${
          metaTitle ? "" : `Meta Title is required`
        } ${metaDescription ? "" : `Meta Description is required`} ${
          blogCategory ? "" : `Blog Category is required`
        }`,
        icon: "error",
        confirmButtonText: "Ok",
      });
      return;
    }

    const formData = new FormData();

    formData.append("writer", writer);
    formData.append("blogCategory", blogCategory);
    formData.append("shortDescription", shortDescription);
    formData.append("fullDescription", fullDescription);
    formData.append("image", thumbnail);
    formData.append("title", title);
    formData.append("slug", slug);
    formData.append("metaTitle", metaTitle);
    formData.append("metaKeywords", metaKeywords);
    formData.append("metaDescription", metaDescription);

    setIsLoading(true);

    try {
      const res = await axiosSecure.post("/blog", formData);

      handleCloseModal();

      if (res.status === 200 || res.status === 201) {
        Swal.fire({
          title: "Success!",
          text: "Blog created successfully",
          icon: "success",
          confirmButtonText: "Ok",
        });
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        title: "Error!",
        text: "Something went wrong!",
        icon: "error",
        confirmButtonText: "Ok",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const { getRootProps: getIconRootProps, getInputProps: getIconInputProps } =
    useDropzone({
      onDrop: onDropIcon,
      accept: "image/*",
      multiple: false,
    });

  const {
    getRootProps: getBannerRootProps,
    getInputProps: getBannerInputProps,
  } = useDropzone({
    onDrop: onDropBanner,
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
    <div className="p-6 pt-0">
      <div className="">
        <h1 className="text-3xl font-semibold mb-9">Blog Create Form</h1>
        <form onSubmit={handleSubmit}>
          {/* Blog Name */}
          <div className="mb-4">
            <label className="block text-gray-700 ">Name </label>
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
            <label className="block text-gray-700 ">Title </label>
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
            <label className="block text-gray-700 ">Slug </label>
            <input
              type="text"
              value={slug}
              className="customInput"
              placeholder="Slug"
              required
              onChange={(e) => setSlug(e.target.value)}
            />
          </div>

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

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Blog Thumbnail</label>
            <DragUploadImageInput
              getRootProps={getIconRootProps}
              getInputProps={getIconInputProps}
              image={thumbnail}
              imagePreview={thumbnailPreview}
            />
          </div>

          <div className="mb-8">
            <label className="block text-gray-700 text-2xl mb-4">
              Short Description
            </label>

            <CustomEditor
              value={shortDescription}
              setValue={setShortDescription}
            />
          </div>
          <div className="mb-8">
            <label className="block text-gray-700 text-2xl mb-4">
              Full Description
            </label>

            <CustomEditor
              value={fullDescription}
              setValue={setFullDescription}
            />
          </div>

          <div className="mb-4 mt-4">
            <h2 className="text-2xl font-semibold mb-4 pb-3  border-b border-gray-300">
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

          <div className="flex justify-end">
            <button
              type="submit"
              className="customSaveButton"
              disabled={isLoading}
            >
              {isLoading && (
                <span className="loading loading-spinner mr-2  loading-xs"></span>
              )}
              Save Blog
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
