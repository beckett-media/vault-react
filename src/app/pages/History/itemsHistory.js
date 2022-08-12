import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import SubmitButton from '../../components/Generic/SubmitButton';
import './History.scss';

const ItemsHistory = (props) => {
  // const toggleIsSelected = (entity, entity_type_desc) =>
  //   selected.split('-')[0] === entity ? setSelected('') : setSelected(`${entity}-${entity_type_desc}`);
  const {sortedItems, selected, setSelected, historyItemDetails} = props;
  const [groups,setGroups] = useState({})
  useEffect(()=> {
    const groupings = {}
    sortedItems.map(item => {
      const extra = JSON.parse(item.extra)
      if(Object.keys(groupings).includes(extra.uuid)){
        groupings[`${extra.uuid}`].push(extra)
      }
      else if(extra.uuid !== undefined){groupings[`${extra.uuid}`] = [item]}
    })
    setGroups(groupings)
  },[sortedItems])

  return (
    <>{
    Object.keys(groups)?.map(group => {
      console.log(group, groups, groups[group])
      return (
        <Row>
          <Col>
            <div className='fw-bold'>
              {`ID: ${group}`}
            </div>
          </Col>
        </Row>
      )}
    )}
  </>)
}
export default ItemsHistory;  