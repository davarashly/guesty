import { Request, Response } from "express"
import { ObjectId } from "mongoose"

import AuthorModel from "@server/models/Author"
import BookModel from "@server/models/Book"
import Author, { validationKeys as authorValidationKeys } from "@/interfaces/Author"
import Book, { validationKeys as bookValidationKeys } from "@/interfaces/Book"

const checkIdValidity = (id: string | ObjectId) => id.toString().match(/^[0-9a-fA-F]{24}$/)

export const getBook = async (req: Request, res: Response) => {
	const id = req.params.id

	if (!checkIdValidity(id))
		return res.status(400).json({
			status: "fail",
			msg: `The id you provided is not valid`
		})

	const book = await BookModel.findById(id).populate("author")

	if (!book)
		return res.status(400).json({
			status: "fail",
			msg: `There is no book with id "${id}"`
		})

	return res.status(200).json({
		status: "success",
		data: { book }
	})
}

export const getBooks = async (req: Request, res: Response) => {
	const books = await BookModel.find({}).populate("author")

	return res.status(200).json({
		status: "success",
		data: { books }
	})
}

export const addBook = async (req: Request, res: Response) => {
	const book: Book = req.body.book

	if (!book)
		return res.status(400).json({
			status: "fail",
			msg: `You should send a proper Book object in JSON format`
		})

	const missingProps: string[] = []

	bookValidationKeys.forEach((key) => !book.hasOwnProperty(key) && missingProps.push(key))

	if (missingProps.length)
		return res.status(400).json({
			status: "fail",
			msg: `The properties '${missingProps.join(", ")}' are missing`,
			data: { missingProps }
		})


	if (book.author && !(checkIdValidity(book.author) && (await AuthorModel.findById(book.author))))
		return res.status(400).json({
			status: "fail",
			msg: `There is no author with id "${book.author}"`,
			invalidProps: ["author"]
		})

	const newBook = new BookModel(book)

	await newBook.save()

	return res.status(200).json({
		status: "success",
		msg: "Successfully created a new book",
		data: { book }
	})
}

export const editBook = async (req: Request, res: Response) => {
	const id = req.params.id

	const newBook: Book = req.body.book

	if (!newBook)
		return res.status(400).json({
			status: "fail",
			msg: `You should send a proper Book object in JSON format`
		})

	if (!checkIdValidity(id))
		return res.status(400).json({
			status: "fail",
			msg: `The id you provided is not valid`
		})

	const book: Book = await BookModel.findById(id)

	if (!book)
		return res.status(400).json({
			status: "fail",
			msg: `There is no book with id "${id}"`
		})

	if (newBook.author && !(checkIdValidity(newBook.author) && (await AuthorModel.findById(newBook.author))))
		return res.status(400).json({
			status: "fail",
			msg: `There is no author with id "${newBook.author}"`,
			invalidProps: ["author"]
		})

	Object.assign(book, newBook)

	await book.save()

	return res.status(200).json({
		status: "success",
		data: { book }
	})
}

export const getAuthor = async (req: Request, res: Response) => {
	const id = req.params.id

	if (!checkIdValidity(id))
		return res.status(400).json({
			status: "fail",
			msg: `The id you provided is not valid`
		})

	const author = await AuthorModel.findById(id)

	if (!author)
		return res.status(400).json({
			status: "fail",
			msg: `There is no author with id "${id}"`
		})

	return res.status(200).json({
		status: "success",
		data: { author }
	})
}

export const getAuthors = async (req: Request, res: Response) => {
	const authors = await AuthorModel.find({})

	return res.status(200).json({
		status: "success",
		data: { authors }
	})
}

export const addAuthor = async (req: Request, res: Response) => {
	const author: Author = req.body.author

	if (!author)
		return res.status(400).json({
			status: "fail",
			msg: `You should send a proper Author object in JSON format`
		})

	const missingProps: string[] = []

	authorValidationKeys.forEach((key) => !author.hasOwnProperty(key) && missingProps.push(key))

	if (missingProps.length)
		return res.status(400).json({
			status: "fail",
			msg: `The properties '${missingProps.join(", ")}' are missing`,
			data: { missingProps }
		})

	const newAuthor = new AuthorModel(author)

	await newAuthor.save()

	return res.status(200).json({
		status: "success",
		msg: "Successfully created a new author",
		data: { author }
	})
}

export const editAuthor = async (req: Request, res: Response) => {
	const id = req.params.id

	const newAuthor: Book = req.body.author

	if (!newAuthor)
		return res.status(400).json({
			status: "fail",
			msg: `You should send a proper Author object in JSON format`
		})

	if (!checkIdValidity(id))
		return res.status(400).json({
			status: "fail",
			msg: `The id you provided is not valid`
		})

	const author: Author = await AuthorModel.findById(id)

	if (!author)
		return res.status(400).json({
			status: "fail",
			msg: `There is no author with id "${id}"`
		})

	Object.assign(author, newAuthor)

	await author.save()

	return res.status(200).json({
		status: "success",
		data: { author }
	})
}
