import ClipLoader from "react-spinners/ClipLoader";
import React, { useRef, useState } from 'react'
import { Checkbox } from '@mui/material'
import { Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import axios from 'axios';
const StratifiedSampling = () => {
    const[allocationType,setAllocationType] = useState(null)
    const [toggle,setToggle] = useState(false)
    const [buttonClicked,setButtonClicked] = useState(false)
    const [data,setData] = useState()
    const [formatt,setFormatt] = useState('')
    const [result,setResult] = useState(null)
    const [link,setLink] = useState(null)
    const [insertedId,setInsertedId] = useState(0);
    const [populationSize,setPopulationSize]=useState(0)
    const [error,setError] = useState(0)
     const [samplingType,setSamplingType] = useState(null)
    const [replacement,setReplacement] = useState(false)

    const handleSubmit = async() =>
    {
      
      if(populationSize === null || error === null || samplingType === null || allocationType === null||  result === null)
      {
        alert("All fields are required")
      }
      else
      {
        setButtonClicked(true)
      const requestData ={
  insertedId:parseFloat(insertedId),
  populationSize:parseFloat(populationSize),
  result,
  link,
  sampling: "stratified_sampling",
  allocationType,
  samplingType ,
  replacement,
  error:parseFloat(error)
}
console.log(requestData)
const res=await axios({
    method:"post",
    baseURL:"https://100102.pythonanywhere.com/",
    url:"/api/",
    data:requestData
})
if(res.data.success === false)
{
  setButtonClicked(false)
  alert("Something is Wrong")
  
}
else{
console.log(res.data)
if(Array.isArray(res.data.samples.sampleUnits))
{
setData(res.data)
setButtonClicked(false)

}
else
{
  alert(res.data.samples.sampleUnits)
  setButtonClicked(false)
}
}
      }
    
    }
  return (
    <div>
    { !data && 
    <>
      <div className='simpleRandom' style={{display:"grid",gap:"1em",marginTop:"1em"}}>
       <div>
         <label>Input Data:</label>
     <select onChange={e=>setResult(e.target.value)}>
         <option>--select--</option>
         <option value="api">API</option>
         <option value="link">Spreadsheet</option>
     </select>
     </div>
     {result === 'api' ? 
       <div>
        <label>Inserted Id:</label>
        <input  type='text' onChange={e=>setInsertedId(e.target.value)}/>
        </div>
        : result === 'link' &&
        <div>
        <label>Link:</label>
        <input  type='text' onChange={e=>setLink(e.target.value)}/>
        </div>
     }
        <div>
            <div>
     <label>Allocation Type:</label>
     <select onChange={e=>setAllocationType(e.target.value)}>
         <option value="proportional">Proportional Allocation</option>
         <option value="equal">Equal Allocation</option>
     </select>
     </div>
        <label>Population Size:</label>
        <input  type='number' onChange={e=>setPopulationSize(e.target.value)} />
        </div>
        
           <div>
     <label>Allocation Type:</label>
     <select onChange={e=>setSamplingType(e.target.value)}>
         <option value="geometricalApproach">Geometrical Approach</option>
         <option value="mechanicalRandomisation">Mechanical Randomisation</option>
         <option value="randomNumberGeneration">Random Number Generation</option>
     </select>
     </div>
        <div>
        <label>Error:</label>
        <input required type='number' onChange={e=>setError(e.target.value)} />
        </div>
        
        <div>
       
     <label>Replacement:</label>
     <Checkbox onChange={e=>setReplacement(!replacement)}/>
     </div>
       
    </div>
 
<button className='btn btn-primary' disabled={buttonClicked} onClick={handleSubmit} style={{marginTop:"1em"}}>Submit</button>
</>
}
{buttonClicked &&
 
     <div style={{marginLeft:"30%",justifyContent:"center"}}> 
      <ClipLoader
        color="green"
        loading={true}
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      </div>
 
 }
     {data && 
    <div style={{display:"grid",justifyContent:"center",marginTop:"1em",border:"1px solid black",borderRadius:"1em"}}>
    <Table>
          <TableHead>
            <TableRow>
              <TableCell><h4>Samples</h4></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.samples.sampleUnits?.map((m)=><TableCell>{m.map(m=><TableRow>{m.map(m=><>{m},</>)}</TableRow>)}</TableCell>)
            }
          </TableBody>
          </Table>
          </div>
        
} 
    </div>
  )
}

export default StratifiedSampling

