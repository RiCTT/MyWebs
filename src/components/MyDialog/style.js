import styled from 'styled-components'

export const DialogContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const DialogMask = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #000;
  opacity: .3;
`

export const DialogBody = styled.div`
  position: relative;
  min-width: 300px;
  padding: 10px 15px;
  border-radius: 4px;
  padding-bottom: 30px;
  background-color: #fff;
`

export const DialogTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px 0;
  .icon {
    width: 1.5em;
    height: 1.5em;
    &:hover {
      cursor: pointer;
    }
  }
`