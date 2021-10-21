import express from "express";
import controller from "../controllers/fileUpload";
// import multer from 'multer';

// const upload = multer({dest: 'upload/'})

const router = express.Router();
// console.log(upload)
router.post("/", controller.upload.single("image"), controller.fileUpload);

export default router;
