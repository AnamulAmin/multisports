function EditFormImage({ imageObject, imagePreview }) {
  return (
    <img
      src={
        imageObject == null
          ? `https://mgpwebaps.s3.eu-north-1.amazonaws.com/multi-sports/${imagePreview}`
          : imagePreview
      }
      alt="categoryIcon"
      width={200}
      height={200}
    />
  );
}

export default EditFormImage;
