import styled from 'styled-components';

export const ListOrGridView = styled.div`
  padding: 40px 0;
  width: 100%;

  ${(props) =>
    props.listView
      ? 'display: flex; flex-direction: column; flex-wrap: wrap;'
      : 'display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; grid-column-gap: 16px;'};
`;

export const ListItemBox = styled.div`
  margin: 4px;
  display: flex;
  flex-direction: row;
`;

export const GridItemBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
`;

export const ListItemImg = styled.img`
  width: 50px;
`;

export const GridItemImg = styled.img`
  width: 300px;
`;
