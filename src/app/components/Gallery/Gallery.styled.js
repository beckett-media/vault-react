import styled from 'styled-components';

export const ListOrGridView = styled.div`
  display: flex;
  width: 100vw;
  flex-direction: ${(props) => props.listView ? 'column' : 'row'};
  flex-wrap: wrap;
`

export const ItemBox = styled.div`
  margin: 10px;
`

export const ItemImg = styled.img`
  width: 300px;
`