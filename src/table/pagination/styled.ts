import styled from 'styled-components'

export const StyledContainer = styled.div`
  display: flex;
  align-items: flex-end;
`

export const StyledSelector = styled.select`
  margin-left: 38px;
  height: 36px;
  font-size: 16px;
  border-color: #cfcfcf;
`

export const StyledPagination = styled.div`
  margin-top: 38px;

  .selected a {
    box-shadow: 0 0 2px #1b7d9e;
    background-color: #f3fcff;
  }

  .disabled > a {
    color: #ccc;
    background-color: #f8f8f8;
    border-color: #eee;
    cursor: default;
  }

  .disabled > a:hover {
    background-color: #f8f8f8;
  }
  .break {
    margin: 0 8px;
  }

  .previous {
    margin-right: 1rem;
  }

  .next {
    margin-left: 1rem;
  }

  ul {
    padding: 0;
    margin: 0;
  }

  li {
    display: inline-block;
  }

  li > a {
    padding: 0.5rem;
    margin: 1px;
    display: inline-block;
    cursor: pointer;
    background-color: #fff;
    border: 1px solid #cfcfcf;
    border-radius: 2px;
    min-width: 1rem;
  }

  li > a:focus {
    outline: none;
  }
`
