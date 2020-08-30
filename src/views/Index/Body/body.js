import React from 'react'
import { Wrapper, List, ListHeader, ListItem } from './style'




function Body() {
  return (
    <Wrapper>
      <List>
        <ListHeader>App作品</ListHeader>
        <ListItem>
          <a href="baidu.com" className="item-wrapper">图标</a>
          <div className="item-text">博客系统</div>
        </ListItem>
        <ListItem>
          <a href="baidu.com" className="item-wrapper">图标占用</a>
          <div className="item-text">保安日记App</div>
        </ListItem>
      </List>
      <List>
        <ListHeader>网页作品</ListHeader>
        <ListItem>
          <a href="baidu.com" className="item-wrapper">图标</a>
          <div className="item-text">BS学习</div>
        </ListItem>
        <ListItem>
          <a href="baidu.com" className="item-wrapper">图标</a>
          <div className="item-text">Canvas学习</div>
        </ListItem>
        <ListItem>
          <a href="baidu.com" className="item-wrapper">图标</a>
          <div className="item-text">Canvas学习</div>
        </ListItem>
      </List>
    </Wrapper>
  )
}

export default Body