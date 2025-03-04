// components/BlogEntryForm.js

const BlogEntryForm = () => {
  return (
    <form className="w-full max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg">
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="coverImage"
        >
          Cover Image *
        </label>
        <input
          type="file"
          id="coverImage"
          className="border rounded-lg p-2 w-full"
        />
      </div>

      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="category"
        >
          Category *
        </label>
        <select className="border rounded-lg p-2 w-full" id="category">
          <option value="1">Category 1</option>
          <option value="2">Category 2</option>
        </select>
      </div>

      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="blogTitle"
        >
          Blog Title *
        </label>
        <input
          type="text"
          id="blogTitle"
          className="border rounded-lg p-2 w-full"
          placeholder="Enter Blog Title"
        />
      </div>

      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="shortDescription"
        >
          Short Description
        </label>
        <textarea
          id="shortDescription"
          className="border rounded-lg p-2 w-full"
          placeholder="Enter Short Description"
        />
      </div>

      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="fullDescription"
        >
          Full Description
        </label>
        <textarea
          id="fullDescription"
          className="border rounded-lg p-2 w-full h-32"
          placeholder="Write Description Here"
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

export default BlogEntryForm;
