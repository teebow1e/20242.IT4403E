import React from 'react'
import SectionedMenu from '../MenuSubItem'
import reserveData   from './WholeBean.json'

export default function StarbucksReserve() {
  const data = reserveData[0]
  const sections = [
    {
      key: 'starbucksReserve',
      title: 'Starbucks Reserve®',
      clickable: false
    },
    {
      key: 'blondeRoast',
      title: 'Blonde Roast',
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
