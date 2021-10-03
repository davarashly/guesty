import mongoose, { ConnectOptions } from "mongoose"

const DBConnect = async (): Promise<void> => {
	try {
		const uri = process.env.MONGO_URI || "mongodb://localhost:27017/"
		const cfg: ConnectOptions = {
			autoCreate: true,
			autoIndex: true
		}

		return await mongoose.connect(uri, cfg).then(({ connection }) => {
			console.log("Successfully connected to DB")
			connection.on("disconnected", () => {
				console.error("Disconnected from DB...")
				console.error("Connecting again...")
				return DBConnect()
			})
		})
	} catch (e) {
		console.error("Unable to connect to DB...")
		console.error("Connecting again...")
		return DBConnect()
	}
}

export default DBConnect
