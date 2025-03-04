// components/SeoForm.js

const SeoForm = () => {
  return (
    <form className="w-full max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg mt-6">
      <h2 className="text-xl font-bold mb-4">
        Blog SEO Information (Optional)
      </h2>

      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="metaTitle"
        >
          Meta Title
        </label>
        <input
          type="text"
          id="metaTitle"
          className="border rounded-lg p-2 w-full"
          placeholder="Meta Title"
        />
      </div>

      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="metaKeywords"
        >
          Meta Keywords
        </label>
        <input
          type="text"
          id="metaKeywords"
          className="border rounded-lg p-2 w-full"
          placeholder="Meta Keywords"
        />
      </div>

      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="metaDescription"
        >
          Meta Description
        </label>
        <textarea
          id="metaDescription"
          className="border rounded-lg p-2 w-full h-24"
          placeholder="Meta Description"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded-lg w-full"
      >
        Save Blog
      </button>
    </form>
  );
};

export default SeoForm;
