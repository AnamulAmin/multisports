import { useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../Hook/useAxiosSecure";
import { set } from "react-hook-form";

export default function CreateFAQForm({ isShowModal, setIsShowModal }) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const axiosSecure = useAxiosSecure();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!question) {
      Swal.fire({
        title: "Error!",
        text: "Please fill all the fields",
        icon: "error",
        confirmButtonText: "Ok",
      });
      return;
    }

    const formData = new FormData();
    formData.append("question", question);
    formData.append("answer", answer);

    try {
      const res = await axiosSecure.post("/faq", formData);

      if (res.status === 200 || res.status === 201) {
        handleCloseModal();
        Swal.fire({
          title: "Success!",
          text: "question created successfully",
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
    }
  };

  const handleCloseModal = () => {
    setIsShowModal(false);
    setQuestion("");
    setAnswer("");
  };

  return (
    <div className="w-full">
      <div className="w-full mx-auto bg-white p-8 shadow-md rounded-md">
        <h1 className="text-2xl font-semibold mb-7">Create question Form</h1>
        <form onSubmit={handleSubmit}>
          {/* Model Name */}
          <div className="mb-4">
            <label className="block text-gray-700 ">Question</label>
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="customInput"
              placeholder="Model Name"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Answer</label>
            <textarea
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="customInput resize-none"
              placeholder="Model Name"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              className="customCancelButton"
              onClick={() => handleCloseModal()}
            >
              Cancel
            </button>

            <button type="submit" className="customSaveButton">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
