// import DragUploadImageInput from "../../../shared/DragUploadImageInput";

// import { useState } from "react";
// import { useDropzone } from "react-dropzone";
// import toast from "react-hot-toast";
// import useAxiosSecure from "../../../Hook/useAxiosSecure";

// export default function CreateTestimonialsForm() {
//   // State management for form fields
//   const [customerName, setCustomerName] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [designation, setDesignation] = useState("");
//   const [rating, setRating] = useState("");
//   const [description, setDescription] = useState("");
//   const [thumbnail, setThumbnail] = useState(null);
//   const [thumbnailPreview, setThumbnailPreview] = useState(null);

//   const axiosSecure = useAxiosSecure();

//   // Dropzone for thumbnail upload
//   const onDropThumbnail = (acceptedFiles) => {
//     // Set the state with the URL

//     const thumbnailPreview = URL.createObjectURL(acceptedFiles[0]);

//     setThumbnailPreview(thumbnailPreview);

//     setThumbnail(acceptedFiles[0]);
//   };

//   const {
//     getRootProps: getThumbnailRootProps,
//     getInputProps: getThumbnailInputProps,
//   } = useDropzone({
//     onDrop: onDropThumbnail,
//     accept: "image/*",
//     multiple: false,
//   });

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     const formData = new FormData();
//     formData.append("customerName", customerName);
//     formData.append("designation", designation);
//     formData.append("rating", rating);
//     formData.append("description", description);
//     formData.append("image", thumbnail);
//     try {
//       const res = await axiosSecure.post("/testimonials", formData);

//       if (res.status === 200 || res.status === 201) {
//         toast.success("Testimonial created successfully");
//         localStorage.removeItem("file_key");

//         setCustomerName("");
//         setDesignation("");
//         setRating("");
//         setDescription("");
//         setThumbnailPreview("");
//         setThumbnail(null);
//       }
//     } catch (err) {
//       console.error(err);
//       toast.error("Something went wrong !");
//     } finally {
//       setLoading(false);
//     }

//     // Clear form fields
//     // setCustomerName("");
//     // setDesignation("");
//     // setRating("");
//     // setDescription("");
//     // setThumbnailPreview("");
//     // setThumbnail(null);
//   };

//   return (
//     <div className="p-6 pt-0">
//       {/* Testimonial Entry Form */}
//       <h1 className="text-3xl font-semibold mb-9">Testimonial Entry Form</h1>
//       <form className="" onSubmit={handleSubmit}>
//         <div className="space-y-4">
//           <div>
//             <label className="block text-gray-700">Customer Name </label>
//             <input
//               type="text"
//               value={customerName}
//               onChange={(e) => setCustomerName(e.target.value)}
//               className="customInput"
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-gray-700">Designation</label>
//             <input
//               type="text"
//               value={designation}
//               onChange={(e) => setDesignation(e.target.value)}
//               className="customInput"
//             />
//           </div>
//           <div>
//             <label className="block text-gray-700">Rating </label>
//             <select
//               value={rating}
//               onChange={(e) => setRating(e.target.value)}
//               className="customInput select"
//               required
//             >
//               <option value="">Select One</option>
//               <option value="1">1 Star</option>
//               <option value="2">2 Stars</option>
//               <option value="3">3 Stars</option>
//               <option value="4">4 Stars</option>
//               <option value="5">5 Stars</option>
//             </select>
//           </div>
//           <div>
//             <label className="block text-gray-700">Description </label>
//             <textarea
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               className="customInput resize-none"
//               required
//             ></textarea>
//           </div>
//         </div>
//         {/* Left Column - Image Upload */}
//         <div className="relative my-4">
//           <label className="block text-gray-700 mb-2">Customer Image</label>
//           <DragUploadImageInput
//             getRootProps={getThumbnailRootProps}
//             getInputProps={getThumbnailInputProps}
//             image={thumbnail}
//             imagePreview={thumbnailPreview}
//           />
//         </div>

//         {/* Save Button */}
//         <div className="col-span-2">
//           <button
//             type="submit"
//             className="customSaveButton w-full flex justify-center items-center gap-3"
//           >
//             {!loading ? (
//               <span>Save Testimonial</span>
//             ) : (
//               <span className="flex items-center gap-2">
//                 Saving ..{" "}
//                 <span className="loading loading-spinner loading-sm"></span>
//               </span>
//             )}
//           </button>
//         </div>
//       </form>

//       {/* Display Testimonials */}
//       {/* <div className="mt-8">
//         <h2 className="text-xl font-semibold mb-4">Saved Testimonials</h2>
//         <div className="grid grid-cols-1 gap-4">
//           {testimonials.map((testimonial, index) => (
//             <div key={index} className="border p-4 rounded">
//               <div className="flex space-x-4">
//                 {testimonial.image && (
//                   <img
//                     width={400}
//                     height={400}
//                     src={testimonial.image}
//                     alt={testimonial.customerName}
//                     className="w-16 h-16 rounded-full"
//                   />
//                 )}
//                 <div>
//                   <h3 className="text-lg font-bold">
//                     {testimonial.customerName}
//                   </h3>
//                   <p>{testimonial.designation}</p>
//                   <p>Rating: {testimonial.rating} Stars</p>
//                   <p>{testimonial.description}</p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div> */}
//     </div>
//   );
// }
import DragUploadImageInput from "../../../shared/DragUploadImageInput";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../Hook/useAxiosSecure";

export default function CreateTestimonialsForm() {
  const [customerName, setCustomerName] = useState("");
  const [designation, setDesignation] = useState("");
  const [rating, setRating] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const axiosSecure = useAxiosSecure();

  // Image upload handler
  const onDropThumbnail = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file) {
      setErrors((prev) => ({ ...prev, thumbnail: "Image is required" }));
      return;
    }
    if (!["image/jpeg", "image/png", "image/jpg"].includes(file.type)) {
      setErrors((prev) => ({
        ...prev,
        thumbnail: "Only JPEG, PNG, and JPG are allowed",
      }));
      return;
    }

    setThumbnailPreview(URL.createObjectURL(file));
    setThumbnail(file);
    setErrors((prev) => ({ ...prev, thumbnail: null }));
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: onDropThumbnail,
    accept: "image/*",
    multiple: false,
  });

  // Custom validation function
  const validateForm = () => {
    let errors = {};

    if (!customerName.trim()) {
      errors.customerName = "Customer name is required";
    } else if (customerName.length < 3) {
      errors.customerName = "Name must be at least 3 characters";
    }

    if (designation && designation.length > 50) {
      errors.designation = "Designation must be under 50 characters";
    }

    if (!rating) {
      errors.rating = "Rating is required";
    } else if (!["1", "2", "3", "4", "5"].includes(rating)) {
      errors.rating = "Invalid rating value";
    }

    if (!description.trim()) {
      errors.description = "Description is required";
    } else if (description.length < 10) {
      errors.description = "Description must be at least 10 characters";
    }

    if (!thumbnail) {
      errors.thumbnail = "Image is required";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("customerName", customerName);
    formData.append("designation", designation);
    formData.append("rating", rating);
    formData.append("description", description);
    formData.append("image", thumbnail);

    try {
      const res = await axiosSecure.post("/testimonials", formData);
      if (res.status === 200 || res.status === 201) {
        toast.success("Testimonial created successfully");
        setCustomerName("");
        setDesignation("");
        setRating("");
        setDescription("");
        setThumbnail(null);
        setThumbnailPreview(null);
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 pt-0">
      <h1 className="text-3xl font-semibold mb-9">Testimonial Entry Form</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Customer Name */}
        <div>
          <label className="block text-gray-700">Customer Name</label>
          <input
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            className="customInput"
          />
          {errors.customerName && (
            <p className="text-red-500">{errors.customerName}</p>
          )}
        </div>

        {/* Designation */}
        <div>
          <label className="block text-gray-700">Designation</label>
          <input
            type="text"
            value={designation}
            onChange={(e) => setDesignation(e.target.value)}
            className="customInput"
          />
          {errors.designation && (
            <p className="text-red-500">{errors.designation}</p>
          )}
        </div>

        {/* Rating */}
        <div>
          <label className="block text-gray-700">Rating</label>
          <select
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="customInput select"
          >
            <option value="">Select One</option>
            <option value="1">1 Star</option>
            <option value="2">2 Stars</option>
            <option value="3">3 Stars</option>
            <option value="4">4 Stars</option>
            <option value="5">5 Stars</option>
          </select>
          {errors.rating && <p className="text-red-500">{errors.rating}</p>}
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="customInput resize-none"
          ></textarea>
          {errors.description && (
            <p className="text-red-500">{errors.description}</p>
          )}
        </div>

        {/* Image Upload */}
        <div className="relative my-4">
          <label className="block text-gray-700 mb-2">Customer Image</label>
          <DragUploadImageInput
            getRootProps={getRootProps}
            getInputProps={getInputProps}
            image={thumbnail}
            imagePreview={thumbnailPreview}
          />
          {errors.thumbnail && (
            <p className="text-red-500">{errors.thumbnail}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="col-span-2">
          <button
            type="submit"
            className="customSaveButton w-full flex justify-center items-center gap-3"
            disabled={loading}
          >
            {!loading ? "Save Testimonial" : "Saving..."}
          </button>
        </div>
      </form>
    </div>
  );
}
