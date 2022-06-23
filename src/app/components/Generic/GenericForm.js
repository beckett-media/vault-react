import React from 'react'
import { useSelector } from 'react-redux'
import { selectedItemIdsSelector } from '../../state/selectors'

const GenericForm = (props) => {
  const selectedItemIds = useSelector(selectedItemIdsSelector)
  console.log('generic', selectedItemIds)
  const genericFormItems = () => props.items.map(item => 
    selectedItemIds.ids.includes(item.id) &&
    <div>
      {item.serialNumber} - {item.description}
    </div>
  )
  return (
    <>
      <div>{props.title}</div>
      {genericFormItems()}
    </>
  )
}

export default GenericForm