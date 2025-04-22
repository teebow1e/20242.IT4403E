import React from 'react'
import SectionedMenu from '../MenuSubItem'
import breakfastData  from './Breakfast.json'

export default function Breakfast() {
const data = breakfastData[0]
const sections = [
    { key: 'breakfastSandwiches', title: 'Breakfast Sandwiches', clickable: false },
    { key: 'breakfastWraps',     title: 'Breakfast Wraps',      clickable: false },
    { key: 'eggBitesAndBakes',   title: 'Egg Bites & Bakes',    clickable: false },
    { key: 'oatmealAndYogurt',   title: 'Oatmeal & Yogurt',     clickable: false }
]

return (
    <SectionedMenu
    data={data}
    sections={sections}
    />
)
}
  