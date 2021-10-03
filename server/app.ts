import express from "express"

import router from "@server/router"
import DBConnect from "@server/modules/DBConnect"

import "@server/models/Author"
import "@server/models/Book"

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(router)

DBConnect()

export default app
