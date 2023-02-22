import './Home.css'
import { useState, useEffect } from 'react'
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
import TotalRevenue from '../../components/totalRevenue/TotalRevenue'
import Budget from '../../components/budgetChart/Budget'
import { db } from '../../firebase/init'
import { onSnapshot, collection, deleteDoc, doc } from 'firebase/firestore'

// import { Typography } from '@mui/material'
// import BudgetStatus from '../../components/budgetStatus/BudgetStatus'
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
  const [data, setData] = useState([])
  const [chartOptions, setChartOptions] = useState('')

  const constructProjectsChart = (chartData) => {
    console.log({ chartData })
    const projects = chartData?.map((ele) => ele.projectName)
    const allottedHrs = chartData?.map((ele) => +ele.allottedHrs)
    const workedHrs = chartData?.map((ele) => +ele.workedHrs)
    let options = {
      chart: {
        type: 'column',
      },
      title: {
        text: 'Projects Time Allotment Overview',
      },
      xAxis: {
        categories: projects,
        crosshair: true,
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Hours ( Hrs )',
        },
      },
      tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat:
          '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
          '<td style="padding:0"><b>{point.y:.1f} Hrs</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true,
      },
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0,
        },
      },
      series: [
        {
          name: 'Allotted Hours',
          data: allottedHrs,
        },
        {
          name: 'Worked Hours',
          data: workedHrs,
        },
      ],
    }
    setChartOptions(options)
  }
  useEffect(() => {
    const fetchRealTimeData = onSnapshot(
      collection(db, 'projects'),
      (snapShot) => {
        let list = []
        snapShot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() })
        })
        setData(list)
        constructProjectsChart(list)
      },
      (error) => {
        console.log(error)
      }
    )

    return () => {
      fetchRealTimeData()
    }
  }, [])
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
            <TotalRevenue chartOptions={chartOptions} />

            {/* <Budget /> */}
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
