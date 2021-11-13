import Header from './components/Header'
import Footer from './components/Footer'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

function App() {
    const [showAddTask, setShowAddTask] = useState(false)
    const [tasks, setTasks] = useState([])


    // useEffect is used so the data loads when the page loads
    useEffect(() => {
        // getTasks should be async because we are calling fetchTasks wich returns a promise
        const getTasks = async () =>{
            const tasksFromServer = await fetchTasks()
            setTasks(tasksFromServer)
        }

        getTasks()
    }, [])

    // Fetch the tasks from the db.json mock database
    const fetchTasks = async () => {
        const res = await fetch('http://localhost:5000/tasks')
        const data = await res.json()

        return data
    }

    // Fetch a singular task
    const fetchTask = async (id) => {
        const res = await fetch(`http://localhost:5000/tasks/${id}`)
        const data = await res.json()

        return data
    }


    // Add Task
    const addTask = async (task) => {
        // Request setup
        const res = await fetch('http://localhost:5000/tasks', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(task),
        })

        // Get the data from the response
        const data = await res.json()
        // Set the tasks with the old tasks + the new data from the response
        setTasks([...tasks, data])

        // // Generate a random id up to 10k
        // const id = Math.floor(Math.random() * 10000) + 1
        // // Create a new task
        // const newTask = { id, ...task }
        // // Set tasks with the current task +  the new task
        // setTasks([...tasks, newTask])
    }

    // Delete Task
    const deleteTask = async (id) => {
        await fetch(`http://localhost:5000/tasks/${id}`, {
            method: 'DELETE'
        })

        setTasks(tasks.filter((task) => task.id !== id))
    }

    // Toggle Reminder
    const toggleReminder = async (id) => {
        const taskToToggle = await fetchTask(id)
        const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder }

        const res = await fetch(`http://localhost:5000/tasks/${id}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(updTask),
        })

        const data = await res.json()

        setTasks(
            tasks.map((task) =>
                task.id === id ? { ...task, reminder: data.reminder } : task
            )
        )
    }

  return (
      <Router>
          <div className="container">
              {/*If the add button is clicked switch the showAddTask state (true or false)
                + add the state of showAddTask as a prop so that we can change the value and color of the button*/}
              <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask}/>
              {/*If showAddTask is false dont show the addTask form*/}
              {showAddTask && <AddTask onAdd={addTask}/>}
              {/*If there are not tasks to show, show a message*/}
              {tasks.length > 0 ?<Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/> : 'No tasks to show'}
              <Footer />
          </div>
      </Router>
  );
}

export default App;
