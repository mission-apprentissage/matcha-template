import React from 'react'
import { Col } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import styled from 'styled-components'
import color from '../../components/helper/color'
import MomentUtils from '@date-io/moment'
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import 'moment/locale/fr'
import {
  Button,
  Input,
  InputTitle,
  StepTitle,
  ChatBubble,
  NextButton,
  PreviousButton,
  QuestionTitle,
  Tag,
  Autocomplete,
  RemoveLink,
} from '../../components'
import { Context } from '../../context'

const Wrapper = styled.div`
  ${(props) =>
    props.index % 2 === 0 &&
    `
    // background: ${color.veryLightGrey}
  `}
`

const StyledDatePicker = styled(DatePicker)`
  width: 100%;
  font-family: Inter;
  .MuiInputBase-input {
    border: 1px solid #98b0b7;
    box-sizing: border-box;
    border-radius: 4px;
    font-family: Inter;
    font-size: 1rem;
    padding-left: 10px;
    padding-top: 1.5rem;
    padding-bottom: 1.5rem;
    margin-bottom: 1rem;
    width: 100%;
    outline: none;
    ::after {
      content: '#';
    }
  }
`

const Step = (props) => {
  const {
    nom,
    taches,
    nomEntreprise,
    adresseEntreprise,
    dateDebut,
    dateFin,
    handleChange,
    handleRemoveTag,
    handleRemoveExperience,
    index,
  } = props
  const [minDate, setMinDate] = React.useState('')

  return (
    <MuiPickersUtilsProvider utils={MomentUtils} locale='fr'>
      <Wrapper index={index}>
        {index > 0 && (
          <div className='d-flex justify-content-between'>
            <InputTitle bold={true}>Expérience {index + 1}</InputTitle>
            <RemoveLink onClick={() => handleRemoveExperience(index)}>Supprimer</RemoveLink>
          </div>
        )}
        <ChatBubble>
          Décrivez moi toute expérience avec le monde du travail, qui vous a demandé d’apprendre, de progresser, des
          responsabilités ou dont vous êtes fière.
        </ChatBubble>
        <QuestionTitle title='Votre expérience' />
        <Input
          placeholder='ranger les rayons, préparer les plans de travail, ...'
          required
          type='text'
          onChange={(e) => handleChange('nom', e.target.value, index)}
          value={nom}
        />
        <QuestionTitle
          title='Vos 3 principales missions ou tâches ?'
          subtitle='Appuyer sur Entrer pour insérer une mission/tâche'
        />
        <div className='pb-1'>
          {taches &&
            taches.map((x, i) => (
              <Tag key={i} onClick={() => handleRemoveTag(index, i)}>
                {x}
              </Tag>
            ))}
        </div>
        <Input
          placeholder='entrer un mot-clé'
          required
          type='text'
          onKeyDown={(e) => {
            if (e.keyCode === 13) {
              handleChange('taches', e.target.value, index, true)
              e.target.value = ''
            }
          }}
          disabled={taches && taches.length === 3}
        />
        <ChatBubble>
          Les employeurs portent de l’attention à cette information. Aller au plus simple en utilisant des verbes
          d’action comme par exemple : ranger les rayons, préparer les plans de travail, organiser les activités du
          groupe, ...
        </ChatBubble>
        <QuestionTitle title='Dans quelle structure ou entreprise ?' />
        <InputTitle>Nom de l'entreprise</InputTitle>
        <Input
          placeholder="entrez le nom de l'entreprise"
          onChange={(e) => handleChange('nomEntreprise', e.target.value, index)}
          value={nomEntreprise}
        />
        <Autocomplete
          title="Adresse de l'entreprise"
          context={adresseEntreprise}
          placeholder="entrez l'adresse de l'entreprise"
          handleValues={handleChange}
          index={index}
          fullAddress={true}
        />
        <QuestionTitle title='Sur quelle période ?' />
        <div className='row p-0'>
          <div className='col'>
            <InputTitle>Date de début</InputTitle>
            <StyledDatePicker
              placeholder='sélectionne une date de début'
              // format='dddd DD MMMM yyyy'
              format='DD/MM/yyyy'
              openTo='year'
              views={['year', 'month', 'date']}
              value={dateDebut}
              onChange={(date) => {
                handleChange('dateDebut', date, index)
                setMinDate(date)
              }}
              InputProps={{ disableUnderline: true }}
            />
            {/* <Input
              placeholder='sélectionne une date de début'
              required
              value={dateDebut}
              type='date'
              onChange={(event) => {
                handleChange('dateDebut', event.target.value, index)
                setMinDate(event.target.value)
              }}
            /> */}
          </div>
          <div className='col'>
            <InputTitle>Date de fin</InputTitle>
            <DatePicker
              placeholder='sélectionne une date de fin'
              open={minDate ? true : false}
              value={dateFin}
              onChange={(date) => {
                handleChange('dateFin', date, index)
                setMinDate(false)
              }}
              minDate={minDate ? minDate : ''}
              minDateMessage={true}
            />
            {/* <Input
              placeholder='sélectionne une date de fin'
              required
              type='date'
              value={dateFin}
              onChange={(event) => handleChange('dateFin', event.target.value, index)}
              min={minDate ? minDate : ''}
            /> */}
          </div>
        </div>
      </Wrapper>
    </MuiPickersUtilsProvider>
  )
}

export default () => {
  const { profile, addItem, saveContext, check } = React.useContext(Context)
  const history = useHistory()
  const [stepState, setStepState] = React.useState(profile.experiences ? profile.experiences : [{}])
  const [submit, setSubmit] = React.useState(false)

  const handleChange = (name, value, index, tag) => {
    const copy = [...stepState]
    if (tag) {
      if (!copy[index].taches) {
        copy[index].taches = [value]
      } else {
        copy[index].taches.push(value)
      }
    } else {
      copy[index][`${name}`] = value
      if (copy[index][`${name}`] === '') {
        copy[index][`${name}`] = undefined
      }
    }
    setStepState(copy)
    check(stepState, setSubmit, ['nom', 'taches', 'nomEntreprise', 'adresseEntreprise', 'dateDebut', 'dateFin'])
  }

  const handleRemoveTag = (index, tagIndex) => {
    const copy = [...stepState]
    copy[index].taches.splice(tagIndex, 1)
    if (copy[index].taches.length === 0) {
      copy[index].taches = undefined
    }
    setStepState(copy)
    check(stepState, setSubmit, ['nom', 'taches', 'nomEntreprise', 'adresseEntreprise', 'dateDebut', 'dateFin'])
  }

  const handleRemoveExperience = (index) => {
    const copy = [...stepState]
    copy.splice(index, 1)
    setStepState(copy)
  }

  return (
    <Col>
      <StepTitle>Etape 4/6 - Vos expériences</StepTitle>
      {stepState.map((item, key) => (
        <Step
          key={key}
          index={key}
          handleChange={handleChange}
          handleRemoveTag={handleRemoveTag}
          handleRemoveExperience={handleRemoveExperience}
          {...item}
        />
      ))}
      <hr />
      <Button experience='true' onClick={() => addItem(stepState, setStepState)}>
        + Ajouter une expérience
      </Button>
      <div className='d-flex justify-content-between mb-5'>
        <Link to='/step-three'>
          <PreviousButton />
        </Link>
        <Link to='step-five'>
          <NextButton onClick={() => saveContext(history, 'experiences', stepState, '/step-five')} disabled={!submit} />
        </Link>
      </div>
    </Col>
  )
}
