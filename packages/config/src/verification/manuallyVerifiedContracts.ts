import { existsSync, readFileSync } from 'fs'
import path from 'path'
import { ManuallyVerifiedContractsPerChain } from '@l2beat/shared-pure'
import { ParseError, parse } from 'jsonc-parser'

export function parseManuallyVerifiedContracts(
  content: string,
): ManuallyVerifiedContractsPerChain {
  const errors: ParseError[] = []
  const parsed = parse(content, errors, {
    allowTrailingComma: true,
  }) as Record<string, string>
  if (errors.length !== 0) {
    throw new Error('Cannot parse manuallyVerified.jsonc')
  }

  // biome-ignore lint/performance/noDelete: not a performance problem
  delete parsed.$schema

  return ManuallyVerifiedContractsPerChain.parse(parsed)
}

export function getManuallyVerifiedContracts(
  chain: string,
): ManuallyVerifiedContractsPerChain {
  const jsonFilePath = path.resolve(
    __dirname,
    `${chain}/manuallyVerified.jsonc`,
  )

  if (!existsSync(jsonFilePath)) {
    return ManuallyVerifiedContractsPerChain.parse({})
  }

  const content = readFileSync(jsonFilePath, 'utf-8')
  return parseManuallyVerifiedContracts(content)
}
