import express from "express";
import controller from "../controllers/books";
import route from "../middlewares/routesAuth";

const router = express.Router();

router
  .get("/", route.protect, controller.getBooks)
  .get("/:bookId", route.protect, controller.getBooks)

  .post("/", route.protect, controller.createBooks)

  .patch("/:bookId", route.protect, controller.patchABook)

  .delete("/:bookId", route.protect, controller.removeABook);

export = router;
