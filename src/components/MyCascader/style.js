import styled from 'styled-components'

export const Wrapper = styled.div`
  width: 200px;
  .animate-enter {
    opacity: 0.01;
    transform: translateY(-100%) scale(0.75);
  }

  .animate-enter-active {
    opacity: 1;
    transform: translateY(0%) scale(1);
    transition: all 300ms ease-out;
  }

  .animate-exit {
    opacity: 1;
    transform: scale(1.25);
  }

  .animate-exit-active {
    transform: scale(1);
    transition: all 3000ms ease-in;
  }

  .cascader-input {
    display: block;
    padding: 4px 10px;
    border: none;
    border-radius: 4px;
    background-color: #fff;
    outline: none;
    transition: all .3s;
    &:hover {
      cursor: pointer;
    }
    &:focus {
      border: 1px solid skyblue;
    }
  }
`
  
export const InnerWrapper = styled.div`
  position: relative;
  z-index: 10;
  .cascader-list {
    position: absolute;
    display: flex;
    border-radius: 4px;
    flex-wrap: nowrap;
    background-color: #fff;
  }
`