import axios from 'axios'
import React from 'react'

function DisplayAllUser() {
    useEffect(() => {
        getAllUsers()
    }, [])

    const getAllUsers= ()=>{
        axios.get("").then((res)=>{

        }).catch((err)=>{
            console.log(err)
        })
    }   

    //react elmet or gas bee
    
  return (
    <>

    </>
  )
}

export default DisplayAllUser
