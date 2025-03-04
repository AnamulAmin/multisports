import EditFormImage from "../../../shared/ImageComponents/EditFormImage";
import useGetAllCategories from "../../../Hook/GetDataHook/useGetAllCategories";
import useGetAllSubCategories from "../../../Hook/GetDataHook/useGetAllSubCategories";
import { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { FiUploadCloud } from "react-icons/fi";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hook/useAxiosSecure";

export default function ChildCategoryEditForm({
  targetId,
  setIsShowModal,
  isShowModal,
}) {
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [childCategoryName, setChildCategoryName] = useState("");
  const [childCategoryIcon, setChildCategoryIcon] = useState(null);
  const [childCategoryIconPreview, setChildCategoryIconPreview] = useState("");
  const [slug, setSlug] = useState("");
  const [error, setError] = useState("");
  const [categoryError, setCategoryError] = useState("");
  const [subcategoryError, setSubcategoryError] = useState("");
  const [nameError, setNameError] = useState("");
  const [slugError, setSlugError] = useState("");
  const [iconError, setIconError] = useState("");

  const categories = useGetAllCategories({});
  const subcategories = useGetAllSubCategories({});
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    async function fetchCategoryData() {
      try {
        const res = await axiosSecure.get(`/child-categories/${targetId}`);
        const category = res?.data?.data;

        // Populate form fields with existing category data
        setChildCategoryName(category.childCategoryName);
        setCategory(category.category);
        setSubcategory(category.subcategory);
        setSlug(category.slug);

        // For existing images, display preview from the server
        setChildCategoryIconPreview(category.childCategoryIcon); // Assuming you have a URL for the icon
      } catch (error) {
        console.error("Error fetching category data:", error);
      }
    }

    if (targetId) {
      fetchCategoryData();
    }

    if (!isShowModal) {
      handleCloseModal();
    }
  }, [targetId, axiosSecure, isShowModal]);

  const onDropIcon = (acceptedFiles) => {
    const file = acceptedFiles[0]; // Assuming one file for simplicity

    // Create a local URL for the dropped image
    const previewUrl = URL.createObjectURL(file);
    // Set the state with the URL
    setChildCategoryIconPreview(previewUrl);
    setChildCategoryIcon(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset all error states
    setCategoryError("");
    setSubcategoryError("");
    setNameError("");
    setSlugError("");
    setIconError("");

    // Custom validation
    let isValid = true;

    if (!category) {
      setCategoryError("Category is required.");
      isValid = false;
    }

    if (!subcategory) {
      setSubcategoryError("Subcategory is required.");
      isValid = false;
    }

    if (!childCategoryName) {
      setNameError("Child category name is required.");
      isValid = false;
    }

    if (!slug) {
      setSlugError("Slug is required.");
      isValid = false;
    }

    if (childCategoryIcon && childCategoryIcon.size > 5 * 1024 * 1024) {
      setIconError("The image size should not exceed 5MB.");
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    setError(""); // Reset error

    const formData = new FormData();
    formData.append("category", category);
    formData.append("subcategory", subcategory);
    formData.append("childCategoryName", childCategoryName);
    if (childCategoryIcon) formData.append("image", childCategoryIcon);
    formData.append("slug", slug);

    try {
      const res = await axiosSecure.put(
        `/child-categories/${targetId}`,
        formData
      );

      if (res.status === 200 || res.status === 201) {
        Swal.fire({
          title: "Success!",
          text: "Category updated successfully",
          icon: "success",
          confirmButtonText: "Ok",
        });
      }
      setIsShowModal(false);
    } catch (err) {
      console.error(err);
      Swal.fire({
        title: "Error!",
        text: "Something went wrong!",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };

  const { getRootProps: getIconRootProps, getInputProps: getIconInputProps } =
    useDropzone({
      onDrop: onDropIcon,
      accept: "image/*",
      multiple: false,
    });

  const handleSubcategoryNameInput = (input) => {
    const sanitizedInput = input.replace(/[^a-zA-Z0-9]/g, "_");
    setSlug(sanitizedInput);
    setChildCategoryName(input);
  };

  const handleSlug = (input) => {
    const sanitizedInput = input.replace(/[^a-zA-Z0-9]/g, "_");
    setSlug(sanitizedInput);
  };

  const handleCloseModal = () => {
    setIsShowModal(false);
    setCategory("");
    setSubcategory("");
    setChildCategoryName("");
    setChildCategoryIcon(null);
    setChildCategoryIconPreview("");
    setCategoryError("");
    setSubcategoryError("");
    setNameError("");
    setSlugError("");
    setIconError("");
  };

  return (
    <div className="w-[100%] bg-gray-100 p-10 rounded-2xl">
      <div className="">
        <h1 className="text-2xl font-semibold mb-9">
          Child Category Create Form
        </h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          {/* Select Category */}
          <div className="mb-4">
            <label className="block text-gray-700">Select Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="select customInput"
            >
              <option value="">Select One</option>
              {categories?.length > 0 &&
                categories.map((item, index) => (
                  <option
                    value={item.slug}
                    selected={category === item.slug}
                    key={index}
                  >
                    {item?.categoryName}
                  </option>
                ))}
            </select>
            {categoryError && <p className="text-red-500">{categoryError}</p>}
          </div>

          {/* Select Subcategory */}
          <div className="mb-4">
            <label className="block text-gray-700  ">Select Subcategory</label>
            <select
              value={subcategory}
              onChange={(e) => setSubcategory(e.target.value)}
              className="select customInput"
            >
              <option value="">Select One</option>
              {subcategories?.length > 0 &&
                subcategories.map((item, index) => (
                  <option
                    value={item.slug}
                    selected={subcategory === item.slug}
                    key={index}
                  >
                    {item?.subcategoryName}
                  </option>
                ))}
            </select>
            {subcategoryError && (
              <p className="text-red-500">{subcategoryError}</p>
            )}
          </div>

          {/* Child Category Name */}
          <div className="mb-4">
            <label className="block text-gray-700 ">Name </label>
            <input
              type="text"
              value={childCategoryName}
              onChange={(e) => handleSubcategoryNameInput(e.target.value)}
              className="customInput"
              placeholder="Child Category Title"
            />
            {nameError && <p className="text-red-500">{nameError}</p>}
          </div>

          {/* slug Name */}
          <div className="mb-4">
            <label className="block text-gray-700 ">Slug </label>
            <input
              type="text"
              value={slug}
              onChange={(e) => handleSlug(e.target.value)}
              className="customInput"
              placeholder="Slug"
            />
            {slugError && <p className="text-red-500">{slugError}</p>}
          </div>

          {/* Child Category Icon */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              Child Category Icon
            </label>

            <div
              {...getIconRootProps()}
              className="w-full p-4 border-dashed min-h-[200px] flex flex-col items-center justify-center border-2 border-gray-300 rounded-md text-center cursor-pointer"
            >
              <input {...getIconInputProps()} />
              {childCategoryIcon || childCategoryIconPreview ? (
                <>
                  <EditFormImage
                    imageObject={childCategoryIcon}
                    imagePreview={childCategoryIconPreview}
                  />
                  <p>{childCategoryIcon ? childCategoryIcon.name : ""}</p>
                </>
              ) : (
                <>
                  <FiUploadCloud size={60} />
                  <p className="text-xl">Drag and drop a file here or click</p>
                </>
              )}
              {iconError && <p className="text-red-500">{iconError}</p>}
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={handleCloseModal}
              className="customCancelButton"
            >
              Close
            </button>
            <button type="submit" className="customSaveButton">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
