import React, { useCallback, useContext, useState } from 'react'

import { Button, Grid } from '@material-ui/core'
import { Theme, ThemeProvider, makeStyles } from '@material-ui/core/styles'

import { greenTheme } from 'styles/theme'

import Flex from 'components/Layout/Flex'
import LabelComponent from 'components/Label/LabelComponent'
import TextField from '@material-ui/core/TextField'
import SwitchButton from 'components/Button/SwitchButton'
import { useGlobalState } from 'state-pool'

import { addNewComment } from 'hooks/api'
import { Comment } from 'global/interface'

import { signText, checkSign } from 'global/wallet'
import { ArcadeContext } from 'contexts/ArcadeContext'

const useStyles = makeStyles((theme: Theme) => ({
  input: {
    '&::placeholder': {
      textOverflow: 'ellipsis !important',
    },
    width: '100%',
    fontSize: '13px',
    background: '#FDFCF8',
    // '& input': {
    //   padding: theme.spacing(1.5)
    // },
    // '& textarea': {
    //   padding: theme.spacing(1.5)
    // }
  },
  spacing: {
    padding: theme.spacing(1, 0),
  },
  margin: {
    margin: theme.spacing(1, 1),
  },
}))

interface Props {
  comment: Comment
  visible: boolean
  onReset: (comment: Comment) => unknown
}

const AddReply: React.FC<Props> = (props) => {
  const classes = useStyles()
  const account = useContext(ArcadeContext)?.account
  const [anonymous, setAnonymous] = useState(false)
  const [content, setContent] = useState('')
  const [user, setUser] = useState('')
  const [, setCommentState] = useGlobalState('commentState')

  const onSwitchAnonymous = () => {
    setAnonymous(!anonymous)
  }

  const getCurrentTime = () => {
    const today = new Date()
    const date = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate() + ' ' + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
    return date
  }

  const onAddComment = useCallback(async () => {
    if (account === '' || account === undefined) return

    const signature = await signText(content, account)
    const is_signed = await checkSign(content, signature, account)

    if (is_signed !== true) 
      console.log("Signature Verify failed!")

    addNewComment(
      Number(props.comment.discussion_id),
      Number(props.comment.id),
      content,
      anonymous === false ? 0 : 1,
      user,
      signature,
      account
    ).then((res) => {
      if (res.result === true) {
        setCommentState(2)
        const commentData: Comment = {
          id: res.data,
          likes: 0,
          discussion_id: Number(props.comment.discussion_id),
          parent_id: Number(props.comment.id),
          user: user,
          user_type: anonymous === false ? 0 : 1,
          content: content,
          updated_at: getCurrentTime(),
          reply: [],
          user_like: []
        }

        props.onReset(commentData)
        //document.location.reload()
      } else {
        console.log(res.data)
      }
    })
  }, [props, account, anonymous, content, user, setCommentState])

  if (props.visible === false) return <div />

  return (
    <Grid
      container
      spacing={1}
      alignItems="flex-start"
      style={{ marginTop: '1vh', marginBottom: '1vh', borderTop: 'solid 1px #EFECDC' }}
    >
      <Grid item xs={12} sm={12}>
        <Flex flexDirection="column" alignItems="flex-start">
          <Flex flexDirection="row" alignItems="flex-start" className="wd-100 flex-row">
            {anonymous === false ? (
              <LabelComponent label="Name" className="wd-50 r-comment-label">
                <TextField
                  fullWidth
                  placeholder="Name"
                  InputProps={{ classes: { input: classes.input } }}
                  variant="outlined"
                  value={user}
                  onChange={(e) => setUser(e.currentTarget.value)}
                />
              </LabelComponent>
            ) : (
              ''
            )}

            <LabelComponent label="Anonymous?" className="wd-50">
              <SwitchButton
                value={anonymous}
                onChange={onSwitchAnonymous}
                text={anonymous === false ? 'You are not anonymous' : 'You are anonymous'}
              />
            </LabelComponent>
          </Flex>
          <Flex flexDirection="row" alignItems="flex-start" className="wd-100">
            <LabelComponent label="Message" className={classes.input}>
              <TextField
                fullWidth
                multiline
                rows={4}
                placeholder="Message"
                InputProps={{ classes: { input: classes.input } }}
                variant="outlined"
                value={content}
                onChange={(e) => setContent(e.currentTarget.value)}
              />
            </LabelComponent>
          </Flex>
          <Flex alignItems="center" className={`${classes.spacing} ${classes.margin} r-comment-btn`}>
            <ThemeProvider theme={greenTheme}>
              <Button variant="contained" color="primary" className="r-wd-100" onClick={onAddComment}>
                Send a Reply
              </Button>
            </ThemeProvider>
          </Flex>
        </Flex>
      </Grid>
    </Grid>
  )
}

export default AddReply
