import { NetworkExplorerRecord } from './entity'

export const selectNetworkExplorer = [
  'id',
  'networkId',
  'apiKey',
  'url',
  'type',
  'updatedAt',
  'createdAt',
] as const satisfies (keyof NetworkExplorerRecord)[]
