import './global.css'
import { useState } from 'react';
import { Check, Plus, Trash, X } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

export interface ITask {
  id: string;
  text: string;
  isCompleted: boolean;
}

export function App() {
  const [tasks, setTasks] = useState<ITask[]>([]); // lista de task
  const [newTask, setNewTask] = useState("") //input para a nova task

  const tasksQuantity = tasks.filter((task) => !task.isCompleted).length
  const completeTasks = tasks.filter((task) => task.isCompleted).length

  const tasksToDo = tasks.filter((task) => !task.isCompleted)
  const tasksDone = tasks.filter((tasks) => tasks.isCompleted)

  function setInputValue(event: React.ChangeEvent<HTMLInputElement>) {
    
    setNewTask(event.target.value)
  }

  function createNewTask() {
    const task = {
      id: uuidv4(),
      text: newTask,
      isCompleted: false,
    }
    event?.preventDefault()
    setTasks([...tasks, task]) //adiciona a nova task ao estado
    setNewTask('') //resetar o input
   }

   function completeTask(id: string) {
    setTasks(tasks.map(task =>
      task.id === id ? {...task, isCompleted: !task.isCompleted} : task
    ))
   }

   function deleteTask(id: string) {
    setTasks(tasks.filter(task => task.id !== id))
   }

  return (
    <div className='bg-emerald-950 h-screen w-full text-white flex justify-center items-center'>
      <div className='bg-emerald-900 rounded-lg w-auto h-auto flex flex-col p-10'>
        <form className='flex gap-2 justify-center items-center mb-14'>
          <input onChange={setInputValue} value={newTask} type="text" placeholder="Add a new task..." className='bg-transparent border-solid border-2 border-emerald-500 rounded-lg p-1 outline-none text-sm w-96 h-10' />
          <button onClick={createNewTask} className='bg-emerald-500 flex justify-center items-center p-0.5 h-10 w-10 rounded-lg text-lg hover:bg-emerald-300'><Plus /></button>
        </form>  

          <div className='flex flex-col gap-4 mb-3'>
            <p>Tasks to do - {tasksQuantity}</p>
          </div>

          {tasksToDo.map((task) => ( 
            <div key={task.id} className="bg-emerald-950 p-5 rounded-lg flex justify-between mb-2">
              <p>{task.text}</p>

              <div className="flex gap-3">
                <button onClick={() => completeTask(task.id)} className="hover:bg-emerald-300 rounded-lg px-1"><Check color="rgb(16 185 129)" size={18} /></button>
                <button onClick={() => deleteTask(task.id)} className="hover:bg-emerald-300 rounded-lg px-1"><Trash color="rgb(16 185 129)" size={18} /></button>
              </div>
            </div>
           ))}

          <div className='flex flex-col gap-4 mt-8 mb-3'>
            <p>Done - {completeTasks}</p>
          </div>

          {tasksDone.map((task) => ( 
            <div key={task.id} className="bg-emerald-950 p-5 rounded-lg flex justify-between mb-2 line-through text-emerald-500">
              <p>{task.text}</p>

              <div className="flex gap-3">
                <button onClick={() => completeTask(task.id)} className="hover:bg-emerald-300 rounded-lg px-1"><X color="rgb(16 185 129)" size={18} /></button>
                <button onClick={() => deleteTask(task.id)} className="hover:bg-emerald-300 rounded-lg px-1"><Trash color="rgb(16 185 129)" size={18} /></button>
              </div>
            </div>
           ))}
      </div>
    </div>
  )
}
