import React, { Fragment, useState } from 'react'
import SvgIcon from '@/components/SvgIcon'
import { Wrapper } from './style'
// 目录组件
function Catalog (props) {
  let { data = [], onClick, nested } = props
  const [expandList, setExpandList] = useState([])

  const handleAddExpandItem = (id) => {
    let data = expandList.concat(id)
    setExpandList(data)
  }
  const handleRemoveExpandItem = (id) => {
    let index = expandList.findIndex(item => item === id)
    if (index === -1) return
    let data = [...expandList]
    data.splice(index, 1)
    setExpandList(data)
  }

  return (
    <Wrapper nested={nested}>
       <ul>
         {data.map(item => {
           const baseContent = (
             <li key={item.id} className="catalog-item">
              {
                expandList.includes(item.id) ? 
                <SvgIcon iconClass="expanded" onClick={(e) => handleRemoveExpandItem(item.id)} />
                :
                <SvgIcon iconClass="expand" onClick={(e) => handleAddExpandItem(item.id)} />
              }
              <SvgIcon iconClass="folder" />
               <span onClick={() => onClick(item)}>{item.catalogName}</span>
             </li>
           )
           if (item.children && item.children.length && expandList.includes(item.id)) {
            return (
                <Fragment key={item.id}>
                  {baseContent}
                  <Catalog nested={true} data={item.children} onClick={onClick} />
                </Fragment>
              )
            } else {
              return baseContent
            }
         })}
       </ul>
    </Wrapper>
  )
}

export default Catalog