import styled from 'styled-components'
import { primaryColor } from '@/assets/style/variables'
export const UlWrapper = styled.ul`
  width: 168px;
  margin: 0;
  padding: 0;
  .list-item {
    text-indent: 1em;
    color: #606266;
    line-height: 34px;
    text-align: left;
    &.active,
    &:hover {
      background-color: #f5f7fa;
      color: ${primaryColor};
      cursor: pointer;
    }
  }
`