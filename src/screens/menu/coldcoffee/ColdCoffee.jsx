import React from 'react'
import SectionedMenu from '../MenuSubItem'
import coldCoffeeData  from './ColdCoffee.json'

export default function ColdCoffee() {
  const data = coldCoffeeData[0]
  const sections = [
    { key: 'nitroColdBrew',       title: 'Nitro Cold Brew',               clickable: false },
    { key: 'icedCoffee',          title: 'Iced Coffee',                   clickable: false },
    { key: 'icedShakenEspresso',  title: 'Iced Shaken Espresso',          clickable: false },
    { key: 'icedMocha',           title: 'Iced Mocha',                    clickable: false },
    { key: 'icedMacchiato',       title: 'Iced Macchiato',                clickable: false },
    { key: 'icedFlatWhite',       title: 'Iced Flat White',               clickable: false }
  ]

  return (
    <SectionedMenu
      data={data}
      sections={sections}
    />
  )
}
