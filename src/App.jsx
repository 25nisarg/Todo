import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { v4 as uuidv4 } from 'uuid';


function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    console.log(todoString)
    if(todoString){
      let todos=JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])
  
  const saveToLs=(todos) => {
    console.log(todos)
    localStorage.setItem("todos",JSON.stringify(todos))
  }
  
  const toggleFinished =(e) => {
    setshowFinished(!showFinished)
  }
  

  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item=>{
      return item.id != id;
    });
    setTodos(newTodos)
    saveToLs(newTodos)
   }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }
  
  const handleEdit = (e, id) => { 
    let t=todos.filter(i=>i.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item=>{
      return item.id != id;
    });
    setTodos(newTodos)
    saveToLs(newTodos)
  }

  const handleAdd = () => {
      const newTodo=[...todos, { id: uuidv4(), todo, isCompleted: false }]
      setTodos(newTodo)
      setTodo("")
      console.log(newTodo)
      saveToLs(newTodo)
  }
  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos, todos)
    saveToLs(newTodos)
  }


  return (
    <>
      <Navbar />
      <div className="container mx-auto my-5 rounded-2xl p-5 bg-slate-200 min-h-[80vh]">
        <div className="addTodo  my-5 ">
          <h2 className='text-lg sm:text-xl text-gray-900 font-medium title-font mb-2'>Add a Todo</h2>
          <input type="text" onChange={handleChange} value={todo} className='w-full md:w-160 bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out' />
          <button onClick={handleAdd} disabled={todo.length<=3} className='text-white bg-slate-500 border-0 py-2 px-6 focus:outline-none hover:bg-slate-600 rounded text-lg sm:m-2 md:mx-6'>Save</button>
        </div>
        <input type="checkbox" onChange={toggleFinished} checked={showFinished} name="" id="" /> Show Finished
        <h2 className='text-lg sm:text-xl text-gray-900 font-medium title-font mb-2'>Your Todos</h2>
        <div className="todos">
          {todos.length===0 && <div className='m-5'>No Todos to Display</div>}
          {todos.map(item => {
            return(showFinished || !item.isCompleted) && (<div key={item.id} className="todo flex md:w-1/2 my-2 justify-between">
              <input onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} name={item.id} id='' />
              <div className={item.isCompleted ? "line-through" : ""}>
                {item.todo}
              </div>
              <div className="buttons">
                <button onClick={(e)=>{handleEdit(e, item.id)}} className='text-white bg-slate-500 border-0 py-2 px-6 focus:outline-none hover:bg-slate-600 rounded text-lg mx-1'><FaEdit /></button>
                <button onClick={(e) => { handleDelete(e, item.id) }} className='text-white bg-slate-500 border-0 py-2 px-6 focus:outline-none hover:bg-slate-600 rounded text-lg mx-1'><MdDeleteForever /></button>
              </div>
            </div>)
          })}
        </div>
      </div>
    </>
  )
}

export default App
