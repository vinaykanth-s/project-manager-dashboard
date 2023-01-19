import './statsWidget.css'
import WindowIcon from '@mui/icons-material/Window'

const StatsWidget = () => {
  return (
    <div className="widget">
      <WindowIcon sx={{ fontSize: '2em', color: '#00DCCD' }} />
      <div className="count">5</div>
      <div className="stat_label">Total Projects</div>
    </div>
  )
}

export default StatsWidget
