import React from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import { Navbar, Container, Button, Dropdown } from 'react-bootstrap'

import color from './helper/color'
import { Context } from '../context'
import logo from '../assets/images/logo.svg'
import useAuth from '../common/hooks/useAuth'

const StyledButton = styled(Button)`
  background: ${color.middleGrey};
  border: none;
  box-shadow: 0px 1px 8px rgba(8, 67, 85, 0.12);
  padding: 0.75rem;
  outline: none;
  :hover {
    background: ${color.grey};
    color: ${color.white};
  }
  /* :not(:disabled):not(.disabled):active {
    background: ${color.grey};
  } */
  :focus,
  :not(:disabled):not(.disabled):active,
  :not(:disabled):not(.disabled):active:focus {
    background: ${color.grey};
    border: none;
    box-shadow: none;
    color: #ffffff;
    outline: none;
  }
`

const DropBtn = styled(Navbar.Text)`
  color: ${color.black} !important;
`

export default () => {
  const {
    profile: { candidat },
    cleanState,
  } = React.useContext(Context)

  let history = useHistory()
  const [, setAuth] = useAuth()

  const isAdmin = history.location.pathname === '/admin' ? true : false

  const logout = () => {
    cleanState()
    history.push('/')
  }

  return (
    <Navbar className='backgrd'>
      <Container className='d-flex align-items-center'>
        <Navbar.Brand>
          <img src={logo} className='d-inline-block align-top' alt='logo matcha' />
        </Navbar.Brand>
        {candidat ? (
          <Navbar.Text className='ml-auto' as={DropBtn}>
            <Dropdown alignRight>
              <Dropdown.Toggle as={DropBtn}>
                {candidat.prenom} {candidat.nom.substring(0, 1).toUpperCase()}.
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={logout}>Se deconnecter</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Navbar.Text>
        ) : (
          <StyledButton onClick={() => history.push('/connexion')}>Modifier son profil</StyledButton>
        )}
        {isAdmin && (
          <Button onClick={() => setAuth('')} variant='outline-dark'>
            Se deconnecter
          </Button>
        )}
      </Container>
    </Navbar>
  )
}
