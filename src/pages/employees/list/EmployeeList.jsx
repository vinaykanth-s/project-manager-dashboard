import './EmployeeList.css'
import Navbar from '../../../components/Navbar'
import { DataGrid } from '@mui/x-data-grid'
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  onSnapshot,
} from 'firebase/firestore'
import { useState, useEffect } from 'react'
import { db } from '../../../firebase/init'
const columns = [
  { field: 'id', headerName: 'ID', width: 150 },
  {
    field: 'empName',
    headerName: 'Employee',
    width: 200,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.img} alt="avatar" />
          {params.row.empName}
        </div>
      )
    },
  },
  {
    field: 'role',
    headerName: 'Role',
    width: 200,
  },
  {
    field: 'costPerHr',
    headerName: 'Cost Per Hour(₹)', //₹
    width: 150,
  },
  {
    field: 'allottedHrs',
    headerName: 'Assigned Hours',
    width: 150,
  },
  {
    field: 'email',
    headerName: 'Email',
    // type: 'number',
    width: 200,
  },
]

const EmployeeList = () => {
  const [data, setData] = useState([])
  const actionColumn = [
    {
      field: 'action',
      headerName: 'Action',
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            {/* <Link to="/employees/1" style={{ textDecoration: 'none' }}>
              <div className="viewButton">View</div>
            </Link> */}
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
          </div>
        )
      },
    },
  ]
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'employees', id))
      setData(data.filter((item) => item.id !== id))
    } catch (err) {
      console.log(err)
    }
  }

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
    <div>
      <Navbar />
      <div className="topBar">
        <Link to="/employees/new" style={{ textDecoration: 'none' }}>
          <Button variant="outlined" startIcon={<AddIcon />}>
            Add New
          </Button>
        </Link>
      </div>
      <div style={{ height: '80vh', width: '100%', padding: 20 }}>
        <DataGrid
          rows={data}
          columns={columns.concat(actionColumn)}
          pageSize={9}
          rowsPerPageOptions={[9]}
        />
      </div>
    </div>
  )
}

export default EmployeeList
