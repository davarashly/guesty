import { NextFunction, Request, Response } from "express"
import { ErrorHandleFunction } from "connect"

const errorHandler: ErrorHandleFunction = async (err, req, res, next) => {
	if (err) {
		console.error(err)

		res.writeHead(500, { "Content-Type": "application/json" })

		return res.end(
			JSON.stringify({
				status: "error",
				error: {
					msg: err.message ?? err,
					name: err.name
				}
			})
		)
	}

	next()
}

export const asyncHandler = (fn: any) => (req: Request, res: Response, next: NextFunction) => Promise.resolve(fn(req, res, next)).catch(next)

export default errorHandler
