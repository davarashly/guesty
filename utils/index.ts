import { readFileSync } from "fs"
import { resolve } from "path"
import { TSConfigJSON } from "types-tsconfig"

export const pathResolve = resolve
export const readFile = (path: string): Buffer => readFileSync(pathResolve(path))
export const getTsConfig = (): TSConfigJSON => JSON.parse(readFile(__dirname + "/../tsconfig.json").toString())
