import React, { useState,useEffect } from 'react'
import { dashboardService } from '../../services/index';
import dynamic from 'next/dynamic';
const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false });

function ProspectChart() {
  const [series, setSeries] = useState([14, 23, 21, 17, 15, 10, 12, 17, 21])
  const [options, setOptions] = useState({
    chart: {
      type: 'polarArea',
    },
    labels: ['Rose A', 'Rose B', 'Rose C', 'Rose D', 'Rose E','Rose F','Rose G','Rose h','Rose I'],
    stroke: {
      colors: ['#fff']
    },
    fill: {
      opacity: 0.8
    },
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: 'bottom'
        }
      }
    }]
  })
  useEffect(() => {
    // Getting all Prospect Data
    async function getProspectChart(){
      let res = await dashboardService.getData(`api/v1/dashboard/getDashboard/prospectStage`);
      if(res.variant === "success"){
        setOptions(res?.data?.options)
        setSeries(res?.data?.series)
      }else {console.log(res)};    
     }
     getProspectChart()
   }, [])
  return (
    <div id="chart">
    <ApexCharts options={options} series={series} height={350} type="polarArea" />
    </div>
  )
}

export default ProspectChart

