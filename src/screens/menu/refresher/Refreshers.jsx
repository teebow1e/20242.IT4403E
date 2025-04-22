import React from 'react'
import SectionedMenu from '../MenuSubItem'
import refresherData  from './Refreshers.json'

export default function Refreshers() {
  const data = refresherData[0]
  const sections = [
    { key: 'lemonadeRefreshers', title: 'Lemonade Refreshers', clickable: false },
    { key: 'coconutmilkRefreshers', title: 'Coconutmilk Refreshers', clickable: false },
    { key: 'refreshers', title: 'Refreshers', clickable: false }
  ]

  return <SectionedMenu data={data} sections={sections} />
} 