import express from "express";
import controller from "../controllers/fileUpload";

const router = express.Router();
router.post("/", controller.upload.single("image"), controller.fileUpload);

export default router;
