import './Home.css'
import Navbar from '../../components/Navbar'
import StatsWidget from '../../components/statsWidget/StatsWidget'

const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="mainContainer">
        <section className="statsContainer">
          <div className="widgetContainer">
            <StatsWidget />
            <StatsWidget />
            <StatsWidget />
            <StatsWidget />
            <StatsWidget />
          </div>
          <div className="chartsContainer"></div>
        </section>
        <section className="empListContainer"></section>
      </div>
    </div>
  )
}

export default Home
