
import React from 'react'
import Balance from './Balance'
// import { auth, getUser } from '@adonisjs/auth'
import OperationList from './OperationList'

// import axios from "axios";

const Dashboard =  () => {


  // const [userOperations, setUserOperations] = useState()
//----------------------------------------------------------------------
//traigo el token

// const getUser= async ()=>{
//   let myToken = JSON.parse(localStorage.getItem("auth_token"))
      
//   let headers= {
//       "Authorization": `Bearer ${myToken.token}` 
//     }  
//   let json = await axios.get(`http://localhost:3333/operaciones/1`,{headers})
//   const operations = json.data
//     setUserOperations(operations)

//   console.log("hola",operations[0].fecha.slice(0,10))
//   return operations
//   }

  
//----------------------------------------------------------------------
// useEfect
// useEffect(() => {
//   getUser()
// },[])
//----------------------------------------------------------------------

  
  return (
    <div>
    <div>    
    <Balance/>
    </div>
   <div>
      <OperationList/>
    </div> 
    </div>
  )
 }

export default Dashboard