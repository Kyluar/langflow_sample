import type { ApiEnvDtoOutput } from '@repo/schemas'
import { getConfig } from './utils.env'

export function validate(): ApiEnvDtoOutput {
	return getConfig()
}
