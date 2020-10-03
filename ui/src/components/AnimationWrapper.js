import styled, { keyframes } from 'styled-components'

const animate = keyframes`
 from{
  -webkit-transform: translateY(50px);
  transform: translateY(50px);
  opacity: 0;
 }
 to{
  -webkit-transform: translateY(0);
  transform: translateY(0);
  opacity: 1;
 }
`

export default styled.div`
  opacity: 0;
  animation: ${animate} 0.7s linear;
  animation-delay: 0.5s;
  animation-fill-mode: forwards;
`
