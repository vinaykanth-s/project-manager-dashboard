import './Budget.css'
import * as Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

const Budget = () => {
  const options = {
    chart: {
      // plotBackgroundColor: null,
      // plotBorderWidth: 0,
      // plotShadow: false,
      height: 230,
      width: 330,
    },
    title: {
      text: 'Browser<br>shares<br>January<br>2022',
      align: 'center',
      verticalAlign: 'middle',
      y: 60,
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
    },
    accessibility: {
      point: {
        valueSuffix: '%',
      },
    },
    plotOptions: {
      pie: {
        dataLabels: {
          enabled: true,
          distance: -50,
          style: {
            fontWeight: 'bold',
            color: 'white',
          },
        },
      },
    },
    series: [
      {
        type: 'pie',
        name: 'Browser share',
        innerSize: '50%',
        data: [
          ['Chrome', 73.86],
          ['Edge', 11.97],
          ['Firefox', 5.52],
          ['Safari', 2.98],
          ['Internet Explorer', 1.9],
          {
            name: 'Other',
            y: 3.77,
            dataLabels: {
              enabled: false,
            },
          },
        ],
      },
    ],
  }
  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  )
}

export default Budget
