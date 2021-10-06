import React, { useState } from "react"
import { useHistory } from 'react-router-dom'

import {
    Button,
    Grid,
    ThemeProvider,
    TextField,
    Typography,
    InputAdornment
} from '@material-ui/core'

import SearchIcon from '@material-ui/icons/Search'

interface Props
{
    content: string
}

const SearchHeader: React.FC<Props> = (props) =>{
    const history = useHistory()
    const [keyword, setKeyword] = useState('')

    const handleKeyDown = (e: any) => {
        if (e.key === 'Enter' && keyword != '') {
            history.push(`/discussion/search/${keyword}`)
            document.location.reload()
        }
    }

    return(
        <div className="flex-row wd-100">
            <p style={{marginBottom:'0'}}>{props.content}</p>
            <TextField
                
                placeholder="Search for Discussion"
                InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                    <SearchIcon />
                    </InputAdornment>
                )
                }}
                style={{marginLeft: 'auto', marginTop:'auto', marginBottom:'auto'}}
                className="r-display-none"
                variant="outlined"
                onKeyDown={handleKeyDown}
                value={keyword}
                onChange={e => setKeyword(e.currentTarget.value)}
            />
        </div>
    )
}

export default SearchHeader