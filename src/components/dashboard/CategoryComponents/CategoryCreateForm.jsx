import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { FiUploadCloud } from "react-icons/fi";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hook/useAxiosSecure";

export default function CategoryCreateForm() {
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [featureCategory, setFeatureCategory] = useState("");
  const [showOnNavbar, setShowOnNavbar] = useState("Yes");
  const [categoryIcon, setCategoryIcon] = useState(null);
  const [categoryIconImagePreview, setCategoryIconImagePreview] = useState("");
  const [categoryBanner, setCategoryBanner] = useState(null);
  const [categoryBannerImagePreview, setCategoryBannerImagePreview] =
    useState("");
  const [slug, setSlug] = useState("");
  const [errors, setErrors] = useState({}); // To track validation errors

  const MAX_FILE_SIZE_MB = 2;

  const onDropIcon = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      setErrors((prev) => ({
        ...prev,
        categoryIcon: `File size must be less than ${MAX_FILE_SIZE_MB} MB.`,
      }));
      return;
    }
    const previewUrl = URL.createObjectURL(file);
    setCategoryIconImagePreview(previewUrl);
    setCategoryIcon(file);
    setErrors((prev) => ({ ...prev, categoryIcon: "" })); // Clear error
  };

  const onDropBanner = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      setErrors((prev) => ({
        ...prev,
        categoryBanner: `File size must be less than ${MAX_FILE_SIZE_MB} MB.`,
      }));
      return;
    }
    const previewUrl = URL.createObjectURL(file);
    setCategoryBannerImagePreview(previewUrl);
    setCategoryBanner(file);
    setErrors((prev) => ({ ...prev, categoryBanner: "" })); // Clear error
  };

  const validateForm = () => {
    const newErrors = {};
    if (!categoryName.trim())
      newErrors.categoryName = "Category Name is required.";
    if (!slug.trim()) newErrors.slug = "Slug is required.";
    if (!featureCategory)
      newErrors.featureCategory = "Feature Category is required.";
    if (!showOnNavbar)
      newErrors.showOnNavbar = "Show On Navbar selection is required.";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      Swal.fire({
        title: "Error!",
        text: "Please fix the validation errors.",
        icon: "error",
        confirmButtonText: "Ok",
      });
      setLoading(false);
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
      const res = await axiosSecure.post("/categories", formData);
      if (res.status === 200 || res.status === 201) {
        Swal.fire({
          title: "Success!",
          text: "Category created successfully",
          icon: "success",
          confirmButtonText: "Ok",
        });
        handleCloseModal();
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
      setLoading(false);
    }
  };

  const handleSlug = (input) => {
    const sanitizedInput = input.replace(/[^a-zA-Z0-9]/g, "_");
    setSlug(sanitizedInput);
    setCategoryName(input);
  };

  const handleCloseModal = () => {
    setCategoryName("");
    setFeatureCategory("");
    setShowOnNavbar("");
    setCategoryIcon(null);
    setCategoryBanner(null);
    setSlug("");
    setErrors({});
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

  return (
    <div className="w-full p-6 pt-0">
      <div className="">
        <h1 className="text-3xl font-semibold mb-9">Category Create Form</h1>
        <form onSubmit={handleSubmit}>
          {/* Category Name */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold">Name </label>
            <input
              type="text"
              value={categoryName}
              onChange={(e) => handleSlug(e.target.value)}
              className="customInput"
              placeholder="Category Name"
            />
            {errors.categoryName && (
              <p className="text-red-500 text-sm">{errors.categoryName}</p>
            )}
          </div>

          {/* Slug */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold ">Slug </label>
            <input
              type="text"
              value={slug}
              className="customInput"
              placeholder="Slug"
              readOnly
            />
            {errors.slug && (
              <p className="text-red-500 text-sm">{errors.slug}</p>
            )}
          </div>

          {/* Category Icon */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Category Icon (Optional)
            </label>
            <div
              {...getIconRootProps()}
              className="w-full p-4 border-dashed min-h-[200px] flex flex-col items-center justify-center border-2 border-gray-300 rounded-2xl text-center cursor-pointer"
            >
              <input {...getIconInputProps()} />
              {categoryIcon ? (
                <>
                  <img
                    src={categoryIconImagePreview}
                    alt="categoryIcon"
                    width={200}
                    height={200}
                  />
                  <p>{categoryIcon.name}</p>
                </>
              ) : (
                <>
                  <FiUploadCloud size={60} />
                  <p className="text-xl">Drag and drop a file here or click</p>
                </>
              )}
            </div>
            {errors.categoryIcon && (
              <p className="text-red-500 text-sm">{errors.categoryIcon}</p>
            )}
          </div>

          {/* Category Banner */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Category Banner (Optional)
            </label>
            <div
              {...getBannerRootProps()}
              className="w-full p-4 border-dashed min-h-[200px] flex flex-col items-center justify-center border-2 border-gray-300 rounded-2xl text-center cursor-pointer"
            >
              <input {...getBannerInputProps()} />
              {categoryBanner ? (
                <>
                  <img
                    src={categoryBannerImagePreview}
                    alt="categoryBanner"
                    width={200}
                    height={200}
                  />
                  <p>{categoryBanner.name}</p>
                </>
              ) : (
                <>
                  <FiUploadCloud size={60} />
                  <p className="text-xl">Drag and drop a file here or click</p>
                </>
              )}
            </div>
            {errors.categoryBanner && (
              <p className="text-red-500 text-sm">{errors.categoryBanner}</p>
            )}
          </div>

          {/* Feature Category */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold">
              Feature Category
            </label>
            <select
              value={featureCategory}
              onChange={(e) => setFeatureCategory(e.target.value)}
              className="customInput select"
            >
              <option value="">Select One</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
            {errors.featureCategory && (
              <p className="text-red-500 text-sm">{errors.featureCategory}</p>
            )}
          </div>

          {/* Show On Navbar */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold">
              Show on Navbar
            </label>
            <select
              value={showOnNavbar}
              onChange={(e) => setShowOnNavbar(e.target.value)}
              className="customInput select"
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
            {errors.showOnNavbar && (
              <p className="text-red-500 text-sm">{errors.showOnNavbar}</p>
            )}
          </div>

          <div className="mt-6 flex justify-end">
            <button
              disabled={loading}
              type="submit"
              className="customSaveButton"
            >
              {loading ? (
                <>
                  <span className="loading loading-spinner mr-2  loading-xs"></span>
                  Creating ..
                </>
              ) : (
                "Create Category"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
