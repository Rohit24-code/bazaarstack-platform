import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";

type CloudinaryUploadResult = {
  url: string;
  publicId: string;
};

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadSingleBufferToCloudinary(
  file: Buffer,
  folder: string = "BazzarStack/products",
): Promise<CloudinaryUploadResult> {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "image",
      },
      (error, result) => {
        if (error) {
          reject(error);
        }
        if (!result) {
          return reject(new Error("Cloudinary Upload Failed !!"));
        } else {
          resolve({
            url: result?.secure_url,
            publicId: result?.public_id,
          });
        }
      },
    );

    // streamifier.createReadStream(file) turns your static bucket of data into a flowing stream.

    // Once you call .pipe(), Node.js starts moving chunks of your image from your server’s memory directly to Cloudinary’s servers.

    streamifier.createReadStream(file).pipe(uploadStream);
  });
}

export async function uploadManyBuffersToCloudinary(
  files: Buffer[],
  folder: string = "BazzarStack/products",
): Promise<CloudinaryUploadResult[]> {
  return Promise.all(
    files?.map((file) => uploadSingleBufferToCloudinary(file, folder)),
  );
}
