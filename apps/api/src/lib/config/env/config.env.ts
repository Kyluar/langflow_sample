import type { ApiEnvDtoOutput } from '@repo/schemas'
import { getConfig } from './utils.env'

export function config(): ApiEnvDtoOutput {
	return getConfig()
}
