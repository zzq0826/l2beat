import { notFound } from 'next/navigation'
import React from 'react'
import { ContentWrapper } from '~/components/content-wrapper'
import { Footer } from '~/components/footer'
import { NavLayout } from '~/components/nav/nav-layout'
import { env } from '~/env'

export default function Layout({ children }: { children: React.ReactNode }) {
  if (!env.NEXT_PUBLIC_FEATURE_FLAG_DA_BEAT) {
    return notFound()
  }

  return (
    <NavLayout logoLink="/data-availability/summary">
      <div className="min-h-screen">
        <ContentWrapper className="mt-16">{children}</ContentWrapper>
      </div>
      <Footer />
    </NavLayout>
  )
}
