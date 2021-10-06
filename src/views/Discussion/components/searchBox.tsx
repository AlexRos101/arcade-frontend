import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

import { TextField, Typography, InputAdornment } from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles'

import SearchIcon from '@material-ui/icons/Search'

import { OutlinedCard } from 'components/Card'

const useStyles = makeStyles({
  searchCardTitle: {
    color: '#9D9468',
  },
  searchCardBody: {
    color: '#433F2F',
  },
})

const SearchBox: React.FC = () => {
  const history = useHistory()
  const classes = useStyles()

  const [keyword, setKeyword] = useState('')

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' && keyword != '') {
      history.push(`/discussion/search/${keyword}`)
      document.location.reload()
    }
  }

  return (
    <OutlinedCard className="outlined-card">
      <Typography gutterBottom variant="h3" component="div" className={classes.searchCardTitle}>
        Looking for something specific?
      </Typography>
      <Typography
        gutterBottom
        variant="subtitle1"
        component="div"
        className={`${classes.searchCardBody} r-display-none`}
      >
        Try searching for it first before you create a discussion thread.
      </Typography>
      <TextField
        fullWidth
        placeholder="Search for Discussion"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        variant="outlined"
        onKeyDown={handleKeyDown}
        value={keyword}
        onChange={(e) => setKeyword(e.currentTarget.value)}
      />
    </OutlinedCard>
  )
}

export default SearchBox
