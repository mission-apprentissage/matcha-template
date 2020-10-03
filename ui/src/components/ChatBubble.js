import React from 'react'
import styled, { keyframes } from 'styled-components'
import leaf from '../assets/images/leaf-bubble.svg'

const scaleInFromLeft = keyframes`
  from{
    -webkit-transform: scale(0);
            transform: scale(0);
    -webkit-transform-origin: 0% 50%;
            transform-origin: 0% 50%;
    opacity: 0;
  }
  to{
    -webkit-transform: scale(1);
            transform: scale(1);
    -webkit-transform-origin: 0% 50%;
            transform-origin: 0% 50%;
    opacity: 1;
`

const bounce = keyframes`
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
`

/* The typing effect */
const typing = keyframes`
  from { width: 0 }
  to { width: 100% }
`

/* The typewriter cursor effect */
const blinkCaret = keyframes`
  from, to { border-color: transparent }
  50% { border-color: orange; }
`

const Bubble = styled.div`
  font-family: Marianne;
  font-size: 1rem;
  background: ${(props) => (props.darken ? 'rgba(165, 165, 180, 0.16)' : '#FAFAFC')};
  border-radius: 16px 16px 16px 0px;
  padding: 0.5rem;
  opacity: 0;
  animation: ${scaleInFromLeft} 0.3s linear;
  animation-delay: 0.3s;
  animation-fill-mode: forwards;
`

const Text = styled.h1`
  overflow: hidden; /* Ensures the content is not revealed until the animation */
  border-right: 0.15em solid orange; /* The typwriter cursor */
  white-space: nowrap; /* Keeps the content on a single line */
  margin: 0 auto; /* Gives that scrolling effect as the typing happens */
  letter-spacing: 0.1em; /* Adjust as needed */
  animation: ${typing} 3.5s steps(40, end), ${blinkCaret} 0.75s step-end infinite;
`

const LogoBubble = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: flex-end;
  background: ${(props) => (props.darken ? 'rgba(165, 165, 180, 0.16)' : '#F2F2F7')};
  border-radius: 50%;
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  animation: ${bounce} 0.3s linear;
`

const Wrapper = styled.div`
  display: flex;
  padding-top: 1rem;
  padding-bottom: 2rem;
  /* animation: ${bounce} 0.5s linear; */
`

const ChatBubble = ({ children, darken }) => {
  return (
    <Wrapper>
      <LogoBubble darken={darken}>
        <img alt='logo' src={leaf} />
      </LogoBubble>
      <Bubble darken={darken} className='flex-grow-1 ml-2'>
        {children}
      </Bubble>
    </Wrapper>
  )
}

export default ChatBubble
