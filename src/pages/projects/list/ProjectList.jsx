import './ProjectList.css'
import { useState, useEffect } from 'react'
import Navbar from '../../../components/Navbar'
import { DataGrid } from '@mui/x-data-grid'
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { onSnapshot, collection, deleteDoc, doc } from 'firebase/firestore'
import { db } from '../../../firebase/init'

const columns = [
  { field: 'id', headerName: 'ID', width: 150 },
  {
    field: 'projectName',
    headerName: 'Project Name',
    width: 200,
  },
  {
    field: 'budget',
    headerName: 'Budget(₹)',
    width: 150,
  },
  {
    field: 'allottedHrs',
    headerName: 'Allotted Hours',
    width: 150,
  },
  {
    field: 'workedHrs',
    headerName: 'Worked Hours',
    width: 150,
  },
  {
    field: 'deadline',
    headerName: 'Project Deadline',
    width: 200,
  },
]

const ProjectList = () => {
  const [data, setData] = useState([])
  // const params = 

  const actionColumn = [
    {
      field: 'action',
      headerName: 'Action',
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to="/projects/1" style={{ textDecoration: 'none' }}>
              <div className="viewButton">Edit</div>
            </Link>
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
      await deleteDoc(doc(db, 'projects', id))
      setData(data.filter((item) => item.id !== id))
    } catch (err) {
      console.log(err)
    }
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
        <Link to="/projects/new" style={{ textDecoration: 'none' }}>
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
          sx={{
            boxShadow: 2,
            border: 2,
            '& .MuiDataGrid-cell:hover': {
              color: 'primary.main',
            },
          }}
        />
      </div>
    </div>
  )
}

export default ProjectList
