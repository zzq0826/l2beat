import { type Stage } from '@l2beat/config'

import { cn } from '~/utils/cn'

export interface StageBadgeProps {
  stage: Stage | 'UnderReview' | 'NotApplicable'
  oneSize?: boolean
  big?: boolean
  className?: string
}

export function StageBadge({
  stage,
  oneSize,
  big,
  className,
}: StageBadgeProps) {
  const value =
    stage === 'UnderReview'
      ? 'In review'
      : stage === 'NotApplicable'
        ? undefined
        : stage
  return (
    <div className={cn('inline-flex items-center gap-1.5', className)}>
      <span
        className={cn(
          getColorClassName(stage),
          'inline-block h-min rounded px-1.5 text-center font-medium !leading-none',
          oneSize && 'w-20',
          big ? 'py-0.5 text-base md:text-lg' : 'py-[3px] text-xs',
          value && 'uppercase',
        )}
      >
        <span className="relative top-[0.5px]">{value ?? 'n/a'}</span>
      </span>
    </div>
  )
}

function getColorClassName(
  stage: Stage | 'UnderReview' | 'NotApplicable',
): string {
  switch (stage) {
    case 'Stage 2':
      return 'bg-green-800 text-white'
    case 'Stage 1':
      return 'bg-yellow-250 text-black'
    case 'Stage 0':
      return 'bg-orange-400 text-black'
    case 'UnderReview':
      return 'bg-zinc-700 text-yellow-200'
    case 'NotApplicable':
      return 'bg-gray-200 dark:bg-zinc-700 text-gray-500 dark:text-gray-400 !font-normal'
    default:
      return ''
  }
}
