import React, { useState, useEffect } from 'react'
import { Wrapper, Left, Right, DialogForm, ButtonWrapper, Title } from './style'
import SvgIcon from '@/components/SvgIcon'
import MyButton from '@/components/MyButton'
import MyDialog from '@/components/MyDialog'
import BraftEditor from '@/components/BraftEditor'
import Catalog from './Catalog/Catalog'
import { insertCatalog, getCatalogList } from 'api/blog'

function Blog () {
  const [visible, setVisible] = useState(false)
  const [catalogName, setCatalogName] = useState('') 
  const [catalogData, setCatalogData] = useState([])
  const [clickItem, setClickItem] = useState(null)

  const handleDialogStatus = () => {
    setVisible(!visible)
  }

  const handleAddCatalog = (item) => {
    const data = item.catalogName ? item : {}
    setClickItem(data)
    handleDialogStatus()
  }

  const handleInputChange = (e) => {
    e.persist()
    setCatalogName(e.target.value)
  }

  const handleSave = (e) => {
    insertCatalog({
      ...clickItem,
      catalogName
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
          <MyButton onClick={handleAddCatalog}>
            <SvgIcon iconClass="cat"/>
            <span className="catalog">创建目录</span>
          </MyButton>
          <div>
            <MyButton onClick={handleAddCatalog}>
              <SvgIcon iconClass="folder"/>
              <span className="catalog">新建博客</span>
            </MyButton>
          </div>
          <MyDialog visible={visible} title="请输入目录名称" onClose={() => setVisible(false)}>
            <DialogForm>
              {clickItem && clickItem.catalogName ? <label>当前目录为：{clickItem.catalogName}</label> : null}
              <input value={catalogName} onChange={handleInputChange} />
              <ButtonWrapper>
                <MyButton className="dialog-btn" onClick={handleDialogStatus}>取 消</MyButton>
                <MyButton className="dialog-btn" onClick={handleSave}>保 存</MyButton>
              </ButtonWrapper>
            </DialogForm>
          </MyDialog>
          <Catalog data={catalogData} onClick={handleAddCatalog} />
        </div>
      </Left>
      <Right>
        <Title>
          <label className="title-label">博客标题</label>
          <input className="title-input" />
          <MyButton onClick={handleAddCatalog}>
            保存
          </MyButton>
        </Title>
        <BraftEditor />
      </Right>
    </Wrapper>
  )
}

export default Blog
