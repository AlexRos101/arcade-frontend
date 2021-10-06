import React from 'react'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import Select from '@material-ui/core/Select'
import FormControl from '@material-ui/core/FormControl'
import { makeStyles, withStyles, Theme, createStyles } from '@material-ui/core/styles'
import { CategoryTab } from 'global/interface'

interface StyledTabsProps {
  value: number
  onChange: (event: React.ChangeEvent<unknown>, newValue: number) => void
}

interface StyledTabProps {
  label: string
}

const AntTabs = withStyles({
  root: {
    borderBottom: '0px',
    minHeight: '0px',
    height: '40px',
  },
  indicator: {
    backgroundColor: 'transparent',
    display: 'flex',
    justifyContent: 'center',
    '& > span': {
      width: 'calc(100% - 20px)',
      backgroundColor: '#092733',
    },
  },
})((props: StyledTabsProps) => <Tabs {...props} variant="scrollable" TabIndicatorProps={{ children: <span /> }} />)

const AntTab = withStyles((theme: Theme) =>
  createStyles({
    root: {
      textTransform: 'none',
      minWidth: 'fit-content',
      fontWeight: 600,
      fontSize: '14px',
      marginRight: theme.spacing(2),
      fontFamily: [
        '-apple-system',
        'Montserrat',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        'Oxygen',
        'Ubuntu',
        'Cantarell',
        'Fira Sans',
        'Droid Sans',
        'Helvetica Neue',
      ].join(','),
      '&:hover': {
        color: '#092733',
        opacity: 1,
      },
      '&$selected': {
        color: '#092733',
        fontWeight: theme.typography.fontWeightMedium,
      },
      '&:focus': {
        color: '#092733',
      },
    },
    selected: {},
  }),
)((props: StyledTabProps) => <Tab disableRipple {...props} />)

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
  },
  padding: {
    padding: theme.spacing(0),
  },
  demo1: {
    backgroundColor: 'transparent',
  },
  demo2: {
    backgroundColor: '#2e1534',
  },
}))

interface TabsData {
  tabs: Array<CategoryTab>
  refresh: (category: number, sort: number) => unknown
}

const TabRow: React.FC<TabsData> = (props) => {
  const classes = useStyles()
  const [value, setValue] = React.useState(0)
  const [sort, setSort] = React.useState(0)

  const handleChange = (event: React.ChangeEvent<unknown>, newValue: number) => {
    setValue(newValue)

    props.refresh(props.tabs[newValue].categoryId, sort)
  }

  const handleChangeSort = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSort(event.target.value as number)
    props.refresh(props.tabs[value].categoryId, sort)
  }

  return (
    <div className="flex-row tab-row">
      <div className={classes.root}>
        <div className={classes.demo1}>
          <AntTabs value={value} aria-label="ant example" onChange={handleChange}>
            {props.tabs.map((tab, index) => {
              return <AntTab key={index} label={tab.tabName} />
            })}
          </AntTabs>
          <Typography className={classes.padding} />
        </div>
      </div>
      <FormControl variant="outlined" className="market-form-control tab-select r-no-display">
        <Select value={sort} className="market-map-select" onChange={handleChangeSort}>
          <option value={0}>Most Recent</option>
          <option value={1}>Price (Low to High)</option>
          <option value={2}>Price (High to Low)</option>
          <option value={3}>Popular</option>
        </Select>
      </FormControl>
    </div>
  )
}

export default TabRow
