import { useEffect, useRef, useState } from "react";
import AvatarEditor from "react-avatar-editor";
import useAxiosSecure from "../Hook/useAxiosSecure";
import Swal from "sweetalert2";
import Dropzone, { useDropzone } from "react-dropzone";
import { FiUploadCloud } from "react-icons/fi";
import { useAuth } from "../providers/AuthProvider";

const AvatarEditorComponent = ({ image, setImage, setIsShow, isShow }) => {
  const { user, setUser } = useAuth();
  const editorRef = useRef(null);
  const [zoom, setZoom] = useState(1);
  const [borderRadius, setBorderRadius] = useState(50);
  const [width, setWidth] = useState(200);
  const [height, setHeight] = useState(200);
  const [rotation, setRotation] = useState(0);
  const [showGrid, setShowGrid] = useState(true);
  const [isPending, setIsPending] = useState(false);
  const axiosSecure = useAxiosSecure();

  const rotateLeft = () => setRotation((prev) => prev - 15);
  const rotateRight = () => setRotation((prev) => prev + 15);

  const saveImage = async () => {
    if (editorRef.current) {
      const canvas = editorRef.current.getImageScaledToCanvas();
      const imageBlob = await new Promise((resolve) =>
        canvas.toBlob(resolve, "image/png")
      );

      const formData = new FormData();
      formData.append("image", imageBlob);

      try {
        const response = await axiosSecure.post(
          `/users/change-user-photo/${user.email}`,
          formData
        );

        if (response.status === 200 || response.status === 201) {
          setUser(response.data?.user);
          localStorage.setItem("user", JSON.stringify(response?.data?.user));
          setIsPending(false);
          Swal.fire({
            title: "Success!",
            text: "Password changed successfully!",
            icon: "success",
            confirmButtonText: "Ok",
          });
          setIsShow(false);
        }
        setIsPending(false);
      } catch (error) {
        setIsPending(false);

        Swal.fire({
          title: "Oops...",
          text: error?.response?.data?.message || error?.message,
          icon: "error",
          confirmButtonText: "Ok",
        });
        setIsPending(false);
      }
    }
  };

  const onDropImage = (acceptedFiles) => {
    setImage(acceptedFiles[0]);
  };

  const { getRootProps: getRootProps, getInputProps: getInputProps } =
    useDropzone({
      onDrop: onDropImage,
      accept: "image/*",
      multiple: false,
    });

  useEffect(() => {
    if (!isShow) {
      setImage(null);
    }
  }, [isShow]);

  return (
    <div className="flex flex-col items-center gap-4 bg-white p-6 w-full max-w-[800px] rounded-2xl">
      <h1 className="text-2xl font-bold">Avatar Editor</h1>

      {/* <input type="file" accept="image/*" onChange={handleImageChange} /> */}

      <div className="w-full p-4 border-dashed min-h-[200px] flex flex-col items-center justify-center border-2 border-gray-300 rounded-2xl text-center cursor-pointer relative">
        <div {...getRootProps()} className="w-full h-full absolute z-40">
          {/* <label
          htmlFor="upload"
          className="absolute top-0 left-0 right-0 bottom-0 block"
          >
          upload
          </label> */}
          <input {...getInputProps()} id="upload" />
        </div>

        <div
          className={`relative z-50 flex flex-col items-center justify-center ${
            !image ? "pointer-events-none" : ""
          }`}
        >
          {image ? (
            <AvatarEditor
              ref={editorRef}
              image={image}
              width={width}
              height={height}
              border={50}
              borderRadius={borderRadius}
              color={showGrid ? [255, 255, 255, 0.6] : [255, 255, 255, 0]} // White with opacity for grid
              scale={zoom}
              rotate={rotation}
            />
          ) : (
            <>
              <FiUploadCloud size={60} />
              <p className="text-xl">Drag and drop a file here or click</p>
            </>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-8 justify-center items-center w-full max-w-[80%]">
        <div className="flex justify-center items-center gap-3">
          <label>Zoom:</label>
          <input
            type="range"
            min="1"
            max="10"
            step="0.1"
            value={zoom}
            onChange={(e) => setZoom(Number(e.target.value))}
          />
        </div>

        <div className="flex justify-center items-center gap-3">
          <label>Border Radius:</label>
          <input
            type="range"
            min="0"
            max="200"
            step="1"
            value={borderRadius}
            onChange={(e) => setBorderRadius(Number(e.target.value))}
          />
        </div>

        <div className="flex justify-center items-center gap-3">
          <label>Avatar Width:</label>
          <input
            type="number"
            value={width}
            onChange={(e) => setWidth(Number(e.target.value))}
            className="input input-bordered input-primary w-full max-w-xs"
          />
        </div>

        <div className="flex justify-center items-center gap-3">
          <label>Avatar Height:</label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(Number(e.target.value))}
            className="input input-bordered input-primary w-full max-w-xs"
          />
        </div>

        <div className="flex justify-center items-center gap-3">
          <label>Rotation:</label>
          <input
            type="range"
            min="0"
            max="360"
            step="1"
            value={rotation}
            onChange={(e) => setRotation(Number(e.target.value))}
          />
        </div>

        <div className="flex justify-center items-center gap-3">
          <label>Show Grid:</label>
          <input
            type="checkbox"
            checked={showGrid}
            onChange={(e) => setShowGrid(e.target.checked)}
            className="checkbox checkbox-info"
          />
        </div>
      </div>

      <div className="flex gap-6 mt-6">
        <button
          onClick={rotateLeft}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Rotate Left
        </button>
        <button
          onClick={rotateRight}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Rotate Right
        </button>
        <button
          onClick={saveImage}
          disabled={isPending}
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          Save Avatar
        </button>
        <button type="button" className="btn" onClick={() => setIsShow(false)}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AvatarEditorComponent;
