import React from 'react'
import Paginate, { ReactPaginateProps } from 'react-paginate'
import { StyledContainer, StyledPagination, StyledSelector } from './styled'

export type OnPageChangeCallback = ReactPaginateProps['onPageChange']

interface Props {
  page: number
  pageCount: number
  rowsPerPage: number
  onPageChange?: OnPageChangeCallback
  onRowsPerPageChange: (rows: number) => void
}

export const Pagination = ({
  page,
  pageCount,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
}: Props) => {
  return (
    <StyledContainer>
      <StyledPagination>
        <Paginate
          forcePage={page}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={onPageChange}
          nextLabel='&rarr;'
          previousLabel='&larr;'
        />
      </StyledPagination>
      <StyledSelector
        value={rowsPerPage}
        onChange={e => {
          onRowsPerPageChange(Number(e.target.value))
        }}
      >
        {[10, 20, 50, 100, 500, 1000].map(e => (
          <option key={e} value={e}>
            {e}
          </option>
        ))}
      </StyledSelector>
    </StyledContainer>
  )
}
