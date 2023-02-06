import './BudgetStatus.css'
import { Avatar, Paper, Typography } from '@mui/material'

const projects = [
  {
    name: 'Insurance App',
    totalBudget: 70_000,
    actualHrs: 1000,
    soldHrs: 100,
  },
  {
    name: 'Neo',
    totalBudget: 70_000,
    actualHrs: 1000,
    soldHrs: 100,
  },
]
const BudgetStatus = () => {
  return (
    <div style={{ padding: 10 }}>
      <Typography component="div" variant="h6">
        Budget Status
      </Typography>
      <section className="budgetStatusContainer">
        {projects.map((data, index) => (
          <Paper elevation={5} sx={{ width: '15vw', p: 1 }}>
            <div className="labelContainer">
              <Typography>{data.name}</Typography>
              <Avatar alt={data.name} />
            </div>
            <Typography>Total Budget: {data.totalBudget}</Typography>
          </Paper>
        ))}
      </section>
    </div>
  )
}

export default BudgetStatus
