import styled from 'styled-components'
import pageBg from '@/assets/images/page-bg.png'

export const Wrapper = styled.div`
  position: relative;
  width: 365px;
  min-height: 500px;
  height: ${(props) => props.height - 80}px;
  margin: 0 auto;
  margin-top: 40px;
  color: #e4dccf;
  transform: tranlate3d(0, 0, 0);
  background: url(${pageBg}) no-repeat;
  background-size: 100% 100%;

  @media (max-width: 520px) {
    width: 100vw;
    height: 100vh;
    margin: 0;
  }
`