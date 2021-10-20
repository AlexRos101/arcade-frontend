import React, { useState, useCallback } from 'react'
import { useHistory } from 'react-router-dom'

import { TextField, InputAdornment } from '@material-ui/core'

import SearchIcon from '@material-ui/icons/Search'

interface Props {
  content: string
}

const SearchHeader: React.FC<Props> = (props) => {
  const history = useHistory()
  const [keyword, setKeyword] = useState('')

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' && keyword !== '') {
      history.push(`/discussion/search/${keyword}`)
      document.location.reload()
    }
  }, [history, keyword])

  return (
    <div className="flex-row wd-100">
      <p style={{ marginBottom: '0' }}>{props.content}</p>
      <TextField
        placeholder="Search for Discussion"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        style={{ marginLeft: 'auto', marginTop: 'auto', marginBottom: 'auto' }}
        className="r-display-none"
        variant="outlined"
        onKeyDown={handleKeyDown}
        value={keyword}
        onChange={(e) => setKeyword(e.currentTarget.value)}
      />
    </div>
  )
}

export default SearchHeader
