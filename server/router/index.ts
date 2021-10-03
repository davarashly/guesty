import { Router } from "express"
import { asyncHandler } from "@server/middlewares/errorHandler"
import { addAuthor, addBook, editAuthor, editBook, getAuthor, getAuthors, getBook, getBooks } from "@server/controllers"

const router = Router()

router.get("/books", asyncHandler(getBooks))
router.get("/books/:id", asyncHandler(getBook))
router.post("/books", asyncHandler(addBook))
router.put("/books/:id", asyncHandler(editBook))

router.get("/authors", asyncHandler(getAuthors))
router.get("/authors/:id", asyncHandler(getAuthor))
router.post("/authors", asyncHandler(addAuthor))
router.put("/authors/:id", asyncHandler(editAuthor))


export default router
