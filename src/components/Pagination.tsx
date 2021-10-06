import React, { useState, useCallback } from 'react'
import Link from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'
import Flex from './Layout/Flex'
import ArrowForwardIos from '@material-ui/icons/ArrowForwardIos'
import ArrowBackIos from '@material-ui/icons/ArrowBackIos'

interface Props {
  totalPage: number
  onChange?: (pageNum: number) => unknown
}

const Pagination: React.FC<Props> = (props) => {
  const [pageNum, setPageNum] = useState(0)

  const onHandlePrev = useCallback(() => {
    if (pageNum > 0 && props.onChange != undefined) {
      setPageNum(pageNum - 1)
      props.onChange(pageNum - 1)
    }
  }, [pageNum, props])

  const onHandleNext = useCallback(() => {
    if (pageNum < props.totalPage / 8 && props.onChange != undefined) {
      setPageNum(pageNum + 1)
      props.onChange(pageNum + 1)
    }
  }, [pageNum, props])

  return (
    <Flex flexDirection="row">
      <Link className="discuss-detail-link" style={{ marginRight: 'auto' }} onClick={onHandlePrev}>
        <Flex flexDirection="row">
          <ArrowBackIos fontSize="small" style={{ marginRight: '0.5rem' }} /> Previous Page
        </Flex>
      </Link>
      <Typography className="discuss-detail-link">
        Viewing {pageNum * 8 + 1} ~ {Math.min(pageNum * 8 + 8, props.totalPage)} of {props.totalPage}
      </Typography>
      <Link className="discuss-detail-link" style={{ marginLeft: 'auto' }} onClick={onHandleNext}>
        <Flex flexDirection="row">
          Next Page <ArrowForwardIos fontSize="small" style={{ marginLeft: '0.5rem' }} />
        </Flex>
      </Link>
    </Flex>
  )
}

export default Pagination
