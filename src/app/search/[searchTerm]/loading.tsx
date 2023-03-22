import React from 'react'

import Section from '@/components/layout/Section'
import Skeleton from '@/components/skeleton/Skeleton'

export default function loading() {
  return (
    <Section title="Artists">
      <Skeleton gridFlow="topBottom" imageSize="medium" imageShape="round" contentAmount={12} gridSize="broad" />
    </Section>
  )
}
