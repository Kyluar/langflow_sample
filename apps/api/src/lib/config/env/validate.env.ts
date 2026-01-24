import type { ApiEnvDtoOutput } from '@repo/schemas/config/env'
import { getConfig } from './utils.env'

export function validate(): ApiEnvDtoOutput {
	return getConfig()
}
