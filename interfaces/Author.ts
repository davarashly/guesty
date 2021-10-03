import { Document } from "mongoose"

export default interface Author extends Document {
	firstName: string
	lastName: string
}

export const validationKeys: string[] = ["firstName", "lastName"]
