import React from 'react'
import SectionedMenu from '../MenuSubItem'
import dataJson from './Treats.json'

export default function CookiesAndBrownies() {
  const data = dataJson[0]
  const sections = [
    { key: 'cakePops',            title: 'Cake Pops',            clickable: false },
    { key: 'cookiesAndBrownies',  title: 'Cookies & Brownies',   clickable: false }
  ]

  return (
    <SectionedMenu
      data={data}
      sections={sections}
    />
  )
}
