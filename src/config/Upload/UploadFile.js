import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

const UploadFile = ({
  file,
  folder,
  setFile_url = () => {},
  setProgress = () => {},
  path,
}) => {
  // Create the file metadata
  /** @type {any} */
  const metadata = {
    contentType: file.type,
  };

  const storage = getStorage();
  // Create a reference to where the file will be stored in Firebase Storage
  const reference =
    path ||
    `dotcard/${folder ? folder + "/" : ""}` + file.name.replaceAll(" ", "_");
  const storageRef = ref(storage, reference);
  const uploadTask = uploadBytesResumable(storageRef, file, metadata);

  // Listen for state changes, errors, and completion of the upload.
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progressData =
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setProgress(progressData); // Update progress in parent component

      "Upload is " + progressData + "% done";
      switch (snapshot.state) {
        case "paused":
          "Upload is paused";
          break;
        case "running":
          "Upload is running";
          break;
      }
    },

    (error) => {
      // Handle different Firebase storage errors
      switch (error.code) {
        case "storage/unauthorized":
          "User doesn't have permission to access the object";
          break;
        case "storage/canceled":
          "User canceled the upload";
          break;
        case "storage/unknown":
          "Unknown error occurred";
          break;
      }
    },
    () => {
      // Upload completed successfully, now we can get the download URL
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        "File available at", downloadURL;
        setFile_url({ key: reference, url: downloadURL }); // Update file URL in parent component
      });
    }
  );
};

export default UploadFile;
