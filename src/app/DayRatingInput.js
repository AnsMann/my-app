import React, { useState } from 'react'
import styled from 'styled-components'

const StyledRatingInput = styled.div`
  display: flex;
  font-size: 1.5rem;
  justify-content: space-around;
  padding: 1px;
  input {
    display: none;
    margin-right: 15px;
    &:checked + span {
      border-color: #007fbf;
      &:after {
        transform: scale(1);
      }
    }
  }
  label {
    position: relative;
  }
  span {
    border: 2px solid #007fbf;
    border-radius: 50%;
    display: block;
    float: left;
    height: 20px;
    margin-right: 10px;
    position: relative;
    top: 5px;
    width: 20px;
    &:after {
      background: #007fbf;
      border-radius: 50%;
      content: '';
      height: 10px;
      left: 3px;
      position: absolute;
      top: 3px;
      transform: scale(0);
      transition: all 0.2s ease;
      width: 10px;
    }
  }
`

export function DayRatingInput() {
  const ratingOptions = [
    {
      rating: '3',
      output: '😃',
      default: false,
    },
    {
      rating: '2',
      output: '😶',
      default: false,
    },
    {
      rating: '1',
      output: '😔',
      default: false,
    },
  ]

  return (
    <StyledRatingInput>
      {ratingOptions.map(option => (
        <RatingOptions key={option.rating} options={option} />
      ))}
    </StyledRatingInput>
  )
}

function RatingOptions({ options }) {
  const [isChecked, setIsChecked] = useState(options.default)
  return (
    <label>
      <input
        onChange={() => setIsChecked(!isChecked)}
        type="radio"
        name="dayrating"
        value={options.rating}
        checked={isChecked}
      />
      <span />
      {options.output}
    </label>
  )
}
