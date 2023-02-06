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
import Budget from '../../components/budgetChart/Budget'
import { Typography } from '@mui/material'
import BudgetStatus from '../../components/budgetStatus/BudgetStatus'
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

      {/* <BudgetStatus /> */}
    </div>
  )
}

export default Home
