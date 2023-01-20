import './Home.css'
import Navbar from '../../components/Navbar'
import StatsWidget from '../../components/statsWidget/StatsWidget'
import {
  People,
  WarningAmber,
  Autorenew,
  Window,
  TaskAlt,
} from '@mui/icons-material'
import TeamMood from '../../components/teamMood/TeamMood'
import TotalRevenue from '../../components/TotalRevenue/TotalRevenue'
import Budget from '../../components/budget/Budget'
import { Typography } from '@mui/material'
import ProjectBudgetStatus from '../../components/projectBudgetStatus/ProjectBudgetStatus'
const widgets = [
  {
    icon: Window,
    count: 5,
    type: 'Total Projects',
  },
  {
    icon: TaskAlt,
    count: 1,
    type: 'Completed',
  },
  {
    icon: Autorenew,
    count: 3,
    type: 'Ongoing',
  },
  {
    icon: WarningAmber,
    count: 1,
    type: 'Delayed',
  },
  {
    icon: People,
    count: 5,
    type: 'Employees',
  },
]

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
const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="mainContainer">
        <section className="statsContainer">
          <div className="widgetContainer">
            {widgets.map((item, index) => (
              <StatsWidget data={item} key={index} />
            ))}
          </div>
          <div className="chartsContainer">
            <TotalRevenue />
            <Budget />
          </div>
        </section>
        <section className="empListContainer">
          <TeamMood />
        </section>
      </div>
      <div>
        <Typography component="div" variant="h6">
          Budget Status
        </Typography>
        <div className="budgetStatusContainer">
          {projects.map((project, index) => (
            <ProjectBudgetStatus data={project} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home
