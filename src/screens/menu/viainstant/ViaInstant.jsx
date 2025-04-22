import React from 'react'
import SectionedMenu from '../MenuSubItem'
import viaData        from './ViaInstant.json'

export default function VIAInstant() {
  const data = viaData[0]
  const sections = [
    { key: 'flavored',    title: 'Flavored',      clickable: false },
    { key: 'blondeRoast', title: 'Blonde Roast',  clickable: false },
    { key: 'mediumRoast', title: 'Medium Roast',  clickable: false }
  ]

  return (
    <SectionedMenu
      data={data}
      sections={sections}
    />
  )
}
