export interface ImageStorage {
  getPublicUrl(path: string): string;
  delete?(path: string): Promise<void>;
  upload?(file: File, destination: string): Promise<string>;
}

export const repositoryImageStorage: ImageStorage = {
  getPublicUrl(path) {
    if (path.startsWith("https://picsum.photos/") || path.startsWith("https://fastly.picsum.photos/") || path.startsWith("https://res.cloudinary.com/")) return path;
    if (!path.startsWith("/") || path.includes("..") || path.includes("\\")) throw new Error("Invalid public image path");
    return path;
  },
};
