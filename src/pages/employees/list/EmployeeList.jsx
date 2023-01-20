import './EmployeeList.css'
import Navbar from '../../../components/Navbar'
import { DataGrid } from '@mui/x-data-grid'
import { Link } from 'react-router-dom'

const columns = [
  { field: 'id', headerName: 'ID', width: 150 },
  {
    field: 'fullName',
    headerName: 'Full name',
    // description: 'This column has a value getter and is not sortable.',
    // sortable: false,
    width: 250,
    // valueGetter: (params) =>
    //   `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
  {
    field: 'role',
    headerName: 'Role',
    // type: 'number',
    width: 250,
  },
  {
    field: 'costPerHr',
    headerName: 'Cost Per Hour',
    width: 200,
  },
  {
    field: 'assignedHrs',
    headerName: 'Assigned Hours',
    width: 200,
  },
]

const actionColumn = [
  {
    field: 'action',
    headerName: 'Action',
    width: 200,
    renderCell: (params) => {
      return (
        <div className="cellAction">
          <Link to="/employees/1" style={{ textDecoration: 'none' }}>
            <div className="viewButton">View</div>
          </Link>
          <div
            className="deleteButton"
            // onClick={() => handleDelete(params.row.id)}
          >
            Delete
          </div>
        </div>
      )
    },
  },
]
const rows = [
  {
    id: 1,
    fullName: 'Snow Jon',
    age: 35,
    role: 'Software Developer',
  },
  {
    id: 2,
    fullName: 'Lannister Cersei',
    age: 42,
    role: 'Software Developer',
  },
  {
    id: 3,
    fullName: 'Lannister Jaime',
    age: 45,
    role: 'Software Developer',
  },
  {
    id: 4,
    fullName: 'Stark Arya',
    age: 16,
    role: 'Software Developer',
  },
  {
    id: 5,
    fullName: 'Targaryen Daenerys',
    age: null,
    role: 'Software Developer',
  },
  {
    id: 6,
    fullName: 'Melisandre',
    age: 150,
    role: 'Software Developer',
  },
  {
    id: 7,
    fullName: 'Clifford Ferrara',
    age: 44,
    role: 'Software Developer',
  },
  {
    id: 8,
    fullName: 'Frances Rossini',
    age: 36,
    role: 'Software Developer',
  },
  {
    id: 9,
    fullName: 'Roxie Harvey',
    age: 65,
    role: 'Software Developer',
  },
]

const EmployeeList = () => {
  return (
    <div>
      <Navbar />
      <div className="topBar">Back</div>
      <div style={{ height: '80vh', width: '100%', padding: 20 }}>
        <DataGrid
          rows={rows}
          columns={columns.concat(actionColumn)}
          pageSize={5}
          rowsPerPageOptions={[5]}
          // checkboxSelection
        />
      </div>
    </div>
  )
}

export default EmployeeList
