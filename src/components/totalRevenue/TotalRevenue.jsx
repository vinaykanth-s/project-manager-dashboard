import './TotalRevenue.css'
import * as Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

const TotalRevenue = (props) => {
  const { chartOptions } = props
  const options = {
    chart: {
      height: 400,
    },
    title: {
      text: 'Total Revenue',
      align: 'left',
    },

    yAxis: {
      title: {
        text: 'Cost',
      },
    },

    xAxis: {
      accessibility: {
        rangeDescription: 'Range: 2010 to 2020',
      },
    },
    credits: { enabled: false },

    legend: {
      enabled: false,
    },

    plotOptions: {
      series: {
        label: {
          connectorAllowed: false,
        },
        pointStart: 2010,
      },
    },

    series: [
      {
        name: 'Installation & Developers',
        data: [
          43934, 48656, 65165, 81827, 112143, 142383, 171533, 165174, 155157,
          161454, 154610,
        ],
      },
    ],

    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500,
          },
          chartOptions: {
            legend: {
              layout: 'horizontal',
              align: 'center',
              verticalAlign: 'bottom',
            },
          },
        },
      ],
    },
  }
  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </div>
  )
}

export default TotalRevenue
