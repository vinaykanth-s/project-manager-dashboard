import './TeamMood.css'
import { Avatar, Paper, Typography } from '@mui/material'
const empList = [
  { name: 'Andrea', role: 'Software Developer' },
  { name: 'Alvaro', role: 'Software Developer' },
  { name: 'Julan', role: 'Software Developer' },
  { name: 'Jose', role: 'Software Developer' },
  { name: 'Rose', role: 'Software Developer' },
]
const TeamMood = () => {
  return (
    <Paper className="teamMoodContainer" elevation={5}>
      {empList.map((emp) => (
        <div className="empCard">
          <Avatar alt={emp.name} />
          <div>
            <Typography>{emp.name}</Typography>
            <Typography>{emp.role}</Typography>
          </div>
        </div>
      ))}
    </Paper>
  )
}

export default TeamMood
