function DatabaseBackup() {
  const handleDownload = async () => {
    try {
      // Send a request to the backend to get the ZIP file
      const response = await fetch(
        "http://localhost:3000/api/backup/images/database"
      );

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
      a.download = "example.zip"; // Specify the name of the downloaded file
      document.body.appendChild(a);
      a.click();

      // Clean up the temporary URL
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error downloading the file:", error);
      toast.error("An error occurred while downloading the file.");
    }
  };

  return (
    <div className="bg-gray-100 px-10 py-5 rounded w-full mt-10">
      <h3 className="text-3xl mb-4 font-bold">Database Backup</h3>
      <p className="text-xl">Download the database backup file.</p>

      <div className="flex justify-between items-center mt-10">
        <button
          //   href={data?.buttonLink}
          //   target="_blank"
          className="bg-pink-500 text-white px-4 py-2 rounded-2xl"
          onClick={handleDownload}
        >
          Download Backup
        </button>
      </div>
    </div>
  );
}

export default DatabaseBackup;
