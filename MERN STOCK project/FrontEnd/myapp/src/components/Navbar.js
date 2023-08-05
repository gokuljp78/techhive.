import React, { useState } from 'react'
import { useSelector, UseSelector } from 'react-redux/es/hooks/useSelector'

const Navbar = () => {
  

  const{tasksList} = useSelector((state) => state.tasks)
  const {title,setTitle} = useState('')
  const addTitle = (e) => {
    e.preventDefault()
    console.log({title})
}
  return (
    <>
    <div class="flex justify-center items-center">
     <h1 class="mb-2 mt-0 text-5xl font-medium leading-tight text-primary">Project ManageMent</h1>
     </div>
     <div class="flex justify-center items-center">
     <h1 class="mb-4 text-4xl leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-black">Task Count - <span class="text-blue-600 dark:text-blue-500:break-normal">{tasksList.length}</span></h1>
     </div>
    </>
  )
}
export default Navbar