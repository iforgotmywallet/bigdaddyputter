export const CLOUDINARY_PRODUCT_FOLDER = "bigdaddyputter/products";

export interface AdminImageInput {
  src: string;
  storageKey?: string | null;
  width?: number | null;
  height?: number | null;
}

export function isCloudinaryDeliveryUrl(src: string, cloudName?: string) {
  try {
    const url = new URL(src);
    const segments = url.pathname.split("/").filter(Boolean);
    return url.protocol === "https:"
      && url.hostname === "res.cloudinary.com"
      && (!cloudName || segments[0] === cloudName)
      && segments[1] === "image"
      && segments[2] === "upload";
  } catch {
    return false;
  }
}

export function isManagedCloudinaryKey(value: string) {
  return value.startsWith(`${CLOUDINARY_PRODUCT_FOLDER}/`)
    && !value.includes("..")
    && !value.includes("\\");
}

export function isApprovedImageSource(src: string, cloudName?: string) {
  if (src.startsWith("/images/") && !src.includes("..") && !src.includes("\\")) return true;
  if (src.startsWith("https://picsum.photos/") || src.startsWith("https://fastly.picsum.photos/")) return true;
  return isCloudinaryDeliveryUrl(src, cloudName);
}
