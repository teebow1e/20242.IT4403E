import React from 'react'
import SectionedMenu from '../MenuSubItem'
import bagData        from './Bag.json'

export default function ShoppingBag() {
  const data = bagData[0]
  const sections = [
    { key: 'shoppingBag', title: 'Shopping Bag', clickable: false }
  ]

  return (
    <SectionedMenu
      data={data}
      sections={sections}
    />
  )
}
