import React from 'react'
import styled from 'styled-components'

const DiaryEntryCard = styled.li`
  align-items: center;
  border: solid 1px #007fbf;
  border-radius: 10px;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.5);
  display: grid;
  grid-template-columns: 0.8fr auto;
  grid-template-rows: repeat(4, 30px);
  height: 130px;
  list-style: none;
  margin-bottom: 40px;
  overflow: hidden;
  white-space: nowrap;

  h2,
  h3,
  h4 {
    color: #007fbf;
    font-size: 1rem;
    justify-self: left;
    margin: 0;
    padding: 5px;
  }
  h3 {
    font-size: 0.8rem;
  }
  h4 {
    color: #002f47;
    font-size: 0.8rem;
  }
  img {
    align-self: center;
    grid-row: span 4;
    justify-self: center;
    margin: 0 5px;
    padding: 5px;
  }
  span {
    font-size: 1.3rem;
    margin-left: 15px;
  }
`

export function DiaryEntry({ entries }) {
  return entries.map(entry => (
    <DiaryEntryCard key={entry.title}>
      <img src="./icons/diary-entry.png" alt="diary entry book icon" />
      <h2>Diary Entry from {entry.date}</h2>
      <h3>Topic of the day</h3>
      <h4>{entry.title || 'No Topic'}</h4>
      {entry.rating ? (
        <h3>
          This day was: <span>{evaluateRating(entry.rating)}</span>
        </h3>
      ) : (
        <h3>No rating of this day</h3>
      )}
    </DiaryEntryCard>
  ))
}

function evaluateRating(rating) {
  const ratingMap = {
    1: '😔',
    2: '😶',
    3: '😃',
  }
  return ratingMap[rating]
}
