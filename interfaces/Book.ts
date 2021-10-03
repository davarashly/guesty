import { Document, PopulatedDoc } from "mongoose"
import Author from "@/interfaces/Author"

export default interface Book extends Document {
	bookName: string
	isbn: string
	author: PopulatedDoc<Author>
}

export const validationKeys: string[] = ["bookName", "isbn", "author"]
