import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { useDispatch } from 'react-redux';
import { updatetaskserver } from '../slices/taskslice';

const Modal = ({ isOpen, onClose, children }) => {

  const dispatch = useDispatch()
  const {selectedTaskList}= useSelector((state) => state.tasks)

  const [title,setTitle] = useState('')
    const [description,setDescription] = useState('')
    const [id,setid] = useState(selectedTaskList._id  )

    const updatetasks = () => {
      console.log("updated");
      dispatch(updatetaskserver({_id:id,title,description}))
      onClose
    }
    useEffect(() => {
      if(Object.keys(selectedTaskList).length !== 0){
        setTitle(selectedTaskList.title)
        setDescription(selectedTaskList.description)
        setid(selectedTaskList._id)
    }
    },[selectedTaskList])


  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center ${
        isOpen ? 'visible' : 'hidden'
      }`}
    >
      <div className="w-full max-w-xs">
  <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 h-full bg-gradient-to-r from-purple-500 to-pink-500">
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" >
        TITLE
      </label>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="TITLE" 
      value={title} onChange={(e) => setTitle(e.target.value)}></input>
    </div>
    <div className="mb-6">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        DESCRIPTION
      </label>
      <input className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="text" placeholder="DESCRIPTION"
      value={description} onChange={(e) => setDescription(e.target.value)}></input>
    </div>
    <div className="flex items-center justify-between">
      <button className="transform h-50 bg-blue-400 w-20 transition duration-500 hover:scale-125 hover:bg-blue-600 flex justify-center items-center rounded 2xl" type="button" onClick ={() => updatetasks()}>
        SUBMIT
      </button>
      <button className="transform h-50 bg-blue-400 w-20 transition duration-500 hover:scale-125 hover:bg-blue-600 flex justify-center items-center rounded 2xl" type="button" onClick={onClose}>
        close
      </button>
      
    </div>
  </form>
  </div>
      
    </div>
  );
};

export default Modal;
