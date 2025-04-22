import React from 'react'
import SectionedMenu from '../MenuSubItem'
import icedTeaData    from './ColdTea.json'

export default function ColdTea() {
  const data = icedTeaData[0]
  const sections = [
    { key: 'icedTeaLatte', title: 'Iced Tea Latte', clickable: false },
    { key: 'icedTea',      title: 'Iced Tea',       clickable: false }
  ]

  return (
    <SectionedMenu
      data={data}
      sections={sections}
    />
  )
}
