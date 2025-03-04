import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { set } from "react-hook-form";
import Swal from "sweetalert2";
import * as XLSX from "xlsx";
import useAxiosSecure from "../../../Hook/useAxiosSecure";

export default function BulkUpload() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const axiosSecure = useAxiosSecure();

  const handleSubmit = async (data) => {
    try {
      const res = await axiosSecure.post("/products/bulk", data);

      if (res.status === 200 || res.status === 201) {
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

  // Handle file drop using react-dropzone
  const onDrop = (acceptedFiles) => {
    const selectedFile = acceptedFiles[0];
    setFile(selectedFile);
    setMessage("");
  };

  // Parsing the Excel file
  // const handleFileUpload = () => {
  //   if (!file) {
  //     setMessage("Please select a file first.");
  //     return;
  //   }

  //   const reader = new FileReader();
  //   reader.onload = (e) => {
  //     const data = new Uint8Array(e.target.result);
  //     const workbook = XLSX.read(data, { type: "array" });
  //     const firstSheetName = workbook.SheetNames[0];
  //     const worksheet = workbook.Sheets[firstSheetName];
  //     const jsonData = XLSX.utils.sheet_to_json(worksheet);
  //

  //     setMessage("Products uploaded successfully!");
  //   };
  //   reader.readAsArrayBuffer(file);
  // };

  const handleFileUpload = (event) => {
    try {
      // const file = event.target.files[0];
      if (!file) {
        setMessage("No file selected");
        return;
      }

      const fileExtension = file.name.split(".").pop().toLowerCase();
      const reader = new FileReader();

      // Handle JSON files
      if (fileExtension === "json") {
        reader.onload = (e) => {
          try {
            const jsonData = JSON.parse(e.target.result);
            handleSubmit({ type: "json", data: jsonData });
          } catch (parseError) {
            setMessage("Invalid JSON file");
          }
        };
        reader.readAsText(file);
        return;
      }

      // Handle CSV files
      if (fileExtension === "csv") {
        reader.onload = (e) => {
          const csvData = e.target.result;
          handleSubmit({ type: "csv", data: csvData });
        };
        reader.readAsText(file);
        return;
      }

      // Handle Excel files (.xlsx or .xls)
      if (fileExtension === "xlsx" || fileExtension === "xls") {
        reader.onload = (e) => {
          const arrayBuffer = e.target.result;
          const workbook = XLSX.read(arrayBuffer, { type: "array" });
          const sheetName = workbook.SheetNames[0]; // Get the first sheet
          const worksheet = workbook.Sheets[sheetName];
          const json = XLSX.utils.sheet_to_json(worksheet);
          handleSubmit({ type: "excel", data: json });
        };
        reader.readAsArrayBuffer(file);
        return;
      }

      setMessage("Unsupported file type");
    } catch (err) {
      console.error("Error uploading file:", err);
      setMessage("An error occurred while processing the file");
    }
  };

  // react-dropzone hook
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: ".xlsx, .xls",
    multiple: false,
  });

  return (
    <div className="p-6 pt-0">
      <div className="">
        <h1 className="text-3xl font-semibold mb-9">
          Upload Products from Excel
        </h1>
        <div className="grid grid-cols-2 gap-4">
          {/* Left Side Image */}
          <div className="flex items-center justify-center">
            <img
              width={400}
              height={400}
              src="/images/excel-upload-illustration.svg"
              alt="Excel Upload"
              className="w-full h-auto"
            />
          </div>

          {/* Right Side Instructions and File Upload */}
          <div>
            <p className="mb-4">
              You can upload products using Excel files, but the format of the
              Excel file must match our sample file below. It is better to use
              our demo Excel file, fill in the data, and upload it to our
              system.
            </p>
            <a
              href="/demo/products.xlsx"
              download
              className="text-blue-500 underline"
            >
              Demo Excel File: products.xlsx
            </a>

            {/* File Dropzone */}
            <div
              {...getRootProps()}
              className="mt-4 p-4 py-20 border-dashed border-2 border-gray-300 rounded-md text-center cursor-pointer"
            >
              <input {...getInputProps()} />
              {file ? (
                <p>{file.name}</p>
              ) : (
                <p>Drag & drop an Excel file here, or click to browse</p>
              )}
            </div>

            {/* Upload Button */}
            <button
              type="button"
              onClick={handleFileUpload}
              className="customSaveButton mt-7 mb-3"
            >
              Upload Products
            </button>

            {/* Message */}
            {message && <p className="mt-4 text-green-500">{message}</p>}

            <p className="mt-2 text-gray-500">
              Please be patient. Uploading products may take a few minutes
              depending on the volume of data.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
