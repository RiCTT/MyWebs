import styled from 'styled-components'

export const Wrapper = styled.div`
  margin-left: ${props => props.nested ? '20px' : ''};
  ul {
    font-size: 15px;
    color: #8c8c8c;
    letter-spacing: 1px;
  }
  .catalog-item {
    text-align: left;
    margin-left: 120px;
    span {
      &:hover {
        cursor: pointer;
      }
    }
  }
`