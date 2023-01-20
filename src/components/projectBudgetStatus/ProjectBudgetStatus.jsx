import { Avatar, Paper, Typography } from '@mui/material'
import './ProjectBudgetStatus.css'

const ProjectBudgetStatus = ({ data }) => {
  return (
    <Paper elevation={5}>
      <div className="labelContainer">
        <Typography>{data.name}</Typography>
        <Avatar alt={data.name} />
      </div>
      <Typography>Total Budget: {data.totalBudget}</Typography>
    </Paper>
  )
}

export default ProjectBudgetStatus
