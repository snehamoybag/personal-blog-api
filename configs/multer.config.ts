import multer from "multer";
import { CloudinaryStorage } from "./cloudinary.config";

const storage = new CloudinaryStorage({ folder: "uploads" });

export const imageUpload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5mb
  fileFilter(_req, file, callback) {
    // only accept image types
    if (file.mimetype.startsWith("image/")) {
      return callback(null, true);
    }

    callback(null, false);
  },
});
