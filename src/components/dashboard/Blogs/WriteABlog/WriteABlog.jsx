// pages/blog-entry.js

import SeoForm from "../../HomePageSEO_Components/HomePageSEO_Form";
import BlogEntryForm from "./BlogEntryForm";

const WriteABlog = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Create New Blog Post</h1>
      <BlogEntryForm />
      <SeoForm />
    </div>
  );
};

export default WriteABlog;
