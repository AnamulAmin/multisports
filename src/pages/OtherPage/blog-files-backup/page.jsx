import { useState } from "react";
import useAxiosPublic from "../../../Hook/useAxiosPublic";
import toast from "react-hot-toast";

function BlogFilesBackup() {
  const [loading, setLoading] = useState(false);
  const axiosPublic = useAxiosPublic();
  const handleDownload = async () => {
    setLoading(true);
    try {
      // Send a request to the backend to get the ZIP file
      const response = await axiosPublic.get("/backup/images/blog");

      // Check if the response is OK
      if (!response.ok) {
        throw new Error("Failed to download file");
      }

      // Get the file as a blob
      const blob = await response.blob();

      // Create a temporary URL for the blob
      const url = window.URL.createObjectURL(blob);

      // Create an anchor element to trigger the download
      const a = document.createElement("a");
      a.href = url;
      a.download = "blog.zip"; // Specify the name of the downloaded file
      document.body.appendChild(a);
      a.click();

      // Clean up the temporary URL
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error downloading the file:", error);
      toast.error("An error occurred while downloading the file.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 px-10 py-5 rounded w-full mt-10">
      <h3 className="text-3xl mb-4 font-bold">Blog Files Backup</h3>
      <p className="text-xl">Download the blog files backup file.</p>

      <div className="flex justify-between items-center mt-10">
        <button
          //   href={data?.buttonLink}
          //   target="_blank"
          className="bg-pink-500 text-white px-4 py-2 rounded-2xl"
          onClick={handleDownload}
          disabled={loading}
        >
          {loading && (
            <span className="spinner-border spinner-border-sm"></span>
          )}
          Download Backup
        </button>
      </div>
    </div>
  );
}

export default BlogFilesBackup;
