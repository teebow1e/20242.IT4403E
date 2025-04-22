import React from 'react'
import SectionedMenu from '../MenuSubItem'
import icedEnergyData from './IcedEnergy.json'

export default function IcedEnergy() {
  const data = icedEnergyData[0]
  const sections = [
    { key: 'icedEnergy', title: 'Iced Energy', clickable: false }
  ]

  return (
    <SectionedMenu
      data={data}
      sections={sections}
    />
  )
}
