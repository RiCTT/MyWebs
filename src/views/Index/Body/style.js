import styled from 'styled-components'
import ListBg from 'assets/images/dl-bg.png'
import ListHeadBg from '@/assets/images/dl-header-bg.png'
import BtnListBg from '@/assets/images/btn-list.png'

export const Wrapper = styled.div`
  padding: 4px 6px;
`

export const List = styled.dl`
  background: url(${ListBg}) no-repeat;
  background-size: 100% 100%;
  font-size: 12px;
  margin-bottom: 10px;
`

export const ListHeader = styled.dt`
  color: #585356;
  padding: 5px;
  background: url(${ListHeadBg}) no-repeat;
  background-size: 100% 100%
`

export  const ListItem = styled.dd`
  display: inline-flex;
  flex-direction: column;
  width: 25%;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 5px;

  &:nth-child(2n) {
    .item-wrapper {
      background-position-x: -48px;
    }
  }

  .item-wrapper {
    display: inline-flex;
    width: 48px;
    height: 54px;
    margin-bottom: 7px;
    color: #afaaad;
    text-decoration: none;
    background: url(${BtnListBg}) no-repeat;
    background-size: 400%;
    background-position-x: -96px;
    .item-inner-text {
      margin-top: -4px;
    }
  }
  .item-text {
    padding: 4px 0;
  }
`