import React from 'react'

import { EM_DASH } from '../../utils/constants'
import { isZeroUSD } from '../../utils/utils'
import { TokenControl } from '../chart/TokenControls'
import { Tooltip, TooltipContent, TooltipTrigger } from '../tooltip/Tooltip'
import { NumberCell } from './NumberCell'

export interface ValueWithPercentageCellProps {
  value?: string
  percentChange?: string
  tokens?: TokenControl[]
}

export function ValueWithPercentageCell(props: ValueWithPercentageCellProps) {
  return (
    <>
      {props.value && !isZeroUSD(props.value) ? (
        <>
          {props.tokens ? (
            <Tooltip big>
              <TooltipTrigger>
                <NumberCell className="inline font-bold">
                  {props.value}
                </NumberCell>
                <NumberCell signed className="!text-base ml-1 font-medium">
                  {props.percentChange}
                </NumberCell>
              </TooltipTrigger>
              <TooltipContent>
                <TokenGridTooltip tokens={props.tokens} />
              </TooltipContent>
            </Tooltip>
          ) : (
            <div>
              <NumberCell className="inline font-bold">
                {props.value}
              </NumberCell>
              <NumberCell signed className="!text-base ml-1 font-medium">
                {props.percentChange}
              </NumberCell>
            </div>
          )}
        </>
      ) : (
        <div className="flex w-full justify-center">
          <span className="font-bold text-base md:text-lg">{EM_DASH}</span>
        </div>
      )}
    </>
  )
}

interface TokenGridTooltipProps {
  tokens: TokenControl[]
}

function TokenGridTooltip({ tokens }: TokenGridTooltipProps) {
  if (tokens.length === 0) {
    return <span>No tokens</span>
  }

  const top15 = tokens.slice(0, 15)
  // NOTE(radomski): Explanation of the
  // `grid-cols-[repeat(3,minmax(0,_1fr))_auto]`. I want a four columned grid
  // where the first three cells are of equal size and the fourth is free to
  // grow.
  const styling =
    tokens.length <= 4
      ? 'flex flex-wrap gap-x-4'
      : 'grid grid-cols-[repeat(3,minmax(0,_1fr))_auto] gap-x-4 gap-y-3'

  return (
    <div className={styling}>
      {top15.map((t, i) => (
        <div className="flex items-center gap-1.5" key={i}>
          <img src={t.iconUrl} className="size-4 rounded-full" />
          <span className="font-bold text-xs">{t.info.symbol}</span>
        </div>
      ))}
      {tokens.length > 15 && (
        <span className="text-gray-550 text-xs">and more</span>
      )}
    </div>
  )
}
