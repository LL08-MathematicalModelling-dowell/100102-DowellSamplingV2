import { Checkbox } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import StratifiedSampling from '../components/StratifiedSampling';
import ClusterSampling from '../components/ClusterSampling';
import PurposiveSampling from '../components/PurposiveSampling';
import SimpleRandomSampling from '../components/SimpleRandomSampling';
import QuotaSampling from '../components/QuotaSampling';
import  PPSSampling  from '../components/PPSSampling';
import SystematicSampling from '../components/SystematicSampling';
import SnowballSampling from '../components/SnowballSampling';
const Main = () => {
    const[sampling,setSampling] = useState('');
   
 
  return (
    <div style={{display:"grid",justifyContent:"center",marginTop:"5em",background:'#B8B8B8',padding:"1em",borderRadius:"1em"}}>
    <div>
      <h1>Sampling Inputs</h1>
      <p>Sampling Type:</p>
    <select onChange={e=>setSampling(e.target.value)}  className="form-control form-control-lg"
      style={{ width: '100%', height: '50px', fontSize: '18px' }}>
        <option>Select Sampling Type</option>
        <option>Stratified Sampling</option>
        <option>Systematic Sampling</option>
        <option>Simple Random Sampling</option>
        <option>Cluster Sampling</option>
        <option>Purposive Sampling</option>
        <option>Quota Sampling</option>
        <option>PPS Sampling</option>
        <option>Snowball Sampling</option>
        
    </select>
    {sampling === "Stratified Sampling" ?
   <StratifiedSampling/>
    :
   sampling === "Systematic Sampling" ?
   <SystematicSampling/>
    :
   sampling === "Simple Random Sampling" ?
    <SimpleRandomSampling/>
:
sampling === "Cluster Sampling" ?
    <ClusterSampling/>
:
sampling === "Quota Sampling" ?
  <QuotaSampling/>
  :
sampling === "Snowball Sampling" ?
  <SnowballSampling/>
  :
sampling === "PPS Sampling" ?
  <PPSSampling/>

:
sampling === "Purposive Sampling" &&
  <PurposiveSampling/>


  }

  </div>
  </div>
  )
}

export default Main
