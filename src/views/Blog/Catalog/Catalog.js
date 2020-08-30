import React, { Fragment, useState } from 'react'
import SvgIcon from '@/components/SvgIcon'
import { Wrapper } from './style'
// 目录组件
function Catalog (props) {

  let { data = [], onClick, nested } = props
  const [childExpand, setChildExpand] = useState(false)
  

  const handleClickExpand = (e, item) => {
    e.preventDefault()
    e.stopPropagation()
    setChildExpand(!childExpand)
  }

  return (
    <Wrapper nested={nested}>
       <ul>
         {data.map(item => {
           const baseContent = (
             <li key={item.id} className="catalog-item" onClick={e => e.stopPropagation()}>
              <SvgIcon iconClass="expand" onClick={(e) => handleClickExpand(e, item)} />
               <span onClick={() => onClick(item)}>{item.catalogName}</span>
             </li>
           )
           if (item.children && item.children.length && childExpand) {
            return (
                <Fragment key={item.id}>
                  {baseContent}
                  <Catalog nested={true} data={item.children} onClick={onClick} />
                </Fragment>
              )
            } else {
              // return baseContent              
              return (
                <Fragment key={item.id}>
                  {baseContent}
                </Fragment>
              )
            }
         })}
       </ul>
    </Wrapper>
  )
}

export default Catalog