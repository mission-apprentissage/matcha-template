import React from 'react'
import * as Yup from 'yup'
import { Button, Col } from 'react-bootstrap'
import styled from 'styled-components/macro'
import { Formik, useField, Form } from 'formik'

import color from '../components/helper/color'
import { InputTitle, Input, Title, Button as Btn } from '../components'
import { _get } from '../common/httpClient'
import { Context } from '../context'
import { useHistory } from 'react-router-dom'

const ErrorMessage = styled.div`
  font-family: Inter;
  font-size: 0.75rem;
  color: ${color.red};
`

const MyInput = (props) => {
  const [field, meta] = useField(props)
  return (
    <div className='mb-3'>
      <Input
        css={`
          margin-bottom: 0.2rem;
        `}
        {...props}
        {...field}
      />
      {meta.touched && meta.error ? <ErrorMessage>{meta.error}</ErrorMessage> : null}
    </div>
  )
}

const StyledButton = styled(Button)`
  background: ${color.grey};
  border: none;
  box-shadow: 0px 1px 8px rgba(8, 67, 85, 0.12);
  padding: 0.75rem;
  outline: none;
  &:hover {
    background: ${color.middleGrey};
    color: ${color.black};
  }
  &:focus {
    background: #084355;
    color: #ffffff;
    outline: none;
  }
`

export default function Connexion() {
  const { updateUser } = React.useContext(Context)
  const history = useHistory()

  const login = async ({ questionnaireId }, { setStatus }) => {
    try {
      let user = await _get(`/api/questionnaire/item/${questionnaireId}`)
      console.log(user)
      updateUser(user[0])
      history.push('/step-one')
    } catch (e) {
      console.error(e)
      setStatus({ error: e.prettyMessage })
    }
  }

  return (
    <Col className='mt-5 mb-5 d-flex flex-column justify-content-start flex-column p-0 p-sm-3'>
      <Title>Récupérer votre identifiant envoyé par mail pour mettre à jour votre profil étape par étape</Title>
      <Formik
        initialValues={{
          questionnaireId: '',
        }}
        validationSchema={Yup.object().shape({
          questionnaireId: Yup.string().required('champ obligatoire*').min(1),
        })}
        onSubmit={login}
      >
        {({ values, isSubmitting, isValid, dirty }) => {
          return (
            <>
              <Form>
                <MyInput
                  name='questionnaireId'
                  placeholder='identifiant questionnaire'
                  type='text'
                  value={values.username}
                />
                <div className='d-flex justify-content-end mb-5'>
                  <StyledButton type='submit' disabled={!(isValid && dirty) || isSubmitting}>
                    Connexion
                  </StyledButton>
                </div>
              </Form>
            </>
          )
        }}
      </Formik>
    </Col>
  )
}
