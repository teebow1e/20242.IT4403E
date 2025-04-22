import React from 'react'
import SectionedMenu from '../MenuSubItem'
import bakeryData from './Bakery.json'

export default function Bakery() {
  const data = bakeryData[0]
  const sections = [
    {
      key:   'croissantsAndDanishes',
      title: 'Croissants & Danishes',
      clickable: false
    },
    {
      key:   'loavesAndCakes',
      title: 'Loaves & Cakes',
      clickable: false
    },
    {
      key:   'muffinsSconesAndDoughnuts',
      title: 'Muffins, Scones & Doughnuts',
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
