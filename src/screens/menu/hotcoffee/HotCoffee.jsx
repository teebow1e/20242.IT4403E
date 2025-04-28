import React from 'react'
import SectionedMenu from '../MenuSubItem'
import hotCoffeeData  from './HotCoffee.json'

export default function HotCoffee() {
  const data = hotCoffeeData[0]
  const sections = [
    { key: 'brewedCoffee', title: 'Brewed Coffee', clickable: false },
    { key: 'americano',    title: 'Americano',     clickable: false }
  ]

  return (
    <SectionedMenu
      data={data}
      sections={sections}
    />
  )
}
