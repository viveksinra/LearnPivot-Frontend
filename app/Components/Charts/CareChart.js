import React,{useState,useEffect} from 'react'
import { dashboardService } from '../../services/index';
import dynamic from 'next/dynamic';
const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false });

function CareChart() {
  const [series, setSeries] = useState([{
    name: 'Care Given',
    data: [44, 55, 57, 56, 61, 58, 63]
  }, {
    name: 'PRN Care',
    data: [76, 85, 101, 98, 87, 105, 91]
  }, {
    name: 'Care Reject',
    data: [35, 41, 36, 26, 45, 48, 52,]
  }]);

  const [options, setOptions] = useState({
    chart: {
      type: 'bar',
      height: 350
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        endingShape: 'rounded'
      },
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent']
    },
    xaxis: {
      categories: ['26-Aug', '25-Aug', '24-Aug', '23-Aug', '22-Aug', '21-Aug', '20-Aug'],
    },
    yaxis: {
      title: {
        text: '$ (thousands)'
      }
    },
    fill: {
      opacity: 1
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return "$ " + val + " thousands"
        }
      }
    }
  })
  useEffect(() => {
    // Getting all Care Chart Data
    async function getCareChart(){
      let res = await dashboardService.getData(`api/v1/dashboard/getDashboard/careCount`);
      if(res.variant === "success"){
        setOptions(res?.data?.options)
        setSeries(res?.data?.series)
      }else {console.log(res)};    
     }
     getCareChart()
   }, [])
  return (
    <div id="chart">
    <ApexCharts options={options} series={series} type="bar" height={350} />
    </div> 
  )
}

export default CareChart




// export default class CareChart extends React.Component {
//     constructor(props) {
//       super(props);

//       this.state = {
      
//         series: [{
//           name: 'Care Given',
//           data: [44, 55, 57, 56, 61, 58, 63]
//         }, {
//           name: 'PRN Care',
//           data: [76, 85, 101, 98, 87, 105, 91]
//         }, {
//           name: 'Care Reject',
//           data: [35, 41, 36, 26, 45, 48, 52,]
//         }],
//         options: {
//           chart: {
//             type: 'bar',
//             height: 350
//           },
//           plotOptions: {
//             bar: {
//               horizontal: false,
//               columnWidth: '55%',
//               endingShape: 'rounded'
//             },
//           },
//           dataLabels: {
//             enabled: false
//           },
//           stroke: {
//             show: true,
//             width: 2,
//             colors: ['transparent']
//           },
//           xaxis: {
//             categories: ['26-Aug', '25-Aug', '24-Aug', '23-Aug', '22-Aug', '21-Aug', '20-Aug'],
//           },
//           yaxis: {
//             title: {
//               text: '$ (thousands)'
//             }
//           },
//           fill: {
//             opacity: 1
//           },
//           tooltip: {
//             y: {
//               formatter: function (val) {
//                 return "$ " + val + " thousands"
//               }
//             }
//           }
//         },
      
      
//       };
//     }

  

//     render() {
//       return (
        

//   <div id="chart">
// <ReactApexChart options={this.state.options} series={this.state.series} type="bar" height={350} />
// </div>  );
//         }
//       }