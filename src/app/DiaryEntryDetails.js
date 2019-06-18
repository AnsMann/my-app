import React, { useState } from 'react'
import styled from 'styled-components'
import OutsideClickHandler from 'react-outside-click-handler'
import { ShowDayRating } from './ShowDayRating'
import { findIndex, editEntriesInMongoDB } from './utils'
import { Header } from './Header'
import { ArrowBack } from './ArrowBack'
import { ShareViaSlackButton } from './ShareViaSlackButton'
import moment from 'moment'
import 'moment/locale/de'
import { ShowSingleDetail } from './ShowSingleDetail'
import { DayRatingInput } from './DayRatingInput'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

library.add(faPencilAlt)

moment.locale('de')

const EntryDetails = styled.section`
  border: solid 1px #007fbf;
  border-radius: 10px;
  color: #007fbf;
  margin: 30px 20px 20px;
  overflow: scroll;
  padding: 20px;
  h2,
  h3 {
    font-size: 1.2rem;
    justify-self: left;
  }
  h2 {
    font-size: 1.4rem;
    margin-bottom: 0;
  }
  small {
    color: #c3b8c5;
  }
  span {
    font-size: 2rem;
  }
`

const Share = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`
const SaveButton = styled.button`
  background: #007fbf;
  border-radius: 10px;
  color: #ffffff;
  font-size: 1rem;
  height: 30px;
  margin: 5px 0;
  width: 100%;
`

const EditIcon = styled.div`
  color: #007fbf;
  display: inline;
  font-size: 1rem;
  position: relative;
  top: -50px;
  right: -275px;
`
const StyledDiv = styled.div`
  color: #c3b8c5;
  font-size: 0.8rem;
  margin-bottom: 10px;
`
const BackButton = styled.div`
  left: 13px;
  position: absolute;
  top: 85px;
  z-index: 50;
`

export function DiaryEntryDetails({
  match,
  diaryEntries,
  onBackClick,
  history,
  onEditDetails,
  workOfflineStatus,
}) {
  const { id } = match.params
  const entryIndex = findIndex(id, diaryEntries)
  const diaryEntry = diaryEntries[entryIndex]
  const {
    title,
    date,
    rating,
    content,
    positive,
    negative,
    coachFeedback,
    additional,
    shared,
    edit,
    createDate,
  } = diaryEntry

  const detailsToRender = [
    {
      headline: 'Todays topic was',
      content: title,
      type: 'title',
    },
    {
      headline: 'Die wichtigsten Inhalte heute waren',
      content: content,
      type: 'content',
    },
    {
      headline: 'Besonders positiv erinnere ich',
      content: positive,
      type: 'positive',
    },
    {
      headline: 'Besonders negative erinnere ich',
      content: negative,
      type: 'negative',
    },
    {
      headline: 'Meinem Coach würde ich sagen',
      content: coachFeedback,
      type: 'coachFeedback',
    },
    {
      headline: 'Außerdem war mir heute noch wichtig',
      content: additional,
      type: 'additional',
    },
  ]
  const [isRatingEditable, setIsRatingEditable] = useState(false)

  async function handleEditDetails(detailType, input) {
    const diaryEntryToChange = {
      ...diaryEntry,
      [detailType]: input,
      edit: { status: true, editOn: moment()._d },
    }
    if (workOfflineStatus) {
      const offlineChangedEntry = {
        ...diaryEntryToChange,
        inDatabase: false,
      }
      onEditDetails([
        ...diaryEntries.slice(0, entryIndex),
        offlineChangedEntry,
        ...diaryEntries.slice(entryIndex + 1),
      ])
    } else {
      const newDiaryEntries = await editEntriesInMongoDB(
        diaryEntries,
        diaryEntryToChange,
        entryIndex
      )
      onEditDetails(newDiaryEntries)
    }
  }

  return (
    <>
      <Header title={'My Diary Entries'} />
      <EntryDetails>
        <BackButton>
          <ArrowBack onBackClick={onBackClick} history={history} />
        </BackButton>
        <h2>Dear Diary from {moment(date).format('L')}</h2>
        {detailsToRender.map(detailObject => (
          <ShowSingleDetail
            key={detailObject.headline}
            title={detailObject.headline}
            content={detailObject.content}
            onEditDetail={handleEditDetails}
            detailType={detailObject.type}
          />
        ))}
        {isRatingEditable ? (
          <OutsideClickHandler
            onOutsideClick={() => setIsRatingEditable(false)}
          >
            <form
              onSubmit={event => {
                event.preventDefault()
                handleEditDetails('rating', event.target.dayrating.value)
                setIsRatingEditable(false)
              }}
            >
              <label>
                <DayRatingInput defaultValue={rating} />
              </label>
              <SaveButton>Change rating</SaveButton>
            </form>
          </OutsideClickHandler>
        ) : (
          <div onClick={() => setIsRatingEditable(true)}>
            <ShowDayRating entryRating={rating} />
            <EditIcon>
              <FontAwesomeIcon icon={faPencilAlt} />
            </EditIcon>
          </div>
        )}
        <StyledDiv>
          Created on <strong>{moment(createDate).format('L')}</strong>
        </StyledDiv>
        {edit.status && (
          <StyledDiv>
            Last edit on <strong>{moment(edit.editOn).format('L')}</strong>
          </StyledDiv>
        )}
        {shared.status && (
          <StyledDiv>
            Last shared with <strong>{shared.sharedWith}</strong>
            <br /> on <strong>{moment(shared.sharedOn).format('L')}</strong>
          </StyledDiv>
        )}
        <Share>
          <ShareViaSlackButton idForURL={id} />
        </Share>
      </EntryDetails>
    </>
  )
}
