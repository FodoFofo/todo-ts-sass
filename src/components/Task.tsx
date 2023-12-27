import React from 'react'

// styles
import './Task.scss'
import { TaskType } from '../types'

type Props = {
  task: TaskType
  deleteTask: (id:string) => void
  update: (data: TaskType) => void
}

const Task = (props: Props) => {
  const { task } = props

  return (
  <div className='all-task'>
    <div key={task.id} className='task'>
        <h1>{task.name}</h1>
        <p>{task.description}</p>
    </div>
    <div className="buttons">
      {/*tento button upraviť tak aby spustil formulár, a funkcia update aby sa spustila až po odoslaní formuláru*/}
      <button onClick={ () => props.update(task) }> Upraviť</button>  
      <button onClick={ () => props.deleteTask(task.id) }>Vymazať</button>
    </div>
  </div>
  )
}

export default Task