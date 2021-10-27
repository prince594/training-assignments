import express from "express";
import controller from "../controllers/user";

const router = express.Router();
router.get("/all", controller.getUsers);
router.post("/signup", controller.signup);
router.post("/login", controller.login); // with token, email and password

export = router;
