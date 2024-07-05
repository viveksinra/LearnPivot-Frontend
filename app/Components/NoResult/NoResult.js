import React from 'react'
import {Typography} from '@mui/material/';


function NoResult({label}) {
  return (
    <div className='center' style={{flexDirection:"column"}}>
        <img src="https://res.cloudinary.com/qualifier/image/upload/v1585205058/no_results_found_obljgz.png" alt="No Result"/>
        <Typography variant="subtitle1" color="slategray">{label}</Typography>
        
        </div>
  )
}

export default NoResult