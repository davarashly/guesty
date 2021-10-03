import { getTsConfig, pathResolve } from "./"
import { register } from "tsconfig-paths"

const tsConfig = getTsConfig()

export const getAliases = () =>
	Object.entries<string[]>(tsConfig.compilerOptions?.paths ?? {}).reduce<{ [key: string]: string }>(
		(accum, [key, [val]]) => ({
			[key.replace(/\/\*/gm, "")]: pathResolve(val.replace(/\/\*/gm, "")),
			...accum
		}),
		{}
	)

export const registerAliases = () =>
	register({
		baseUrl: pathResolve(__dirname, "../"),
		paths: tsConfig.compilerOptions?.paths ?? {}
	})
