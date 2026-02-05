export enum RESOURCES {
	USERS = 'users',
	DOCUMENTS = 'documents'
}

type RouteProps = {
	BASE: string
	BY_ID: (id: string | number) => string
}

type ROUTES = Record<keyof typeof RESOURCES, RouteProps>

export const API_ROUTES: ROUTES = {
	USERS: {
		BASE: `/${RESOURCES.USERS}`,
		BY_ID: (id: string | number) => `/${RESOURCES.USERS}/${id}`
	},
	DOCUMENTS: {
		BASE: `/${RESOURCES.DOCUMENTS}`,
		BY_ID: (id: string | number) => `/${RESOURCES.DOCUMENTS}/${id}`
	}
} as const
