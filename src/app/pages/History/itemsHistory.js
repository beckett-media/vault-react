import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import SubmitButton from '../../components/Generic/SubmitButton';
import './History.scss';

const ItemsHistory = (props) => {
  // const toggleIsSelected = (entity, entity_type_desc) =>
  //   selected.split('-')[0] === entity ? setSelected('') : setSelected(`${entity}-${entity_type_desc}`);
  const {sortedItems, historyItemDetails} = props;
  const [selected, setSelected] = useState('')
  const [groups,setGroups] = useState({})
  useEffect(()=> {
    const groupings = {}
    sortedItems.map(item => {
      const extra = JSON.parse(item.extra)
      if(Object.keys(groupings).includes(extra.uuid)){
        groupings[`${extra.uuid}`].push({...item,...extra})
      }
      else if(extra.uuid !== undefined){groupings[`${extra.uuid}`] = [{...item, ...extra}]}
    })
    setGroups(groupings)
  },[sortedItems])
  const rowClicked = (identifier,item) => {
    if(identifier.indexOf('btn') === -1){
      !selected.length ||
      selected !== item ? 
        setSelected(item) :
        setSelected('')
    }
  }
  return (
    <>
      {Object.keys(groups)?.map(group => {
        const isSelected = group === selected
        return (
          <>
          <Row className='py-3 px-5 border' onClick = {(e)=> rowClicked(e.target.className, group)}>
            <Col xs={8}>
              <div>
              {`${groups[group][0].type_desc}:`}
              </div>
              <div className='fw-bold'>
                {group}
              </div>
            </Col>
            <Col xs={1}>
              <SubmitButton title={'print'} onClick={()=>{}}/>
            </Col>
            <Col xs={2}>
              <div>{new Date(groups[group][0].created_at).toLocaleDateString()}</div>
            </Col>
            {isSelected ? (
              <Col xs={1} className='right-align px-4'>
                &and;
              </Col>
            ) : (
              <Col xs={1} className='right-align px-4'>
                &or;
              </Col>
            )}
          </Row>
          {isSelected && groups[group].map(item=>
            <Row className='py-3 px-5 border'>
              <Col lg={4}>
                <div>
                  {'Status: '}
                  <br />
                  <span className='fw-bold'>Need to get status</span>
                </div>
              </Col>
              <Col lg={6}>
                <div>
                  {'Item: '}
                  <br />
                  <span className='fw-bold'>{item.title.length? item.title : `${item.year} ${item.manufacturer} ${item.player}`}</span>
                </div>
              </Col>
            </Row>
          )}</>
        )}
      )}
      
  </>
  )
}
export default ItemsHistory;  

// <div key={item.id} id={item.id} onClick={() => toggleIsSelected(item.entity, item.entity_type_desc)}>
// <Row className='py-3 border'>
//   <Col xs={8} className='fw-bold'>
//     <div>
//       {item.type_desc} - {item.id}
//     </div>
//   </Col>
//   <Col xs={3}>
//     <div>{new Date(item.created_at).toLocaleDateString()}</div>
//   </Col>
//   {isSelected ? (
//     <Col xs={1} className='right-align px-4'>
//       &and;
//     </Col>
//   ) : (
//     <Col xs={1} className='right-align px-4'>
//       &or;
//     </Col>
//   )}
// </Row>
// {isSelected && (
//   <Row className='py-3 px-5 border'>
//     <Col lg={2}>
//       <div>
//         {'Status: '}
//         <br />
//         <span className='fw-bold'>{historyItemDetails.status_desc}</span>
//       </div>
//     </Col>
//     <Col lg={2}>
//       <div>
//         {`${item.entity_type_desc} ID: `}
//         <br />
//         <span className='fw-bold'>{historyItemDetails.id}</span>
//       </div>
//     </Col>
//     <Col lg={8}>
//       <div>
//         {'Item: '}
//         <br />
//         <span className='fw-bold'>{historyItemDetails.title}</span>
//       </div>
//     </Col>
//   </Row>
// )}
// </div>