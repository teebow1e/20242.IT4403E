import React from 'react'
import SectionedMenu from '../MenuSubItem'
import hotTeaData     from './HotTea.json'

export default function HotTea() {
  const data = hotTeaData[0]
  const sections = [
    { key: 'teaLatte',  title: 'Tea Latte',  clickable: false },
    { key: 'brewedTea', title: 'Brewed Tea', clickable: false }
  ]

  return (
    <SectionedMenu
      data={data}
      sections={sections}
    />
  )
}
