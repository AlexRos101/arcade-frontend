import React from "react"
import {
    Button,
    Grid,
    ThemeProvider,
    TextField,
    Typography,
    InputAdornment
  } from '@material-ui/core'

import Link from '@material-ui/core/Link'

import CommentLabel from 'components/Label/CommentLabel'

import RocketIcon from 'assets/img/rocket.svg'
import ReplyIcon from 'assets/img/reply.svg'
import IconLabel from 'components/Label/IconLabel'

interface Props {
    comment: any
}

const CommentContent: React.FC<Props> = (props) => {
    const comment = props.comment
    
    return  (
        <div>
            <Grid
                container
                alignItems="center"
                justifyContent="space-between"
                direction="row"
            >
                <CommentLabel>{comment.content}</CommentLabel>
            </Grid>
            <Grid
                container
                alignItems="center"
                justifyContent="space-between"
                direction="row">
                <div className="flex-row r-flex-row"> 
                    <IconLabel
                    avatar={RocketIcon}
                    label={comment.likes}
                    style={{ color: '#B7B091', marginRight: '1rem' }}
                    />
                    <Link href="#">
                        <IconLabel
                        avatar={ReplyIcon}
                        label="Send a reply"
                        style={{ color: '#B7B091' }}
                        />
                    </Link>
                </div>
                <div className="flex-row r-flex-row">
                    <IconLabel
                    label={comment.user_type == 1 ? 'anonymous' : comment.user}
                    style={{ color: '#B7B091', marginRight: '1rem' }}
                    />
                    <IconLabel
                    label="5 hrs ago"
                    style={{ color: '#B7B091', marginRight: '1rem' }}
                    />
                </div>
            </Grid>
        </div>
    )
}

export default CommentContent
