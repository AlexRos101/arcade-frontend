import React, { useState, useEffect } from "react"
import { useHistory } from 'react-router-dom'

import {
    Button,
    Grid,
    ThemeProvider,
    TextField,
    Typography,
    InputAdornment
} from '@material-ui/core'

import {
    makeStyles
} from '@material-ui/core/styles'

import StaffSelectItem from "./staffSelectItem"
import { OutlinedCard } from 'components/Card'

const useStyles = makeStyles({
    searchCardTitle: {
      color: '#9D9468'
    },
    searchCardBody: {
      color: '#433F2F'
    },
  })
  
interface Props {
    staffs: any
    checkArray: any
    setCheckArray: any
}

const StaffSelect: React.FC<Props> = (props) => {
    
    const history = useHistory()
    const classes = useStyles()

    const checkArray = [] as Array<any>
    props.checkArray.forEach((check: any) => {
        checkArray.push(check)
    })
    
    const [initialized, setInitialized] = useState(false)

    if (checkArray.length > 0 && initialized == false) {
        setInitialized(true)
    }

    const onChange = (checked: boolean, index: number) => {
        checkArray[index] = checked
        props.setCheckArray(checkArray)
        setInitialized(true)
    }

    return (
        <OutlinedCard>
            <Typography
                gutterBottom
                variant="h3"
                component="div"
                className={classes.searchCardTitle}
            >
                Filter by Category:
            </Typography>
            {
                props.staffs.map((staff: any, index: number) => {
                    const discussions = staff.discussions as any
                    if (discussions.length == 0) {
                        return ('')
                    }
                    return (<StaffSelectItem title={staff.title} index={index} checked={true} onChange={onChange}/>)
                })
            }
        </OutlinedCard>
)
}

export default StaffSelect