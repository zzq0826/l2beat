import React from 'react'

import { GovernanceEventEntry } from '../../../pages/governance/index/props/getGovernanceEventEntries'
import { cn } from '../../../utils/cn'
import { Link } from '../../Link'
import { OutLinkIcon } from '../../icons'
import { GovernanceCard, GovernanceCardHeader } from '../GovernanceCard'

interface Props {
  events: GovernanceEventEntry[]
  className?: string
}

export function GovernanceEventsSection({ events, className }: Props) {
  return (
    <GovernanceCard as="section" mobileFull className={className}>
      <div className="flex flex-wrap justify-between gap-2">
        <GovernanceCardHeader>Governance events</GovernanceCardHeader>
      </div>
      <div className="mt-6 grid gap-4 lg:grid-cols-4 md:grid-cols-2">
        {events.map((event, i) => (
          <Event event={event} key={i} />
        ))}
      </div>
    </GovernanceCard>
  )
}

function Event({ event }: { event: GovernanceEventEntry }) {
  const hostname = new URL(event.link).hostname

  return (
    <GovernanceCard
      type={event.highlighted ? 'purple' : 'secondary'}
      size="medium"
      className="flex flex-col justify-between md:h-[288px]"
    >
      <div className="md:h-28">
        {event.subtitle && (
          <p
            className={cn(
              'font-semibold text-purple-100 text-xs uppercase dark:text-pink-200',
              event.highlighted && 'text-pink-200',
            )}
          >
            {event.subtitle}
          </p>
        )}
        <p className="font-semibold text-lg leading-tight">{event.title}</p>
        <Link
          href={event.link}
          className="mt-2"
          textClassName={cn('text-xs', event.highlighted && 'text-white')}
          type={event.highlighted ? 'plain' : 'primary'}
        >
          {hostname}
          {<OutLinkIcon />}
        </Link>
      </div>
      <div>
        <div className="mt-4">
          <p className="text-2xs opacity-50">DATE</p>
          <p className="whitespace-pre-line text-sm">{event.displayDate}</p>
        </div>
        {event.location && (
          <div className="mt-3">
            <p className="text-2xs opacity-50">PLACE</p>
            <p className="whitespace-pre-line text-sm">{event.location}</p>
          </div>
        )}
      </div>
    </GovernanceCard>
  )
}
