import React, { useEffect, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import SubmitButton from '../../components/Generic/SubmitButton';
import './History.scss';

const ItemsHistory = ({sortedItems, listings, submissions, vaulting}) => {
  const [selected, setSelected] = useState('')
  const [groups,setGroups] = useState({})
  const [statuses, setStatuses] = useState({})
  const navigate = useNavigate()
  useEffect(()=> {
    const groupings = {}
    sortedItems.map(item => {
      const extra = JSON.parse(item.extra)
      if(Object.keys(groupings).includes(extra.uuid)){
        groupings[`${extra.uuid}`].push({...item,...extra})
      }
      else if(extra.uuid !== undefined && extra.uuid !== ''){groupings[`${extra.uuid}`] = [{...item, ...extra}]}
    })
    setGroups(groupings)
  },[sortedItems])
  console.log(groups)
  useEffect(() => {
    console.log(submissions, selected && JSON.parse(groups[selected][0].extra), selected && groups[selected])
    console.log(selected && groups[selected].map(select =>select.id))
    const items = submissions.filter((submission) => selected && groups[selected].map(select =>select.entity).includes(String(submission.item_id)))
    const updatedArr = []
    selected && groups[selected].map((item, i) => items.map(a => item.entity === String(a.item_id) ? updatedArr.push({...item, status_desc: a.status_desc, order_id: a.order_id}) : console.log('false')))
    setGroups({...groups, [selected]: updatedArr})
    console.log(groups[selected])
      // switch (selected) {

      //   case 'listing':
      //     setHistoryItemDetails(listings.filter((listing) => String(listing.id) === selectedArr[0])[0]);
      //     break;
      //   case 'submission':
      //     setHistoryItemDetails(submissions.filter((submission) => String(submission.id) === selectedArr[0])[0]);
      //     break;
      //   case 'vaulting':
      //     setHistoryItemDetails(vaulting.filter((vaulting) => String(vaulting.id) === selectedArr[0])[0]);
      //     break;
      // }
  }, [selected]);
  const rowClicked = (identifier,item) => {
    if(identifier.indexOf('btn') === -1){
      !selected.length ||
      selected !== item ? 
        setSelected(item) :
        setSelected('')
    }
  }
  const printDetails = (order_id) => navigate(`/order-details/${order_id}`)
  return (
    <>
      {Object.keys(groups)?.map(group => {
        const isSelected = group === selected
        return (
          <>
          <Row className='py-3 px-5 border' onClick = {(e)=> rowClicked(e.target.className, group)}>
            <Col xs={8}>
              <div>
              {`${groups[group][0]?.type_desc}:`}
              </div>
              <div className='fw-bold'>
                {group}
              </div>
            </Col>
            <Col xs={1}>
              <Button onClick={()=>printDetails(groups[group][0]?.order_id)}>Print</Button>
            </Col>
            <Col xs={2}>
              <div>{new Date(groups[group][0]?.created_at).toLocaleDateString()}</div>
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
                  <span className='fw-bold'>{item.status_desc}</span>
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