import React from 'react'
import SectionedMenu from '../MenuSubItem'
import snackData from './Snacks.json'

export default function Snacks() {
  const data = snackData[0]
  const sections = [
    { key: 'proteinAndSnackBars', title: 'Protein & Snack Bars', clickable: false },
    { key: 'saltySnacks',         title: 'Salty Snacks',          clickable: false }
  ]

  return (
    <SectionedMenu
      data={data}
      sections={sections}
    />
  )
}
