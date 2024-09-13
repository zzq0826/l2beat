'use client'
import { type Milestone } from '@l2beat/config'
import { useState } from 'react'
import { Chart } from '~/components/chart/core/chart'
import { ChartProvider } from '~/components/chart/core/chart-provider'
import {
  type ProjectToken,
  type ProjectTokens,
} from '~/server/features/scaling/tvl/tokens/get-tokens-for-project'
import { type TvlChartRange } from '~/server/features/scaling/tvl/utils/range'
import { api } from '~/trpc/react'
import { TokenCombobox } from '../../token-combobox'
import { type ChartScale, type ChartUnit } from '../types'
import { ProjectTokenChart } from './token/project-token-chart'
import { TvlChartHover } from './tvl-chart-hover'
import { TvlChartTimeRangeControls } from './tvl-chart-time-range-controls'
import { TvlChartUnitAndScaleControls } from './tvl-chart-unit-and-scale-controls'
import { useTvlChartRenderParams } from './use-tvl-chart-render-params'

interface Props {
  projectId: string
  milestones: Milestone[]
  tokens: ProjectTokens | undefined
  isBridge: boolean
}

export function ProjectTvlChart({
  projectId,
  milestones,
  tokens,
  isBridge,
}: Props) {
  const [token, setToken] = useState<ProjectToken>()
  const [scale, setScale] = useState<ChartScale>('lin')
  const [unit, setUnit] = useState<ChartUnit>('usd')

  const [timeRange, setTimeRange] = useState<TvlChartRange>('7d')

  if (tokens && token) {
    return (
      <ProjectTokenChart
        isBridge={isBridge}
        tokens={tokens}
        setToken={setToken}
        token={token}
        timeRange={timeRange}
        setTimeRange={setTimeRange}
        unit={unit}
        setUnit={setUnit}
        scale={scale}
        setScale={setScale}
        milestones={milestones}
        projectId={projectId}
      />
    )
  }

  return (
    <DefaultChart
      isBridge={isBridge}
      projectId={projectId}
      milestones={milestones}
      timeRange={timeRange}
      setTimeRange={setTimeRange}
      tokens={tokens}
      token={token}
      setToken={setToken}
      unit={unit}
      setUnit={setUnit}
      scale={scale}
      setScale={setScale}
    />
  )
}

interface DefaultChartProps {
  projectId: string
  isBridge: boolean
  milestones: Milestone[]
  timeRange: TvlChartRange
  setTimeRange: (timeRange: TvlChartRange) => void
  tokens: ProjectTokens | undefined
  token: ProjectToken | undefined
  setToken: (token: ProjectToken | undefined) => void
  unit: ChartUnit
  setUnit: (unit: ChartUnit) => void
  scale: ChartScale
  setScale: (scale: ChartScale) => void
}

function DefaultChart({
  projectId,
  milestones,
  isBridge,
  timeRange,
  setTimeRange,
  scale,
  setScale,
  unit,
  setUnit,
  tokens,
  setToken,
  token,
}: DefaultChartProps) {
  const { data, isLoading } = api.tvl.chart.useQuery({
    range: timeRange,
    filter: { type: 'projects', projectIds: [projectId] },
    excludeAssociatedTokens: false,
  })

  const { chartRange, formatYAxisLabel, valuesStyle, columns } =
    useTvlChartRenderParams({ milestones, unit, data: data?.chart })
  return (
    <ChartProvider
      columns={columns}
      valuesStyle={valuesStyle}
      formatYAxisLabel={formatYAxisLabel}
      range={chartRange}
      useLogScale={scale === 'log'}
      isLoading={isLoading}
      renderHoverContents={(data) => <TvlChartHover data={data} />}
    >
      <section className="flex flex-col gap-4">
        <TvlChartTimeRangeControls
          timeRange={timeRange}
          setTimeRange={setTimeRange}
          range={chartRange}
        />
        <Chart />
        <TvlChartUnitAndScaleControls
          unit={unit}
          scale={scale}
          setUnit={setUnit}
          setScale={setScale}
        >
          {tokens && (
            <TokenCombobox
              tokens={tokens}
              setValue={setToken}
              value={token}
              isBridge={isBridge}
            />
          )}
        </TvlChartUnitAndScaleControls>
      </section>
    </ChartProvider>
  )
}