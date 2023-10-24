import React, { useRef, useState } from 'react'
import ClipLoader from "react-spinners/ClipLoader";
import { Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import axios from 'axios';
const SimpleRandomSampling = () => {
   const [buttonClicked,setButtonClicked] = useState(false)
    const [data,setData] = useState()
    const [formatt,setFormatt] = useState('')
        const [link,setLink] = useState(null)
    const [error,setError] = useState(null)
     const [result,setResult] = useState(null)
    const [insertedId,setInsertedId] = useState(null);
    const [populationSize,setPopulationSize]=useState(null)
    const handleSubmit = async() =>
    {
       if(error === null || populationSize === null || result === null)
      {
        alert("All fields are required")
      }
      else{
        setButtonClicked(true)
      const requestData ={
  insertedId,
  link,
  populationSize,
  result,
  sampling: "simple_random_sampling",
  error,
  sampling_method: "geometricalApproach"
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

console.log(res.data)
          setData(res.data)
// if(res.data.success=== 'false')
// {
//   alert("Somethin went Wrong")
// }
// else
// setData(res.data)

      }
    }
  return (
    <div>
     {
      !data && <>
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
         
          <div>
        <label>Error:</label>
     <input type='number' onChange={e=>setError(e.target.value)} />
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
    <Table className="styled-table">
          <TableHead>
            <TableRow>
              <TableCell><h4>Samples</h4></TableCell>
              
        
            </TableRow>
          </TableHead>
          <TableBody>
          
            {data.samples?.map((m)=><TableCell>
            {m.map(m=><TableRow>{m}</TableRow>)}</TableCell>)}
          </TableBody>
          </Table>
        </div>
}    </div>
  )
}

export default SimpleRandomSampling
