import "server-only";

import { randomUUID } from "node:crypto";
import { v2 as cloudinary } from "cloudinary";
import { CLOUDINARY_PRODUCT_FOLDER, isManagedCloudinaryKey } from "@/lib/images/paths";

function getCredentials() {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error("Cloudinary environment variables are not configured");
  }
  cloudinary.config({ cloud_name: cloudName, api_key: apiKey, api_secret: apiSecret, secure: true });
  return { cloudName, apiKey, apiSecret };
}

export function createCloudinaryUploadSignature() {
  const { cloudName, apiKey, apiSecret } = getCredentials();
  const timestamp = Math.floor(Date.now() / 1000);
  const storageKey = `${CLOUDINARY_PRODUCT_FOLDER}/${randomUUID()}`;
  const signature = cloudinary.utils.api_sign_request({ public_id: storageKey, timestamp }, apiSecret);
  return { cloudName, apiKey, timestamp, storageKey, signature };
}

export async function deleteCloudinaryImage(storageKey: string) {
  if (!isManagedCloudinaryKey(storageKey)) throw new Error("Invalid Cloudinary product image key");
  getCredentials();
  return cloudinary.uploader.destroy(storageKey, { invalidate: true, resource_type: "image" });
}
