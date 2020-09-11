import React, { Fragment, useState } from 'react'
import SvgIcon from '@/components/SvgIcon'
import { Wrapper } from './style'
import { getBlogByIds } from '@/api/blog'

// 目录组件
function Catalog (props) {
  let { data = [], onClickBlog, onClick, nested } = props
  const [expandList, setExpandList] = useState([])

  const handleAddExpandItem = (item) => {
    let data = expandList.concat(item.id)
    // 这里会异步去获取blogIds每一个id的具体内容
    const ids = item.blogIds
    if (ids) {
      let list = getBlogByIds(ids)
      item.blogs = list
    }
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
                <SvgIcon iconClass="expand" onClick={(e) =>  handleAddExpandItem(item)} />
              }
              {/* {item.loading ? 
                <img style={{width: '15px', height: '15px'}} src={require('@/assets/images/loading.gif')} alt="加载中..."/>
                : null} */}
              <SvgIcon iconClass="folder" />
               <span onClick={() => onClick(item)}>{item.catalogName}</span>
             </li>
           )
           const shouldExpand = (item.blogs && item.blogs.length) || (item.children && item.children.length)
           if (shouldExpand && expandList.includes(item.id)) {
            return (
                <Fragment key={item.id}>
                  {baseContent}
                  <Catalog nested={true} data={item.children} onClick={onClick} />
                  <ul style={{marginLeft: '50px'}}>
                    {item.blogs && item.blogs.map(item => {
                      return (
                        <li key={item.title} onClick={() => onClickBlog(item)}>{item.title}</li>
                      )
                    })}
                  </ul>
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