import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../Hook/useAxiosSecure";

export default function EditFAQForm({ targetId, setIsShowModal, isShowModal }) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    async function fetchQuestionData() {
      try {
        const res = await axiosSecure.get(`/faq/${targetId}`);
        const questionData = res?.data?.data;

        // Populate form fields with existing data
        setQuestion(questionData.question);
        setAnswer(questionData.answer);
      } catch (error) {
        console.error("Error fetching question data:", error);
      }
    }

    if (targetId) {
      fetchQuestionData();
    }

    if (!isShowModal) {
      handleCloseModal();
    }
  }, [targetId, axiosSecure, isShowModal]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("question", question);
    formData.append("answer", answer);

    try {
      const res = await axiosSecure.put(`/faq/${targetId}`, formData);

      if (res.status === 200 || res.status === 201) {
        Swal.fire({
          title: "Success!",
          text: "question updated successfully",
          icon: "success",
          confirmButtonText: "Ok",
        });
      }
      setIsShowModal(false);
    } catch (err) {
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
  };

  return (
    <div className="w-full">
      <div className="w-full mx-auto bg-white p-8 shadow-md rounded-md">
        <h1 className="text-2xl font-semibold mb-7">Edit Product Color Form</h1>
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

          <div className="flex justify-end mt-4 gap-6">
            <button
              type="button"
              className="customCancelButton"
              onClick={() => handleCloseModal()}
            >
              Cancel
            </button>
            <button type="submit" className="customSaveButton">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
