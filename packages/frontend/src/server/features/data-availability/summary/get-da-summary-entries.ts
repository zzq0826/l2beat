import { type DaLayerRisks, daLayers, getDaProjectKey } from '@l2beat/config'
import { assert } from '@l2beat/shared-pure'
import { getProjectsVerificationStatuses } from '../../verification-status/get-projects-verification-statuses'
import { toDaBridge } from '../utils/get-da-bridge'
import { getUniqueProjectsInUse } from '../utils/get-da-projects'
import { getDaProjectsEconomicSecurity } from '../utils/get-da-projects-economic-security'
import {
  getDaProjectsTvl,
  pickTvlForProjects,
} from '../utils/get-da-projects-tvl'
import { getDaRisks } from '../utils/get-da-risks'
import { kindToType } from '../utils/kind-to-layer-type'

export async function getDaSummaryEntries() {
  const uniqueProjectsInUse = getUniqueProjectsInUse()
  const [economicSecurity, projectsVerificationStatuses, tvlPerProject] =
    await Promise.all([
      getDaProjectsEconomicSecurity(),
      getProjectsVerificationStatuses(),
      getDaProjectsTvl(uniqueProjectsInUse),
    ])
  const getSumFor = pickTvlForProjects(tvlPerProject)

  const entries = daLayers
    // Calculate total TVS for each bridge
    .map((daLayer) => ({
      ...daLayer,
      usedIn: daLayer.bridges.flatMap((bridge) => bridge.usedIn),
      tvs: getSumFor(
        daLayer.bridges.flatMap((bridge) =>
          bridge.usedIn.map((project) => project.id),
        ),
      ),
    }))
    // Sort by TVS
    .sort((a, b) => b.tvs - a.tvs)
    .map((daLayer) => {
      const projectEconomicSecurity = economicSecurity[daLayer.id]
      const daBridges = daLayer.bridges.map((daBridge) => {
        const tvs = getSumFor(daBridge.usedIn.map((project) => project.id))

        return {
          slug: daLayer.display.slug,
          name: daLayer.display.name,
          href: `/data-availability/projects/${daLayer.display.slug}/${daBridge.display.slug}`,
          daBridge: toDaBridge(daBridge),
          layerType: kindToType(daLayer.kind),
          risks: getDaRisks(daLayer, daBridge, tvs, projectEconomicSecurity),
          isUnderReview: !!daLayer.isUnderReview || daBridge.isUnderReview,
          isVerified:
            !!projectsVerificationStatuses[getDaProjectKey(daLayer, daBridge)],
          warning: daBridge.display.warning,
          redWarning: daBridge.display.redWarning,
          tvs,
          economicSecurity: projectEconomicSecurity,
          usedIn: daBridge.usedIn,
          subRows: [],
        }
      })

      if (daBridges.length === 0) {
        return []
      } else if (daBridges.length === 1 && daBridges[0]) {
        return daBridges
      }

      assert(daBridges[0], 'Expected at least one bridge')

      return [
        {
          slug: daLayer.display.slug,
          name: daLayer.display.name,
          href: daBridges[0]?.href,
          daBridge: 'multiple' as const,
          layerType: kindToType(daLayer.kind),
          isUnderReview: !!daLayer.isUnderReview,
          isVerified: true,
          warning: undefined,
          redWarning: undefined,
          economicSecurity: daBridges[0].economicSecurity,
          usedIn: daLayer.usedIn,
          risks: {
            economicSecurity: daLayer.risks.economicSecurity,
            fraudDetection: daLayer.risks.fraudDetection,
          } as DaLayerRisks,
          subRows: daBridges.map((daBridge) => ({
            ...daBridge,
            layerType: undefined,
            economicSecurity: undefined,
          })),
          tvs: daLayer.tvs,
        },
      ]
    })

  return entries.flat()
}

export type DaSummaryEntry = Awaited<
  ReturnType<typeof getDaSummaryEntries>
>[number]