import * as _ from 'lodash'
import * as React from 'react'

export const Search = React.memo(
  ({ onSearch }: { onSearch: (value: string) => void }) => {
    const debouncedSearch = _.debounce((value: string) => onSearch(value), 800)

    return (
      <input
        type='search'
        onChange={e => {
          debouncedSearch(e.target.value)
        }}
        placeholder='Search'
      />
    )
  }
)
