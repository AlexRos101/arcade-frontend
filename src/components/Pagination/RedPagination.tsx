import React, { useState, useCallback, useEffect } from 'react'
import { Button, Typography } from '@material-ui/core'
import Flex from '../Layout/Flex'
import ArrowForwardIos from '@material-ui/icons/ArrowForwardIos'
import ArrowBackIos from '@material-ui/icons/ArrowBackIos'

interface Props {
  totalPage: number
  rowsPerPage: number
  onChange?: (pageNum: number) => unknown
  className?: string
}

const RedPagination: React.FC<Props> = (props) => {
  const [pageNum, setPageNum] = useState(0)
  const [prevDisabled, setPrevDisabled] = useState(true)
  const [nextDisabled, setNextDisabled] = useState(true)

  const refresh = () => {
    if (props.totalPage === 0 || props.rowsPerPage === undefined || props.rowsPerPage <= 0) {
      setTimeout(refresh, 200)
      return
    }
    if (pageNum === 0) {
      setPrevDisabled(true)
    } else {
      setPrevDisabled(false)
    }

    if (pageNum + 1 >= props.totalPage / props.rowsPerPage) {
      setNextDisabled(true)
    } else {
      setNextDisabled(false)
    }
  }

  useEffect(() => {
    refresh()
  }, [pageNum, props])

  const onHandlePrev = useCallback(() => {
    if (pageNum > 0 && props.onChange !== undefined) {
      setPageNum(pageNum - 1)
      props.onChange(pageNum - 1)
    }
  }, [pageNum, props])

  const onHandleNext = useCallback(() => {
    if (pageNum < props.totalPage / props.rowsPerPage && props.onChange !== undefined) {
      setPageNum(pageNum + 1)
      props.onChange(pageNum + 1)
    }
  }, [pageNum, props])

  return (
    <Flex flexDirection="row" style={{ width: '100%', marginTop: '0.5rem', }} className={`red-paginator ${props.className}`}>
      <Button
        variant="contained"
        color="secondary"
        onClick={onHandlePrev}
        className="pagination-btn"
        style={{ marginRight: 'auto' }}
        startIcon={<ArrowBackIos fontSize="small" />}
        disabled={prevDisabled}
      >
        <Typography variant="subtitle1">Previous</Typography>
      </Button>
      <Typography className="discuss-detail-link">
        Showing Page { props.totalPage == 0 ? 0 : pageNum + 1 } of { Math.ceil(props.totalPage / props.rowsPerPage) }
      </Typography>
      <Button
        variant="contained"
        color="secondary"
        onClick={onHandleNext}
        className="pagination-btn"
        endIcon={<ArrowForwardIos fontSize="small" style={{ marginLeft: '4px' }} />}
        style={{ marginLeft: 'auto' }}
        disabled={nextDisabled}
      >
        <Typography variant="subtitle1">Next</Typography>
      </Button>
    </Flex>
  )
}

export default RedPagination
