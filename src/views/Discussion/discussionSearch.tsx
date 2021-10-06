import React, { useState, useEffect, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { Grid } from '@material-ui/core'

import Page from 'components/Layout/Page'
import Header from 'components/Layout/Header'
import HeaderLabel from 'components/Label/HeaderLabel'

import Staff from './components/staff'
import StaffSelect from './components/staffSelect'
import SearchBox from './components/searchBox'
import SearchHeader from 'components/Layout/SearchHeader'
import HeaderContainer from 'components/Layout/HeaderContainer'
import { getSearch } from 'hooks/api'

import { Stuff, Discussion } from 'global/interface'

interface ParamTypes {
  keyword: string
}

const DiscussionSearch: React.FC = () => {
  const [staffs, setStaffs] = useState([])
  const [staffIsSet, setStaffIsSet] = useState(false)
  const [totalSearch, setTotalSearch] = useState(0)

  const { keyword } = useParams<ParamTypes>()
  const [checkArray, setCheckArray] = useState<Array<boolean>>([])

  const updateCheckArray = useCallback((param: Array<boolean>) => {
    setCheckArray(param)
  }, [])

  useEffect(() => {
    if (staffIsSet == false) {
      setStaffIsSet(true)
      getSearch(keyword).then((data) => {
        setStaffs(data)
        let cnt = 0
        for (let i = 0; i < data.length; i++) {
          const discussions = data[i].discussions as Array<Discussion>
          cnt += discussions.length
          if (discussions.length == 0) checkArray.push(false)
          else checkArray.push(true)
          setCheckArray(checkArray)
        }
        setTotalSearch(cnt)
      })
    }
  })

  return (
    <Page className="styled-search">
      <Header>
        <HeaderContainer>
          <HeaderLabel>Search a Discussion</HeaderLabel>
          <SearchHeader content={`You are currently searching for “${keyword}”. Showing ${totalSearch} results.`} />
        </HeaderContainer>
      </Header>
      <Grid container spacing={1}>
        <Grid item sm={12} md={8}>
          {checkArray.map((check: boolean, index: number) => {
            const staff = staffs[index] as Stuff
            if (check == false) return ''
            return <Staff key={staff.title} staff={staff} />
          })}
        </Grid>
        <Grid item sm={12} md={4}>
          <div className="r-display-none">
            <StaffSelect staffs={staffs} checkArray={checkArray} setCheckArray={updateCheckArray} />
          </div>
          <div className="r-display">
            <SearchBox />
          </div>
        </Grid>
      </Grid>
    </Page>
  )
}

export default DiscussionSearch
