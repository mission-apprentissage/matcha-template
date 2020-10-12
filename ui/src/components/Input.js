import React from 'react'
import styled from 'styled-components'
import edit from '../assets/images/edit.svg'

import color from './helper/color'

const Wrapper = styled.div`
  width: 100%;
  span {
    position: absolute;
    right: 22px;
    padding-top: 12px;
    color: ${color.middleGrey};
  }
`

const Input = styled.input`
  border: 1px solid ${color.middleGrey};
  box-sizing: border-box;
  border-radius: 4px;
  font-family: Inter;
  font-size: 1rem;
  padding-left: 10px;
  padding-top: 0.625rem;
  padding-bottom: 0.625rem;
  margin-bottom: 2rem;
  width: 100%;
  outline: none;
  ::placeholder {
    color: #98b0b7;
  }
  ${(props) =>
    props.value &&
    `
    border: 1px solid ${color.black};
  `}
  ${(props) =>
    props.autocomplete &&
    `
    margin-bottom: 0;
  `}
  :hover {
    border: 1px solid ${color.grey};
  }
  :focus {
    border: 1px solid ${color.red};
    background: ${color.white} !important;
    color: ${color.black};
  }
  :disabled {
    border: 1px solid ${color.lightGrey};
    background: ${color.lightGrey};
  }
`

export default (props) => {
  console.log(props)
  return (
    <Wrapper>
      {props.tag && (
        <span>
          <p>Appuyer sur entrer</p>
          {/* <img src={edit} alt='edit' /> */}
        </span>
      )}
      <Input {...props} />
    </Wrapper>
  )
}
