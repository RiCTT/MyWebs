import React, { Fragment } from 'react'


// 目录组件
function Catalog (props) {

  let { data = [], onClick } = props

  return (
    <div>
       <ul>
         {data.map(item => {
           if (item.children && item.children.length) {
            return (
                <Fragment key={item.id}>
                  <li onClick={() => onClick(item)}>+{item.catalogName}</li>
                  <Catalog  data={item.children} />
                </Fragment>
              )
            } else {
              return <li key={item.id} onClick={() => onClick(item)}>&nbsp;&nbsp;&nbsp;&nbsp;{item.catalogName}</li>
            }
         })}
       </ul>
    </div>
  )
}

export default Catalog