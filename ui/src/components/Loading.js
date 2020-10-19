import React from 'react'
import styled, { keyframes } from 'styled-components'
import color from './helper/color'

const opacity = keyframes`
  0% { opacity: .2; }
  20% { opacity: 1; }
  100% { opacity: .2; }
`

const Animation = styled.span`
  font-size: 4em;
  color: ${color.grey};
  animation: ${opacity} 1.4s infinite both;
  animation-delay: ${(props) => props.delay};
`

const Wrapper = styled.div`
  /* flex-grow: 1; */
  display: flex;
  align-items: center;
  margin-left: 1em;
  max-height: 80px;
`

export default () => {
  return (
    <Wrapper>
      <Animation delay='0s'>.</Animation>
      <Animation delay='.2s'>.</Animation>
      <Animation delay='.4s'>.</Animation>
    </Wrapper>
  )
}
