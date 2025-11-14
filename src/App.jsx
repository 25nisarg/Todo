import { useState } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';


function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])

  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item=>{
      return item.id != id;
    });
    setTodos(newTodos)
   }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }
  
  const handleEdit = () => { 
    
  }

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
    console.log(todos)
  }
  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos, todos)
  }


  return (
    <>
      <Navbar />
      <div className="container mx-auto my-5 rounded-2xl p-5 bg-slate-200 min-h-[80vh]">
        <div className="addTodo my-5">
          <h2 className='test-lg font-bold'>Add a Todo</h2>
          <input type="text" onChange={handleChange} value={todo} className='w-80' />
          <button onClick={handleAdd} className='bg-slate-700 font-bold hover:bg-slate-950 text-white p-4 py-1 rounded-md mx-6'>Add</button>
        </div>
        <h2 className='text-lg font-bold'>Your Todos</h2>
        <div className="todos">
          {todos.length===0 && <div className='m-5'>No Todos to Display</div>}
          {todos.map(item => {
            return (<div key={item.id} className="todo flex w-1/4 my-2 justify-between">
              <input onChange={handleCheckbox} type="checkbox" value={item.isCompleted} name={item.id} id='' />
              <div className={item.isCompleted ? "line-through" : ""}>
                {item.todo}
              </div>
              <div className="buttons">
                <button onClick={handleEdit} className='bg-slate-700 font-bold hover:bg-slate-950 text-white p-4 py-1 rounded-md mx-1'>Edit</button>
                <button onClick={(e) => { handleDelete(e, item.id) }} className='bg-slate-700 font-bold hover:bg-slate-950 text-white p-4 py-1 rounded-md mx-1'>Delete</button>
              </div>
            </div>)
          })}
        </div>
      </div>
    </>
  )
}

export default App
