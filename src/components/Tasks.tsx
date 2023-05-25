import Task from "./Task"
import { TaskType } from "../types"
// styles
import './Tasks.scss'

type Props = {
  tasks: TaskType[]
  deleteTask: (id:string) =>void
  startUpdating: (data: TaskType) => void
  setPridatUlohu: () => void
}

const Tasks = (props: Props) => {
  
  // pridanie novej úhlohy
  const novaUloha = (e: any) => {
    props.setPridatUlohu();
  }

  return (
    <div className="tasks">
        <h1>Zoznam úlôh</h1>
        {props.tasks.map( (task) => {
            return(
              <Task 
                key={task.id}
                task = {task}
                deleteTask={props.deleteTask}
                update={props.startUpdating}
              />
            )
        })}

        <button onClick={novaUloha}>Nová úloha</button>
    </div>
  )
}

export default Tasks