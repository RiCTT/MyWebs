import React, { useEffect, useState } from 'react'
import Body from './Body/body.js'
import { Wrapper } from './style'

function Index () {
  const [height, setHeight] = useState(window.innerHeight)
  useEffect(() => {
    const handleResize = () => {
      const h = window.innerHeight
      if (h > 500) {
        setHeight(h)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  })

  return (
    <Wrapper height={height}>
      <Body />
    </Wrapper>
  )
}

export default Index
