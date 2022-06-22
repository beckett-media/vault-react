import styled from 'styled-components';

export const ListOrGridView = styled.div`
  display: flex;
  width: 90vw;
  flex-direction: ${(props) => props.listView ? 'column' : 'row'};
  flex-wrap: wrap;
`

export const ListItemBox = styled.div`
  margin: 10px;
  display: flex;
  flex-direction: row;
`

export const GridItemBox = styled.div`
  margin: 10px;
  display: flex;
  flex-direction: column;
`

export const ListItemImg = styled.img`
  width: 30px;
`

export const GridItemImg = styled.img`
  width: 300px;
`