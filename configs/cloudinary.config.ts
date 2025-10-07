import "dotenv/config";
import {
  v2 as cloudinary,
  UploadApiOptions,
  UploadApiResponse,
} from "cloudinary";
import type { Request } from "express";
import type { StorageEngine } from "multer";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
  secure_distribution: process.env.EDITOR_URL,
});

// custom multer storage setup to upload files directly to cloudinary
interface StorageOptions {
  folder?: string;
}

/**
 * A custom Multer storage engine for Cloudinary
 */
export class CloudinaryStorage implements StorageEngine {
  private folder: string;
  cloudinary = cloudinary;

  constructor(opts: StorageOptions = {}) {
    // cloudinary folder where the files will be uploaded
    // defaults to '/personal-blog/uploads'
    this.folder = `/personal-blog/${opts.folder || "uploads"}`;
  }

  _handleFile = (
    _req: Request,
    file: Express.Multer.File,
    cb: (error?: any, info?: Partial<Express.Multer.File>) => void,
  ): void => {
    // cloudinary upload options
    const streamOptions: UploadApiOptions = {
      folder: this.folder,
      resource_type: "auto",
      unique_filename: true, // cloudinary will handle uniqueness
    };

    const uploadStream = this.cloudinary.uploader.upload_stream(
      streamOptions,
      (err, result?: UploadApiResponse) => {
        if (err) {
          return cb(err);
        }

        if (!result) {
          return cb(new Error("Empty upload result."));
        }

        // extract file info from result and return it in multer file format
        cb(null, {
          path: result.secure_url,
          originalname: file.originalname,
          filename: result.public_id,
          size: result.bytes,
          mimetype: file.mimetype,
          encoding: result.encoding,
        });
      },
    );

    try {
      file.stream.pipe(uploadStream);
    } catch (err) {
      return cb(err);
    }
  };

  _removeFile = (
    _req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null) => void,
  ): void => {
    try {
      this.cloudinary.uploader.destroy(file.filename, cb);
    } catch (err) {
      if (err instanceof Error) {
        return cb(err);
      }

      return cb(new Error("Failed to remove cloud file."));
    }
  };
}
