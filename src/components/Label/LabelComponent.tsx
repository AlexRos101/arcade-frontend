import React from "react"
import {
  Box,
  Typography
} from '@material-ui/core'
import { useTheme } from '@material-ui/core/styles'

interface LabelProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string,
  labelClass?: string
}

const LabelComponent: React.FC<LabelProps>= ({ label, labelClass, children, ...props }) => {
  const theme = useTheme()

  return (
    <Box {...props} style={{ margin: `${theme.spacing(1, 0)}` }}>
      <div style={{ marginBottom: '10px' }}>
        <Typography variant="body1" className={labelClass} component="div">
          {label}
        </Typography>
      </div>
      {children}
    </Box>
  )
}

export default LabelComponent