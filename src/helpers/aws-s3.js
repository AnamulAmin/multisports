  import {
    S3Client,
    GetObjectCommand,
    DeleteObjectCommand,
  } from "@aws-sdk/client-s3";
  import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
  import { Upload } from "@aws-sdk/lib-storage";

  // Create an S3 client instance
  const s3Client = new S3Client({
    region: import.meta.env.AWS_REGION,
    credentials: {
      accessKeyId: import.meta.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: import.meta.env.AWS_SECRET_ACCESS_KEY,
    },
    // endpoint: `https://${import.meta.env.AWS_S3_BUCKET_NAME}.s3.${import.meta.env.AWS_REGION}.amazonaws.com`,
    endpoint: `https://s3.${import.meta.env.AWS_REGION}.amazonaws.com`,
    // endpoint: `https://${import.meta.env.AWS_S3_BUCKET_NAME}.${import.meta.env.AWS_REGION}.digitaloceanspaces.com`,
    // endpoint: `https://mgpwebaps.s3.eu-north-1.amazonaws.com`,
    forcePathStyle: true,
    // s3ForcePathStyle: true

  });

  export const uploadFile = async (file, fileName, mimeType) => {
    const fileBuffer = Buffer.from(await file.arrayBuffer());
    const upload = new Upload({
      client: s3Client,
      params: {
        Bucket: import.meta.env.AWS_S3_BUCKET_NAME,
        Key: `multi-sports/${fileName}`,
        Body: fileBuffer,
        forcePathStyle: false,
        ContentType: mimeType ? mimeType : "image",
      },
    });

    //   const command = new PutObjectCommand(params);
    const result = await upload.done();
    return result;
  };

  export const getFile = async (key) => {
    const params = {
      Bucket: import.meta.env.AWS_S3_BUCKET_NAME,
      Key: key,
    };

    const command = new GetObjectCommand(params);
    // Generate a signed URL for accessing the file
    return await getSignedUrl(s3Client, command, { expiresIn: 3600 }); // URL valid for 1 hour
  };

  export const deleteFile = async (key) => {
    const params = {
      Bucket: import.meta.env.AWS_S3_BUCKET_NAME,
      Key: `multi-sports/${key}`,
    };

    const command = new DeleteObjectCommand(params);
    return await s3Client.send(command);
  };
