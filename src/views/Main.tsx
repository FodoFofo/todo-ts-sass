import { useState, useEffect } from 'react'
import { projectFirestore } from '../firebase/config'

// style
import './Main.scss'

// children
import Tasks from '../components/Tasks'
import AddForm from '../components/AddForm'
import { TaskType } from '../types'

// component
const Main = () => {
  const [listOfTasks, setListOfTasks] = useState([]) // zoznam úlôh
  const [error, setError] = useState("")             // chybová hláška
  const [pridatUlohu, setPridatUlohu] = useState(false) // false - skryje AddForm zobrazí Tasks, true - opačne
  const [editovatUlohu, setEditovatUlohu] = useState(false) // false - ak chcem pridať úlohu, true - ak chcem editovať úlohu
  const [formData, setFormData] = useState({
    id : "",
    created : "",
    name : "",
    description : "",
    category : "",
    term : "",
    state : "",
    note : ""
  })

  // prvé načítanie dát z firebase
  useEffect( () => {
    const unsubscribe = projectFirestore.collection('ulohy').onSnapshot( (snapshot: any) => {
      // ak v natiahnutých dátach nič nie je ...
      if(snapshot.empty) {
        setError("Žiadne data")
        setListOfTasks([])
      } else {
        let results: any = []
        snapshot.docs.forEach( (task: any) => {
          results.push({id: task.id, ...task.data()})
        });
        setListOfTasks(results)
        setError('')
      }
    }, (err: Error) => setError(err.message))

    // odstránenie poslúchača (event listener)
    return () => unsubscribe()
  },[])

  // mazanie úlôh
  const handleDeleteTask = (id: string) => {
    projectFirestore.collection('ulohy').doc(id).delete()
  }

  // pridávanie úloh
  const handleAddTask = (data: object, id?: string) => {
    projectFirestore.collection('ulohy').add(data)
    setPridatUlohu(false)
  }

  // editovanie úloh
  const startUpdating = (data: TaskType) => {
    setEditovatUlohu(true)
    setPridatUlohu(true)
    setFormData(data)
  }
  
  const handleEditTask = (data: object, id: string) => {
    projectFirestore.collection('ulohy').doc(id).update(data).then(() => setEditovatUlohu(false))
    setPridatUlohu(false)
  }

  // template
  return (
    <div className="main">

      {pridatUlohu ? null : <Tasks
        tasks={listOfTasks}
        deleteTask={handleDeleteTask}
        startUpdating={startUpdating} 
        setPridatUlohu={() => setPridatUlohu(!pridatUlohu)}
      />}

      {!pridatUlohu ? null : <AddForm 
        pridajUlohu={handleAddTask}
        setPridatUlohu={setPridatUlohu}
        upravUlohu={handleEditTask}
        zoznamUloh={listOfTasks}
        formData={formData}
        setFormData={setFormData}
        editovatUlohu={editovatUlohu}
        setEditovatUlohu={setEditovatUlohu}
      />}

      {// Výpis chybovej hlášky 
      error && <p>{error}</p>}
      
      <footer>
        &copy; Foďo 2023
      </footer>
    </div>
  )
}

export default Main