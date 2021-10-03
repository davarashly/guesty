export const port = process.env.PORT ?? 443
export const apiPrefix = process.env.API_PREFIX ?? "/api"
export const useHttps = process.env.HTTPS === "true"
export const isDev = process.env.NODE_ENV !== "PROD"
export const baseURL = process.env.BASE_URL ?? (process.env.BASE_URL = `${useHttps ? "https" : "http"}://localhost:${port}`)
