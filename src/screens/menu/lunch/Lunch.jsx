import React from 'react'
import SectionedMenu from '../MenuSubItem'
import proteinData   from './Lunch.json'

export default function ProteinBoxes() {
  const data = proteinData[0]
  const sections = [
    { key: 'proteinBoxes', title: 'Protein Boxes', clickable: false }
  ]

  return (
    <SectionedMenu
      data={data}
      sections={sections}
    />
  )
}
