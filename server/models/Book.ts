import mongoose, { Schema } from "mongoose"
import IBook from "@/interfaces/Book"

const BookSchema = new Schema<IBook>({
	bookName: {
		type: String,
		required: true
	},
	isbn: {
		type: String,
		required: true
	},
	author: {
		type: Schema.Types.ObjectId,
		ref: "Author",
		required:true
	}
})

export default mongoose.models.Book ?? mongoose.model<IBook>("Book", BookSchema)
