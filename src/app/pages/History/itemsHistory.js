import React, { useEffect, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getFormattedDate } from '../../utils/date';
import './History.scss';

const ItemsHistory = ({ sortedItems, listings, submissions, vaulting, setSortedItems }) => {
  const [selected, setSelected] = useState('');
  const [groups, setGroups] = useState({});
  const [groupsReady, setGroupsReady] = useState(false)
  const navigate = useNavigate();

  useEffect(() => {
    const groupings = {};
    sortedItems?.map((item) => {
      if (item.extra.length) {
        const extra = item.extra.length && JSON.parse(item.extra);
        if (Object.keys(groupings).includes(extra.uuid)) {
          groupings[`${extra.uuid}`].push({ ...item, ...extra });
        } else if (extra.uuid !== undefined && extra.uuid !== '') {
          groupings[`${extra.uuid}`] = [{ ...item, ...extra }];
        }
      } 
    });
    groupings && Object.keys(groupings).forEach((group) =>{
      const submission = submissions.filter((sub) => sub.item_id === Number(groupings[`${group}`][0].entity))
      if(submission[0]) {
        groupings[`${group}`][0]['order_id'] = submission[0].order_id
      }
    });
    setGroups({...groupings});
  }, [sortedItems]);

  useEffect(() => {
    const items = submissions.filter(
      (submission) => selected && groups[selected].map((select) => select.entity).includes(String(submission.item_id)),
    );
    const updatedArr = [];
    selected &&
      groups[selected].map((item, i) =>
        items.map((a) =>
          item.entity === String(a.item_id)
            ? updatedArr.push({ ...item, status_desc: a.status_desc })
            : console.log('Not Found'),
        ),
      );
    selected && setGroups({ ...groups, [selected]: updatedArr });
  }, [selected]);
  const rowClicked = (identifier, item) => {
    if (identifier.indexOf('btn') === -1) {
      !selected.length || selected !== item ? setSelected(item) : setSelected('');
    }
  };
  const printDetails = (group) => {
    let order_id;
    if (groups[group][0].order_id === undefined) {
      const items = submissions.filter((submission) =>
        groups[group].map((select) => select.entity).includes(String(submission.item_id)),
      );
      items.map((a) => {
        if (groups[group][0].entity === String(a.item_id)) {
          order_id = a.order_id;
        }
      });
    } else order_id = groups[group][0].order_id;
    navigate(`/order-details/${order_id}`);
  };
  return (
    <>
      {Object.keys(groups)?.map((group) => {
        const isSelected = group === selected;
        return (
          <>
            <Row className='py-3 px-5 border' onClick={(e) => rowClicked(e.target.className, group)}>
              <Col xs={8}>
                <div>{groups[group][0]?.type_desc}</div>
                <div className='fw-bold'>{`Order ID: ${groups[group][0]?.order_id}`}</div>
              </Col>
              <Col xs={1}>
                <Button onClick={() => printDetails(group)}>Print</Button>
              </Col>
              <Col xs={2}>
                <div>{getFormattedDate(groups[group][0]?.created_at)}</div>
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
            {isSelected &&
              groups[group].map((item) => (
                <Row className='py-3 px-5 border'>
                  <Col lg={2}>
                    <div>
                      {'Status: '}
                      <br />
                      <span className='fw-bold'>{item.status_desc}</span>
                    </div>
                  </Col>
                  <Col lg={2}>
                    <div>
                      {'ID: '}
                      <br />
                      <span className='fw-bold'>
                        {item.id}
                      </span>
                    </div>
                  </Col>
                  <Col lg={6}>
                    <div>
                      {'Item: '}
                      <br />
                      <span className='fw-bold'>
                        {item.title.length ? item.title : `${item.year} ${item.manufacturer} ${item.card_number} ${item.player}`}
                      </span>
                    </div>
                  </Col>
                </Row>
              ))}
          </>
        );
      })}
    </>
  );
};
export default ItemsHistory;
