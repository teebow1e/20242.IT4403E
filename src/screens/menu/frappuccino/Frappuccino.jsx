import React from 'react'
import SectionedMenu from '../MenuSubItem'
import coffeeFrappData from './Frappuccino.json'

export default function Frappuccino() {
  const data = coffeeFrappData[0]
  const sections = [
    {
      key: 'coffeeFrappuccino',
      title: 'Coffee Frappuccino®',
      clickable: false
    }
  ]

  return (
    <SectionedMenu
      data={data}
      sections={sections}
    />
  )
}
