import React, { useState, useCallback, useEffect } from 'react'
import { Button, Typography } from '@material-ui/core'
import Flex from '../Layout/Flex'
import ArrowForwardIos from '@material-ui/icons/ArrowForwardIos'
import ArrowBackIos from '@material-ui/icons/ArrowBackIos'

interface Props {
  totalPage: number
  rowsPerPage: number
  onChange?: (pageNum: number) => unknown
}

const RedPagination: React.FC<Props> = (props) => {
  const [pageNum, setPageNum] = useState(0)
  const [prevDisabled, setPrevDisabled] = useState(true)
  const [nextDisabled, setNextDisabled] = useState(pageNum + 1 > props.totalPage / props.rowsPerPage? true: false)

  useEffect(() => {
    if (props.totalPage === 0 || props.rowsPerPage === undefined || props.rowsPerPage <= 0) return
    if (pageNum === 0) {
      setPrevDisabled(true)
    } else {
      setPrevDisabled(false)
    }

    if (pageNum + 1 > props.totalPage / props.rowsPerPage) {
      console.log(props.totalPage / props.rowsPerPage)
      setNextDisabled(true)
    } else {
      setNextDisabled(false)
    }
  }, [pageNum])

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
    <Flex flexDirection="row" style={{ width: '100%', marginTop: '0.5rem', }} className="red-paginator">
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
        Showing {pageNum * props.rowsPerPage + 1} ~{' '}
        {Math.min(pageNum * props.rowsPerPage + props.rowsPerPage, props.totalPage)} of {props.totalPage}
      </Typography>
      <Button
        variant="contained"
        color="secondary"
        onClick={onHandleNext}
        className="pagination-btn"
        endIcon={<ArrowForwardIos fontSize="small" />}
        style={{ marginLeft: 'auto' }}
        disabled={nextDisabled}
      >
        <Typography variant="subtitle1">Next</Typography>
      </Button>
    </Flex>
  )
}

export default RedPagination
