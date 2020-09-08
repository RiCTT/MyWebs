import styled from 'styled-components'

export const Wrapper = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  transform: translate3D(0, 0, 0);
`

export const Left = styled.div`
  float: left;
  width: 300px;
  height: 100%;
  background-color: #E9CCD3;
  .avatar-wrapper {
    padding-top: 40px;
    text-align: center;
    svg {
      width: 7em;
      height: 7em;
    }
  }
  .btn-wrapper {
    margin-top: 10px;
    text-align: center;
    .catalog {
      margin-left: 6px;
    }
  }
`

export const Right = styled.div`
  margin-left: 300px;
  min-width: 600px;
  height: 100%;
  background-color: #e4e0e0;
`

export const Title = styled.div`
  position: relative;
  margin-bottom: 10px;
  margin-left: 10px;
  display: flex;
  align-items: center;
  height: 35px;
  .title-label {
    font-size: 14px;
    color: #666;
  }
  .title-input {
    margin: 0 10px;
    padding: 4px 10px;
    border-radius: 2px;
    border: none;
    outline: none;
  }
  .btn {
    position: absolute;
    right: 10px;
  }
`

export const DialogForm = styled.div`
  display: flex;
  flex-direction: column;
`
  
export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
  .dialog-btn {
    margin-left: 10px;
  }
`