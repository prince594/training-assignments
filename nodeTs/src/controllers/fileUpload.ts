import { Request, Response, NextFunction } from "express";
import multer from "multer";
import aws from "aws-sdk";
import config from "../config/config";
import multerS3 = require("multer-s3");

aws.config.update({
  accessKeyId: config.aws.AWS_ACCESS_KEY,
  secretAccessKey: config.aws.AWS_SECRET_ACCESS_KEY,
});
const s3 = new aws.S3();

const imageFilter = (req: any, file: any, cb: any) => {
  if (!file.originalname.match(/\.(JPG|jpg|jpeg|png|gif)$/)) {
    return cb(new Error("Only image files are allowed!"), false);
  }
  cb(null, true);
};

const storage = multerS3({
  s3,
  bucket: `${config.aws.AWS_BUCKET_NAME}`,
  cacheControl: "max-age=31536000",
  metadata: (req, file, cb) => {
    cb(null, { fieldName: file.fieldname });
  },
  key: (req, file, cb) => {
    cb(null, `${Date.now().toString()}.jpg`);
  },
});

const upload = multer({ fileFilter: imageFilter, storage: storage });

const fileUpload = async (req: any, res: Response, next: NextFunction) => {
  try {
    res.send({ message: "Your file is uploaded successfully" });
  } catch (error: any) {
    res.send(error);
  }
};

export default { fileUpload, upload };
