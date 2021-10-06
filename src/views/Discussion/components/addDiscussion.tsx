import React, { useState, useCallback } from "react"
import { useHistory } from "react-router-dom"

import {
  Button,
  Grid,
} from '@material-ui/core'
import {
    Theme,
    ThemeProvider,
    makeStyles,
} from '@material-ui/core/styles'

import { greenTheme } from 'styles/theme'

import Flex from 'components/Layout/Flex'
import LabelComponent from 'components/Label/LabelComponent'
import TextField from '@material-ui/core/TextField'
import SwitchButton from 'components/Button/SwitchButton'

import { addNewDiscussion } from "hooks/api"


const useStyles = makeStyles((theme: Theme) => ({
    input: {
      '&::placeholder': {
        textOverflow: 'ellipsis !important'
      },
      width: '100%',
      // '& input': {
      //   padding: theme.spacing(1.5)
      // },
      // '& textarea': {
      //   padding: theme.spacing(1.5)
      // }
    },
    spacing: {
      padding: theme.spacing(1, 0)
    },
    margin: {
      margin: theme.spacing(1, 1)
    }
  }))

interface Props {
    stuff: any,
}

const AddDiscussionForm: React.FC<Props> = (props) => {
    const history = useHistory()
    const classes = useStyles()
    const [anonymous, setAnonymous] = useState(false)
    const [content, setContent] = useState('')
    const [user, setUser] = useState('')
    const [tag, setTag] = useState('')

    const onSwitchAnonymous = useCallback(() => {
        setAnonymous(!anonymous)
    }, [anonymous])

    const onAddDiscussion = useCallback(() => {
      addNewDiscussion(Number(props.stuff.id), content, (anonymous == false? 0: 1), user)
      .then(response => {
        history.push(`/discussion/stuff/${props.stuff.id}`)
        document.location.reload()
      })
    }, [props, content, anonymous, user])

    return (
        <Grid 
          container spacing={1} 
          alignItems="flex-start" 
          style={{marginTop: '1vh', marginBottom: '1vh'}}>
            <Grid item xs={12} sm={12}>
            <Flex
              flexDirection="column"
              alignItems="flex-start"
            >
                <Flex 
                    flexDirection="row"
                    alignItems="flex-start"
                    className="wd-100 flex-row">
                    { anonymous === false ?
                      (<LabelComponent
                      label="Name" 
                      className="wd-50 r-comment-label"
                      >
                          <TextField
                              fullWidth
                              placeholder="Name"
                              InputProps={{ classes: {input: classes.input} }}
                              variant="outlined"
                              value={user}
                              onChange={e => setUser(e.currentTarget.value)}
                          />
                      </LabelComponent>) : ''
                    }
                    
                    <LabelComponent label="Anonymous?" className="wd-50">
                    <SwitchButton 
                    value={anonymous} 
                    onChange={onSwitchAnonymous} 
                    text={anonymous == false ? 'You are not anonymous' : 'You are anonymous'} />
                    </LabelComponent>
                </Flex>
                <Flex 
                flexDirection="row"
                alignItems="flex-start"
                className="wd-100">
                    <LabelComponent
                    label="Message"
                    className={classes.input}
                    >
                    <TextField
                        fullWidth
                        multiline
                        rows={4}
                        placeholder="Message"
                        InputProps={{ classes: {input: classes.input} }}
                        variant="outlined"
                        value={content}
                        onChange={e => setContent(e.currentTarget.value)}
                    />
                    </LabelComponent>
              </Flex>
              <Flex 
                    flexDirection="row"
                    alignItems="flex-start"
                    className="wd-100 flex-row">
                    <LabelComponent
                    label="Tags" 
                    className="wd-50 r-comment-label"
                    >
                        <TextField
                            fullWidth
                            placeholder="Tags (separate by comma)"
                            InputProps={{ classes: {input: classes.input} }}
                            variant="outlined"
                            value={tag}
                            onChange={e => setTag(e.currentTarget.value)}
                        />
                    </LabelComponent>
                    <LabelComponent label="" className="wd-50" />
              </Flex>
              <Flex
                alignItems="center"
                className={`${classes.spacing} ${classes.margin} r-comment-btn`}>
                <ThemeProvider theme={greenTheme}>
                      <Button
                        variant="contained"
                        color="primary"
                        className="r-wd-100"
                        onClick={onAddDiscussion}>
                        Add Discussion Thread
                      </Button>
                </ThemeProvider>
              </Flex>
            </Flex>
            </Grid>
        </Grid>
    )
}

export default AddDiscussionForm