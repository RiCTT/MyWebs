import React, { useState, useEffect } from 'react'
import Item from './Item'
import { Wrapper, InnerWrapper } from './style'
import { CSSTransition } from 'react-transition-group'

/**
 * Todo
 *  1.数据回显，input框回显对应选中的文本
 *    需要修改一下数据格式，存入的时候写到对应的childIds，rootId，拿到数据的时候根据id去搜索，减少时间
 *    懒得写了，有时间再补
 */

// 级联选择器
function MyCascader(props) {
  let { data, onChange } = props
  data = [[...data]]
  const [list, setList] = useState([])
  const [visible, setVisible] = useState(false)
  const [label, setLabel] = useState([])
  const [catalog, setCatalog] = useState(null)
 
  const handleItemClick = (item, index) => {
    setCatalog(item)
    if (item.children) {
      let data = list.slice(0, index + 1)
      data.push(item.children)
      setList(data)
    } else {
      setVisible(false)
    }
    function handleLabelList() {
      const labelList = label.slice(0).filter((item, $index) => index >= $index)
      labelList[index] = item.label
      setLabel(labelList)
    }
    handleLabelList()
  }
  useEffect(() => {
    if (!visible) {
      setList([data[0]])
    } else {
      setList(data)
    }
  // eslint-disable-next-line
  }, [visible])

  useEffect(() => {
    onChange && catalog && onChange({
      value: catalog.id,
      label: catalog.label
    })
  // eslint-disable-next-line
  }, [catalog])

  const handleInputFocus = (e) => {
    e.stopPropagation()
    setVisible(!visible)
    const onceClick = (e) => {
      setVisible(false)
      window.removeEventListener('click', onceClick)
    }
    window.addEventListener('click', onceClick)
  }
  return (
    <Wrapper>
      <input defaultValue={label.join('/')} className="cascader-input"  onClick={handleInputFocus} />
      <CSSTransition in={visible} timeout={1000} classNames="animate">
        { visible ? 
            <InnerWrapper>
              <div className="cascader-list">
                  {list.map((item, index) => {
                    return (
                      <Item key={index} index={index} className="item-wrapper" data={item} onClick={handleItemClick}></Item>
                      )
                    })}
              </div>
            </InnerWrapper>
        : <div></div> }
      </CSSTransition>
    </Wrapper>
  )
}

export default MyCascader