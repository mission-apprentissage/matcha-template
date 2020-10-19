import React from 'react'
import { delay } from 'lodash-es'
import styled, { keyframes } from 'styled-components'
import leaf from '../assets/images/leaf-bubble.svg'
import Loading from './Loading'

const appearSequence = keyframes`
  0% { transform: scale(0); }
  100% { transform: scale(1); }
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

const Bubble = styled.div`
  font-family: Marianne;
  font-size: 1rem;
  background: ${(props) => (props.darken ? 'rgba(165, 165, 180, 0.16)' : '#FAFAFC')};
  border-radius: 16px 16px 16px 4px;
  padding: 0.5rem;
  flex-grow: 1;
  margin-left: 1em;
  animation: ${appearSequence} 0.3s linear;
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
  const [showMessage, setShowMessage] = React.useState(false)
  React.useEffect(() => {
    if (!showMessage) {
      delay(setShowMessage, 1500, true)
    }
  }, [showMessage])
  return (
    <Wrapper>
      <LogoBubble darken={darken}>
        <img alt='logo' src={leaf} />
      </LogoBubble>
      {!showMessage ? <Loading /> : <Bubble darken={darken}>{children}</Bubble>}
    </Wrapper>
  )
}

export default ChatBubble
