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
const appearSequence = keyframes`
  0% { transform: scale(0); }
  100% { transform: scale(1); opacity:1; }
`

export default styled.div`
  opacity: 0;
  animation: ${animate} 0.3s linear;
  animation-delay: 2s;
  animation-fill-mode: forwards;
`
