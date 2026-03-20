import { useState, useEffect } from 'react'
import axiosInstance from '../api/axios'
import Navbar from '../components/Navbar'
import TaskForm from '../components/TaskForm'
import FilterBar from '../components/FilterBar'
import TaskCard from '../components/TaskCard'

function Dashboard() {
  const [tasks, setTasks] = useState([])
  const [filter, setFilter] = useState('All')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = async () => {
    try {
      setLoading(true)
      const response = await axiosInstance.get('/tasks')
      setTasks(response.data)
    } catch (error) {
      console.error('Failed to fetch tasks:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddTask = async (newTask) => {
    try {
      const response = await axiosInstance.post('/tasks', newTask)
      setTasks([response.data, ...tasks])
    } catch (error) {
      console.error('Failed to add task:', error)
    }
  }

  const handleEditTask = async (id, updatedData) => {
    try {
      const response = await axiosInstance.put(`/tasks/${id}`, updatedData)
      setTasks(tasks.map(task => task._id === id ? response.data : task))
    } catch (error) {
      console.error('Failed to edit task:', error)
    }
  }

  const handleToggleTask = async (id) => {
    try {
      const response = await axiosInstance.patch(`/tasks/${id}`)
      setTasks(tasks.map(task => task._id === id ? response.data : task))
    } catch (error) {
      console.error('Failed to toggle task:', error)
    }
  }

  const handleDeleteTask = async (id) => {
    try {
      await axiosInstance.delete(`/tasks/${id}`)
      setTasks(tasks.filter(task => task._id !== id))
    } catch (error) {
      console.error('Failed to delete task:', error)
    }
  }

  const filteredTasks = tasks.filter(task => {
    if (filter === 'Completed') return task.completed
    if (filter === 'Pending') return !task.completed
    return true
  })

  return (
    <div className="dashboard">
      <Navbar />
      <div className="dashboard-container">
        <TaskForm onAddTask={handleAddTask} />
        <FilterBar currentFilter={filter} onFilterChange={setFilter} />
        
        {loading ? (
          <div className="loading">Loading tasks...</div>
        ) : filteredTasks.length === 0 ? (
          <div className="no-tasks">No tasks found</div>
        ) : (
          <div className="tasks-list">
            {filteredTasks.map(task => (
              <TaskCard
                key={task._id}
                task={task}
                onEdit={handleEditTask}
                onToggle={handleToggleTask}
                onDelete={handleDeleteTask}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard
