import React, { useState } from 'react'
import Modal from './update';
import { addtasktoserver } from '../slices/taskslice'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setselectedtask,removetask, deltasktoserver } from '../slices/taskslice';
import { getTasksFromServer } from '../slices/taskslice';
import { useEffect } from 'react';

const TaskAdd = () => {

    const dispatch = useDispatch()
    const [title,setTitle] = useState('')
    const [description,setDescription] = useState('')
    const [showModal,setShowModal] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const{tasksList} = useSelector((state) => state.tasks)
    const addtask = () => {
        console.log({title,description})
        dispatch(addtasktoserver({title,description}))
        setTitle('')
        setDescription('')
    }
    const deletetask = (task) => {
      console.log("delete task");
      dispatch(deltasktoserver(task))
      .unwrap()
      .then(() => {
        dispatch(removetask(task))
      })
    };
    const closeModal = () => {
      setIsModalOpen(false);
    };
    const updatetask = (task) => {
        console.log("update task") 
        setIsModalOpen(true)
        dispatch(setselectedtask(task))
    }

    useEffect(() => {
      dispatch(getTasksFromServer())
    },[dispatch])

  return (
    <>
    <div className='bg-slate-200'>
    <div >
    <div className='align'>
    <div class="grid grid-cols-4 gap-35 place-items-end h-0 " >
    <div className="w-full max-w-xs">
  <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 h-full bg-gradient-to-r from-purple-500 to-pink-500 ">
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2 " >
      <span class="text-blue-0 dark:text-black-500:break-normal ">TITLE</span>
      </label>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline rounded-2xl" id="username" type="text" placeholder="TITLE" 
      value={title} onChange={(e) => setTitle(e.target.value)}></input>
    </div>
    <div className="mb-6">
      <label className="block text-gray-700 text-sm font-bold mb-2">
      <span class="text-blue-0 dark:text-black-500:break-normal">DESCRIPTION</span>
      </label>
      <input className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline rounded-2xl" id="password" type="text" placeholder="DESCRIPTION"
      value={description} onChange={(e) => setDescription(e.target.value)}></input>
    </div>
    <div className="flex items-center justify-between">
      <button className="transform h-10 bg-blue-400 w-40 transition duration-500 hover:scale-125 hover:bg-blue-600 flex justify-center items-center rounded 2xl" type="button" onClick={() => addtask()}>
        Add Task
      </button>
    </div>
  </form>
  <button
  className="bg-green-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 animate-bounce"
  type="button"
  onClick={() => setShowModal(true)}
>
  SHOW TASK 
</button>
<button  className="bg-pink-500 text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 animate-bounce" 
type="button" onClick={() => setShowModal(false)}>CLOSE LIST</button>
</div>
  </div>
  </div>
  </div>
  </div>
  <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h2 classNameName="text-lg font-semibold mb-2">Modal Content</h2>
        <p>This is the content of the modal.</p>
      </Modal>
  
{showModal ? (
        <>
        <div className='align1'>
          <div class="flex justify-center items-center " >
    <table className='table-auto'>
  <thead className='bg-blue-500  '>
    <tr>
      <th className="w-1/3 px-10 py-2">S.NO</th>
      <th className="w-1/3 px-10 py-2">Title</th>
      <th className="w-1/3 px-10 py-2">Description</th>
      <th className="w-1/3 px-10 py-2">EDIT</th>
      <th className="w-1/3 px-10 py-2">DELETE</th>
    </tr>
  </thead>
  <tbody>
  {
      tasksList && tasksList.map((task,index) => {
        return(
          <tr className="bg-gray-100 p-4 md:w-1/4 sm:w-1/2 w-full" key={task._id}>
          <td className="border px-2 py-1">{index + 1}</td>
          <td className="border px-4 py-1 border-2  cursor-pointer
                                py-6 rounded-lg transform
                                transition duration-500 hover:scale-110">{task.title}</td>
          <td className="border px-2 py-1">{task.description}</td>
          <td className="border px-4 py-1 break-keep">
          <button className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={() => updatetask(task)}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
</svg>

          </button>
      </td>
      <td><button className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={() => deletetask(task)}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
</svg></button></td>
    </tr>
    
        )
      })
    }
    
  </tbody>
</table>

</div>
</div>

        </>
      ) : null}
</>
  )
}

export default TaskAdd