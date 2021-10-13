import styled from 'styled-components'
import { SortOrder } from './index'

export const StyledTable = styled.table`
  width: 100%;
  margin-top: 16px;
  padding: 4px 0;
  border-collapse: collapse;
  table-layout: fixed;
  overflow: auto;

  th {
    position: sticky;
    top: 0;
    background-color: lightgrey;
  }

  th,
  td {
    border: 1px solid black;
    padding: 8px;
  }
`

export const SortSymbol = styled.div<{ order: SortOrder }>`
  display: flex;
  flex-direction: column;
  margin-left: auto;
  color: gray;
  font-size: 12px;

  span:nth-of-type(${({ order }) => (order === 1 ? 2 : order === -1 ? 1 : 0)}) {
    color: black;
  }
`

export const Wrapper = styled.div`
  font-family: 'Gill Sans', sans-serif;
`
