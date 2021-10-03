import { NuxtAxiosInstance } from "@nuxtjs/axios"
import { Plugin } from "@nuxt/types"
import { Inject } from "@nuxt/types/app"
import { NuxtRuntimeConfig } from "@nuxt/types/config/runtime"

const backendApi: Plugin = ({ $axios, $config }: { $axios: NuxtAxiosInstance; $config: NuxtRuntimeConfig }, inject: Inject) => {
	const baseURL = process.server ? $config.baseURL + $config.apiPrefix : $config.apiPrefix
	const $backendApi = $axios.create({
		baseURL
	})

	inject("backendApi", $backendApi)
}

declare module "vue/types/vue" {
	interface Vue {
		$backendApi: NuxtAxiosInstance
	}
}

declare module "@nuxt/types" {
	interface NuxtAppOptions {
		$backendApi: NuxtAxiosInstance
	}

	interface Context {
		$backendApi: NuxtAxiosInstance
	}
}

declare module "vuex/types/index" {
	interface Store<S> {
		$backendApi: NuxtAxiosInstance
	}
}

export default backendApi
