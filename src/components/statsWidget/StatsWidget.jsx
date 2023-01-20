import './statsWidget.css'
import { Paper } from '@mui/material'

const StatsWidget = ({ data }) => {
  return (
    <Paper
      elevation={5}
      className="widget"
      style={{ background: data.type === 'Delayed' && '#fd7f8e' }}
    >
      <data.icon
        sx={{
          fontSize: '2em',
          color: data.type === 'Delayed' ? '#f00' : '#00DCCD',
        }}
      />
      <div
        className="count"
        style={{ color: data.type === 'Delayed' && '#fff' }}
      >
        {data.count}
      </div>
      <div
        className="stat_label"
        style={{ color: data.type === 'Delayed' && '#fff' }}
      >
        {data.type}
      </div>
    </Paper>
  )
}

export default StatsWidget
