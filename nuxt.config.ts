import { registerAliases, getAliases } from "./utils/registerAliases"

registerAliases()

import { NuxtOptions } from "@nuxt/types"
import { Server as ConnectServer } from "connect"

import { pathResolve, readFile } from "./utils"
import { port, apiPrefix, useHttps, isDev,baseURL } from "./utils/systemVariables"
import errorHandler from "./server/middlewares/errorHandler"

process.env.NODE_TLS_REJECT_UNAUTHORIZED = (+!isDev).toString()

const cfg: Partial<NuxtOptions> = {
	telemetry: false,
	isDev,
	router: {
		linkActiveClass: "active"
	},
	server: {
		port,
		host: "0.0.0.0",
		https: useHttps
			? {
					cert: readFile("./ssl/ssl.crt"),
					key: readFile("./ssl/ssl.key")
			  }
			: undefined
	},
	loading: false,
	alias: getAliases(),
	hooks: {
		render: {
			errorMiddleware(app: ConnectServer) {
				app.use(errorHandler)
			}
		}
	},
	serverMiddleware: [{ path: apiPrefix, handler: pathResolve("server", "app.ts") }],
	head: {
		titleTemplate: (title: string) => (title ? "ClamAV web ui | " + title : "ClamAV web ui"),
		htmlAttrs: {
			lang: "en"
		},
		meta: [
			{ charset: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
			},
			{ httpEquiv: "X-UA-Compatible", content: "ie=edge" }
		],
		link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
	},
	srcDir: "client",
	css: ["client/assets/sass/style.scss"],
	plugins: [
		{ src: "plugins/backendApi.ts" },
		{
			src: "plugins/bootstrap.ts",
			mode: "client"
		}
	],
	components: false,
	buildModules: ["@nuxt/typescript-build", "@nuxtjs/composition-api/module", "@nuxtjs/router-extras"],
	modules: ["@nuxtjs/axios"],
	publicRuntimeConfig: { apiPrefix,baseURL },
	axios: {
		browserBaseURL: "/",
		credentials: true
	},
	build: {
		splitChunks: {
			layouts: true
		},
		extractCSS: true
	}
}

export default cfg
