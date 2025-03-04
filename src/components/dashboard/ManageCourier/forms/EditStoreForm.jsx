import EditFormImage from "../../../../shared/ImageComponents/EditFormImage";
import { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { FiUploadCloud } from "react-icons/fi";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../Hook/useAxiosSecure";

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

export default function EditStoreForm({
  categoryId,
  setIsShowModal,
  isShowModal,
}) {
  const axiosSecure = useAxiosSecure();
  const [categoryName, setCategoryName] = useState("");
  const [featureCategory, setFeatureCategory] = useState("");
  const [showOnNavbar, setShowOnNavbar] = useState("Yes");
  const [categoryIcon, setCategoryIcon] = useState(null);
  const [categoryIconImagePreview, setCategoryIconImagePreview] = useState("");
  const [categoryBanner, setCategoryBanner] = useState(null);
  const [categoryBannerImagePreview, setCategoryBannerImagePreview] =
    useState("");
  const [slug, setSlug] = useState("");
  const [errors, setErrors] = useState({});

  // Fetch category data when component mounts
  useEffect(() => {
    async function fetchCategoryData() {
      try {
        const res = await axiosSecure.get(`/categories/${categoryId}`);
        const category = res?.data?.data;
        setCategoryName(category.categoryName);
        setFeatureCategory(category.featureCategory);
        setShowOnNavbar(category.showOnNavbar);
        setSlug(category.slug);
        setCategoryIconImagePreview(category.categoryIcon);
        setCategoryBannerImagePreview(category.categoryBanner);
      } catch (error) {
        console.error("Error fetching category data:", error);
      }
    }

    if (categoryId) {
      fetchCategoryData();
    }

    if (!isShowModal) {
      handleCloseModal();
    }
  }, [categoryId, axiosSecure, isShowModal]);

  const onDropIcon = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file.size > MAX_FILE_SIZE) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        categoryIcon: "File size must be less than 2MB.",
      }));
      return;
    }
    const previewUrl = URL.createObjectURL(file);
    setCategoryIconImagePreview(previewUrl);
    setCategoryIcon(file);
    setErrors((prevErrors) => ({
      ...prevErrors,
      categoryIcon: "",
    })); // Clear the error after valid file
  };

  const onDropBanner = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file.size > MAX_FILE_SIZE) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        categoryBanner: "File size must be less than 2MB.",
      }));
      return;
    }
    const previewUrl = URL.createObjectURL(file);
    setCategoryBannerImagePreview(previewUrl);
    setCategoryBanner(file);
    setErrors((prevErrors) => ({
      ...prevErrors,
      categoryBanner: "",
    })); // Clear the error after valid file
  };

  const validateForm = () => {
    let isValid = true;
    let validationErrors = {};

    // Validate Category Name
    if (!categoryName) {
      validationErrors.categoryName = "Category Name is required.";
      isValid = false;
    }

    // Validate Slug
    if (!slug) {
      validationErrors.slug = "Slug is required.";
      isValid = false;
    }

    // Validate Feature Category
    if (!featureCategory) {
      validationErrors.featureCategory =
        "Feature Category selection is required.";
      isValid = false;
    }

    // Validate Show on Navbar
    if (!showOnNavbar) {
      validationErrors.showOnNavbar = "Show on Navbar selection is required.";
      isValid = false;
    }

    // Validate category icon file size
    if (categoryIcon && categoryIcon.size > MAX_FILE_SIZE) {
      validationErrors.categoryIcon =
        "Category Icon file size must be less than 2MB.";
      isValid = false;
    }

    // Validate category banner file size
    if (categoryBanner && categoryBanner.size > MAX_FILE_SIZE) {
      validationErrors.categoryBanner =
        "Category Banner file size must be less than 2MB.";
      isValid = false;
    }

    setErrors(validationErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    const formData = new FormData();
    formData.append("categoryName", categoryName);
    formData.append("featureCategory", featureCategory);
    formData.append("showOnNavbar", showOnNavbar);
    if (categoryIcon) formData.append("categoryIcon", categoryIcon);
    if (categoryBanner) formData.append("categoryBanner", categoryBanner);
    formData.append("slug", slug);

    try {
      const res = await axiosSecure.put(`/categories/${categoryId}`, formData);
      if (res.status === 200 || res.status === 201) {
        Swal.fire({
          title: "Success!",
          text: "Category updated successfully",
          icon: "success",
          confirmButtonText: "Ok",
        });
        handleCloseModal();
      }
    } catch (err) {
      console.error(err);
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

  const handleSlug = (input) => {
    const sanitizedInput = input.replace(/[^a-zA-Z0-9]/g, "_");
    setSlug(sanitizedInput);
    setCategoryName(input);
  };

  const handleCloseModal = () => {
    setIsShowModal(false);
    setCategoryName("");
    setFeatureCategory("");
    setShowOnNavbar("");
    setSlug("");
    setCategoryIconImagePreview("");
    setCategoryBannerImagePreview("");
    setCategoryBanner(null);
    setCategoryIcon(null);
    setErrors({});
  };

  return (
    <div className="w-[50%] bg-gray-100 rounded-2xl p-10">
      <div className="w-full mx-auto ">
        <h1 className="text-2xl font-semibold mb-9">Edit Category</h1>
        <form onSubmit={handleSubmit}>
          {/* Category Name */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold ">Name </label>
            <input
              type="text"
              value={categoryName}
              onChange={(e) => handleSlug(e.target.value)}
              className="customInput"
              placeholder="Category Name"
              // required
            />
            {errors.categoryName && (
              <p className="text-red-500 text-xs">{errors.categoryName}</p>
            )}
          </div>

          {/* Slug */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold ">Slug </label>
            <input
              type="text"
              value={slug}
              className="customInput"
              placeholder="Category Slug"
              // required
            />
            {errors.slug && (
              <p className="text-red-500 text-xs">{errors.slug}</p>
            )}
          </div>

          {/* Category Icon */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Category Icon
            </label>
            <div
              {...getIconRootProps()}
              className="w-full p-4 border-dashed min-h-[200px] flex flex-col items-center justify-center border-2 border-gray-300 rounded-md text-center cursor-pointer"
            >
              <input {...getIconInputProps()} />
              {categoryIconImagePreview ? (
                <>
                  <EditFormImage
                    imageObject={categoryIcon}
                    imagePreview={categoryIconImagePreview}
                  />
                  <p>{categoryIcon ? categoryIcon.name : "Current Icon"}</p>
                </>
              ) : (
                <>
                  <FiUploadCloud size={60} />
                  <p className="text-xl">Drag and drop a file here or click</p>
                </>
              )}
            </div>
            {errors.categoryIcon && (
              <p className="text-red-500 text-xs">{errors.categoryIcon}</p>
            )}
          </div>

          {/* Category Banner */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Category Banner
            </label>
            <div
              {...getBannerRootProps()}
              className="w-full p-4 border-dashed min-h-[200px] flex flex-col items-center justify-center border-2 border-gray-300 rounded-md text-center cursor-pointer"
            >
              <input {...getBannerInputProps()} />
              {categoryBannerImagePreview ? (
                <>
                  <EditFormImage
                    imageObject={categoryBanner}
                    imagePreview={categoryBannerImagePreview}
                  />
                  <p>
                    {categoryBanner ? categoryBanner.name : "Current Banner"}
                  </p>
                </>
              ) : (
                <>
                  <FiUploadCloud size={60} />
                  <p className="text-xl">Drag and drop a file here or click</p>
                </>
              )}
            </div>
            {errors.categoryBanner && (
              <p className="text-red-500 text-xs">{errors.categoryBanner}</p>
            )}
          </div>

          {/* Feature Category */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold">
              Feature Category{" "}
            </label>
            <select
              value={featureCategory}
              onChange={(e) => setFeatureCategory(e.target.value)}
              className="select customInput"
              // required
            >
              <option value="">Select Feature Category</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
            {errors.featureCategory && (
              <p className="text-red-500 text-xs">{errors.featureCategory}</p>
            )}
          </div>

          {/* Show on Navbar */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold ">
              Show on Navbar{" "}
            </label>
            <select
              value={showOnNavbar}
              onChange={(e) => setShowOnNavbar(e.target.value)}
              className="select customInput"
              // required
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
            {errors.showOnNavbar && (
              <p className="text-red-500 text-xs">{errors.showOnNavbar}</p>
            )}
          </div>

          <button type="submit" className="customSaveButton w-full mt-3">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}
