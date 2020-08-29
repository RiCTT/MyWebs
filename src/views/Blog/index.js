import React, { useState, useEffect } from 'react'
import { Wrapper, Left, Right, DialogForm, ButtonWrapper } from './style'
import SvgIcon from '@/components/SvgIcon'
import MyButton from '@/components/MyButton'
import MyDialog from '@/components/MyDialog'
import Catalog from './Catalog'
import { insertCatalog, getCatalogList } from 'api/blog'

function Blog () {
  const [visible, setVisible] = useState(false)
  const [catalogName, setCatalogName] = useState('') 
  const [catalogData, setCatalogData] = useState([])
  const [clickItem, setClickItem] = useState(null)

  const handleClick = (item) => {
    if (item.catalogName) {
      setClickItem(item)
    } else {
      setClickItem({})
    }
    setVisible(!visible)
  }

  const handleInputChange = (e) => {
    e.persist()
    setCatalogName(e.target.value)
  }

  const handleSave = (e) => {
    insertCatalog({
      catalogName,
      ...clickItem
    })
    setClickItem(null)
    setCatalogName('')
    setVisible(!visible)
  }

  useEffect(() => {
   const data = getCatalogList()
   setCatalogData(data) 
  }, [])

  return (
    <Wrapper>
      <Left>
        <div className="avatar-wrapper">
          <SvgIcon iconClass="cat"/>
        </div>
        <div className="btn-wrapper">
          <MyButton onClick={handleClick}>
            <SvgIcon iconClass="cat"/>
            <span className="catalog">创建目录</span>
          </MyButton>
          <MyDialog visible={visible} title="请输入目录名称" onClose={() => setVisible(false)}>
            <DialogForm>
              <input value={catalogName} onChange={handleInputChange} />
              <ButtonWrapper>
                <MyButton className="dialog-btn" onClick={handleClick}>取 消</MyButton>
                <MyButton className="dialog-btn" onClick={handleSave}>保 存</MyButton>
              </ButtonWrapper>
            </DialogForm>
          </MyDialog>
          <Catalog data={catalogData} onClick={handleClick} />
        </div>
      </Left>
      <Right></Right>
    </Wrapper>
  )
}

export default Blog
