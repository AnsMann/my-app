import React from 'react'
import moment from 'moment'
import 'moment/locale/de'

import { Header } from './Header'
import { DiaryEntryForm } from './DiaryEntryForm'
import { findIndex, editEntriesInMongoDB } from './utils'

moment.locale('de')

export function EditDiaryEntry({
  diaryEntries,
  diaryID,
  history,
  onFormSubmit,
}) {
  const entryIndex = findIndex(diaryID, diaryEntries)

  async function handleSubmitEditEntry(target, date) {
    const diaryEntrytoChange = diaryEntries[entryIndex]
    const changedDiaryEntry = {
      ...diaryEntrytoChange,
      title: target.topic.value,
      date: date,
      rating: target.dayrating.value,
      content: target['content in own words'].value,
      positive: target['remember positive'].value,
      negative: target['remember negative'].value,
      coachFeedback: target['coach feedback'].value,
      additional: target['anything else'].value,
      edit: { status: true, editOn: moment()._d },
    }
    const newDiaryEntries = await editEntriesInMongoDB(
      diaryEntries,
      changedDiaryEntry,
      entryIndex
    )
    onFormSubmit(newDiaryEntries, history)
  }

  return (
    <>
      <Header title={'Edit Diary Entries'} />
      <DiaryEntryForm
        onFormSubmit={handleSubmitEditEntry}
        diaryEntryToEdit={diaryEntries[entryIndex]}
      />
    </>
  )
}
