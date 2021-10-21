import { Request, Response, NextFunction } from "express";
import services from "../services/books";

const NAMESPACE = "Books Controller";
/* POST */
const createBooks = async (req: any, res: Response, next: NextFunction) => {
  try {
    let reqData: any = req.body;
    console.log(reqData);
    let resData: any = await services.postData(reqData);

    return res.send(resData);
  } catch (error: any) {
    res.send(error);
  }
};
/* PATCH */
const patchABook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let bookId: any = req.params.bookId;
    let patchRes: any = await services.patchById(bookId);
    return res.send(patchRes);
  } catch (error: any) {
    res.send(error);
  }
};
/* GET */
const getBooks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log(req.query);
    const data: any = await services.finder(req.params.bookId);
    const results: any = {
      books: data,
      count: data.length,
    };
    return res.send(results);
  } catch (error: any) {
    res.send(error);
  }
};
/* DELETE */
const removeABook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let bookId: any = req.params.bookId;
    let deletedRes: any = await services.removeById(bookId);
    return res.send(deletedRes);
  } catch (error: any) {
    res.send(error);
  }
};

export default { getBooks, createBooks, patchABook, removeABook };
