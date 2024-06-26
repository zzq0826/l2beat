import React from 'react'

import { cn } from '../../utils/cn'
import { HorizontalSeparator } from '../HorizontalSeparator'
import { InfoIcon } from '../icons'
import { Tooltip, TooltipContent, TooltipTrigger } from '../tooltip/Tooltip'

export function ActivityHeader() {
  return (
    <header className="mb-4" data-role="chart-header">
      <div className="flex items-baseline justify-between">
        <h1 className="mb-1 font-bold text-3xl">Activity</h1>
        <p className="text-right font-bold text-3xl group-data-[interactivity-disabled]/chart:pointer-events-none group-data-[interactivity-disabled]/chart:opacity-0">
          <span className="hidden text-sm md:inline md:text-2xl">
            Scaling factor:{' '}
          </span>
          <span data-role="chart-header-value">...</span>
        </p>
      </div>
      <div className="flex items-baseline justify-between text-xs md:text-base">
        <p className="hidden text-gray-500 md:block dark:text-gray-600">
          Transactions per second
        </p>
        <div
          className={cn(
            'w-full text-right text-gray-500 md:w-auto dark:text-gray-600',
            'flex items-center gap-1.5',
            'group-data-[interactivity-disabled]/chart:pointer-events-none group-data-[interactivity-disabled]/chart:opacity-0',
          )}
        >
          Observed over the last 7 days
          <Tooltip>
            <TooltipTrigger>
              <InfoIcon />
            </TooltipTrigger>
            <TooltipContent>
              <span>
                How many more transactions are settled by Ethereum if we take
                into account projects listed below.
              </span>
              <br />
              <span>Exact formula:</span>
              <br />
              <span>(project txs/7d + ETH txs/7d) / ETH txs/7d</span>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
      <HorizontalSeparator className="mt-2 md:hidden" />
    </header>
  )
}
