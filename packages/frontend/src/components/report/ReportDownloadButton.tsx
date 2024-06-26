import React from 'react'

import { cn } from '../../utils/cn'
import { DownloadArrow } from '../icons/DownloadArrow'

interface ReportDownloadButtonProps {
  fileUrl: string
  className?: string
}

export function ReportDownloadButton({
  fileUrl,
  className,
}: ReportDownloadButtonProps) {
  return (
    <a
      className={cn(
        'flex items-center justify-center rounded-md bg-pink-900 py-4 font-medium text-white transition-colors md:w-1/3 hover:bg-pink-800 md:py-5',
        className,
      )}
      href={fileUrl}
      target="_blank"
    >
      <DownloadArrow className="mr-3" />
      Download the report
    </a>
  )
}
