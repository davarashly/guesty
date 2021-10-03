import mongoose, { Schema } from "mongoose"
import IAuthor from "@/interfaces/Author"

const AuthorSchema = new Schema<IAuthor>({
	firstName: {
		type: String,
		required: true
	},
	lastName: {
		type: String,
		required: true
	}
})

export default mongoose.models.Author ?? mongoose.model<IAuthor>("Author", AuthorSchema)
