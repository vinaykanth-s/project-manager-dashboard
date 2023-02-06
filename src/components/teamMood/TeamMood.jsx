import './TeamMood.css'
import { Avatar, Paper, Typography } from '@mui/material'
import { useState, useEffect } from 'react'
import { collection, onSnapshot } from 'firebase/firestore'
import { db } from '../../firebase/init'

const TeamMood = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchRealTimeData = onSnapshot(
      collection(db, 'employees'),
      (snapShot) => {
        let list = []
        snapShot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() })
        })
        setData(list)
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
    <Paper className="teamMoodContainer" elevation={5}>
      {data?.map((emp) => (
        <div className="empCard">
          <Avatar alt={emp.empName} src={emp.img} />
          <div>
            <Typography>{emp.empName}</Typography>
            <Typography className="role">{emp.role}</Typography>
          </div>
        </div>
      ))}
    </Paper>
  )
}

export default TeamMood
