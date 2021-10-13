import React, { useEffect, useState } from 'react'
import { VariableSizeGrid as Grid } from 'react-window'
import { Pagination } from './pagination'
import { Search } from './search'
import { SortSymbol, StyledTable, Wrapper } from './styled'

type IValue = any

export type SortOrder = 1 | -1 | 0

export interface IColumn {
  key: string
  title: string
  render?: (value: IValue) => IValue
}

interface IProps {
  columns: IColumn[]
  data: { [key: string]: IValue }[]
}

const highlight = (text: string, search?: string) => {
  if (!search) return text
  const regex = new RegExp(search, 'gi')
  const newText = text.replace(
    regex,
    `<span style="background-color: orange;">$&</span>`
  )
  return <span dangerouslySetInnerHTML={{ __html: newText }} />
}

export const Table = ({ columns, data }: IProps) => {
  const [search, setSearch] = useState({
    value: '',
    isSpecifying: false,
  })
  const [prevSearchResult, setPrevSearchResult] = useState<
    IProps['data'] | undefined
  >()
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [sortBy, setSortBy] = useState<IColumn['key'] | undefined>()
  const [sortOrder, setSortOrder] = useState<SortOrder>(0)

  /**
   * Search
   *
   * Keep previous search result in order to not check all data array
   * on each input in case of just search specifying with the same
   * start part of the text as on the previous search
   */
  const columnKeys = columns.map(e => e.key)
  const searchedData = search.value
    ? (search.isSpecifying && prevSearchResult
        ? prevSearchResult
        : data
      ).filter(e =>
        columnKeys
          .map(key =>
            Array.isArray(e[key]) ? e[key].join(', ') : e[key].toString()
          )
          .some(val => {
            return val.toLowerCase().includes(search.value.toLowerCase())
          })
      )
    : data

  useEffect(() => {
    if (searchedData.length !== (prevSearchResult && prevSearchResult.length))
      setPrevSearchResult(searchedData)
  }, [searchedData])

  // Sort
  const sortedData = sortBy
    ? [...searchedData].sort((a, b) => {
        if (typeof a[sortBy] === 'number')
          return sortOrder * (a[sortBy] - b[sortBy])
        if (Array.isArray(a[sortBy]))
          return (
            sortOrder * a[sortBy].join('').localeCompare(b[sortBy].join(''))
          )
        return sortOrder * a[sortBy].localeCompare(b[sortBy])
      })
    : searchedData

  // Slice for the specific page
  const startSlice = page * rowsPerPage
  const shownData = sortedData.slice(startSlice, startSlice + rowsPerPage)

  const pageCount = Math.ceil(sortedData.length / rowsPerPage)

  const Cell = ({
    columnIndex,
    rowIndex,
    style,
  }: {
    columnIndex: number
    rowIndex: number
    style: React.CSSProperties
  }) => {
    const item = shownData[rowIndex]
    const column = columns[columnIndex]
    if (!item) return null
    return (
      <div
        style={{
          ...style,
          overflowY: 'auto',
          paddingLeft: 8,
          borderBottom: '1px solid lightgray',
        }}
      >
        <div style={{ paddingTop: 8 }}>
          {column.render
            ? highlight(column.render(item[column.key]), search.value)
            : highlight(item[column.key].toString(), search.value)}
        </div>
      </div>
    )
  }

  const [columnWidths, setColumnWidths] = useState<number[] | undefined>()
  const [tableWidth, setTableWidth] = useState(0)

  useEffect(() => {
    const columnWidths = columnKeys.map(key => {
      const header = document.querySelector(`.${key}`)
      return header ? header.clientWidth * (key === 'tags' ? 0.82 : 1.01) : 0
    })
    const tableHeader = document.querySelector('.table-head')
    setColumnWidths(columnWidths)
    setTableWidth(tableHeader ? tableHeader.clientWidth : 0)
  }, [])

  return (
    <Wrapper>
      <Search
        onSearch={value => {
          setSearch(prevSearch => ({
            value,
            isSpecifying: value.startsWith(prevSearch.value),
          }))
          setPage(0)
        }}
      />

      <StyledTable>
        <thead className='table-head' style={{ width: '100%' }}>
          <tr>
            {columns.map(column => (
              <th
                key={column.key}
                className={column.key}
                onClick={() => {
                  if (sortBy === column.key) {
                    sortOrder === 1
                      ? setSortOrder(-1)
                      : sortOrder === -1
                      ? setSortOrder(0)
                      : setSortOrder(1)
                  } else {
                    setSortOrder(1)
                    setSortBy(column.key)
                  }
                }}
                style={{
                  cursor: 'pointer',
                  userSelect: 'none',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <div style={{ width: 10, marginRight: 'auto' }} />
                  <div>{column.title}</div>
                  <SortSymbol order={column.key === sortBy ? sortOrder : 0}>
                    <span>▲</span>
                    <span>▼</span>
                  </SortSymbol>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <div>
          {columnWidths && columnWidths.length && tableWidth && (
            <Grid
              columnCount={columnKeys.length}
              columnWidth={index => columnWidths[index]}
              height={650}
              rowCount={shownData.length}
              rowHeight={() => 80}
              width={tableWidth}
              style={{ overflowX: 'hidden' }}
            >
              {Cell}
            </Grid>
          )}
        </div>
      </StyledTable>

      <Pagination
        page={page}
        pageCount={pageCount}
        rowsPerPage={rowsPerPage}
        onPageChange={({ selected }) => setPage(selected)}
        onRowsPerPageChange={rows => {
          setPage(0)
          setRowsPerPage(rows)
        }}
      />
    </Wrapper>
  )
}
