import ClipLoader from "react-spinners/ClipLoader";
import React, { useRef, useState } from 'react'
import { Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import axios from 'axios';
const SystematicSampling = () => {
    const [toggle,setToggle] = useState(false)
    const [buttonClicked,setButtonClicked] = useState(false)
    const [data,setData] = useState()
    const [formatt,setFormatt] = useState('')
    const [result,setResult] = useState(null)
    const [insertedId,setInsertedId] = useState(null);
    const [link,setLink] = useState(null)
    const [populationSize,setPopulationSize]=useState(null)
    const handleSubmit = async() =>
    {
      
      if(populationSize === null || result === null)
      {
        alert("All fields are required")
      }
      else{
        setButtonClicked(true)
      const requestData = {
  insertedId,
  link,
  populationSize,
  result: "api",
  sampling: "systematic_sampling"
}

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
console.log(res.data.success)
setData(res.data)
setButtonClicked(false)
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
        <label>Population Size:</label>
        <input required type='number' onChange={e=>setPopulationSize(e.target.value)} />
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
            {data.samples?.map((m)=><TableRow>{m}</TableRow>)}
          </TableBody>
          </Table>
          </div>
        
}
    </div>
  )
}

export default SystematicSampling

