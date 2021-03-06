import React, { useState } from 'react'
import styled from 'styled-components'
import OutsideClickHandler from 'react-outside-click-handler'
import { Link } from 'react-router-dom'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons'
import { DiaryEntryMenu } from './DiaryEntryMenu'
import { DiaryEntryCardContent } from './DiaryEntryCardContent'
import PropTypes from 'prop-types'
library.add(faEllipsisH)

const CardContainer = styled.section`
  position: relative;
  margin-bottom: 30px;
`

const CardLink = styled(Link)`
  text-decoration: none;
  overflow: hidden;
`

const MenueIcon = styled.button`
  bottom: 1%;
  color: #002f47;
  font-size: 1.5rem;
  left: 85%;
  position: absolute;
  section {
    font-size: 1.2rem;
  }
`
const MenuContainer = styled.div`
  position: absolute;
  right: 50px;
  top: -26px;
  z-index: 10;
`

export function DiaryEntryCard({ DeleteMenuClick, history, entry }) {
  const [isMenuVisible, setIsMenuVisible] = useState(false)

  return (
    <OutsideClickHandler onOutsideClick={() => setIsMenuVisible(false)}>
      <CardContainer>
        <CardLink to={`/entries/${entry._id || entry.id}`}>
          <DiaryEntryCardContent entry={entry} />
        </CardLink>
        <MenueIcon onClick={() => setIsMenuVisible(!isMenuVisible)}>
          <FontAwesomeIcon icon={faEllipsisH} />
          {isMenuVisible && (
            <MenuContainer>
              <DiaryEntryMenu
                history={history}
                entryId={entry._id || entry.id}
                onDeleteMenuClick={DeleteMenuClick}
              />
            </MenuContainer>
          )}
        </MenueIcon>
      </CardContainer>
    </OutsideClickHandler>
  )
}

DiaryEntryCard.propTypes = {
  entry: PropTypes.object,
  history: PropTypes.object.isRequired,
  DeleteMenuClick: PropTypes.func.isRequired,
}
