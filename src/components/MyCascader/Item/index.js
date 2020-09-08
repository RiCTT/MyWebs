import React, { useState } from 'react'
import classnames from 'classnames'
import { UlWrapper } from './style'

function Item(props) {
  const {data = [], onClick, className, index } = props
  const wrapperClasses = classnames(className)
  const [activeItem, setActiveItem] = useState('')
  const handleClick = (e, item) => {
    e.stopPropagation()
    setActiveItem(item.value)
    onClick && onClick(item, index)
  }
  return (
    <UlWrapper className={wrapperClasses}>
      {
        data.map((item, index) => {
          return <li className={`list-item ${activeItem === item.value ? 'active' : ''}`} key={index} onClick={(e) => handleClick(e, item)}>{item.label}</li>
        })
      }
    </UlWrapper>
  )
}

export default Item