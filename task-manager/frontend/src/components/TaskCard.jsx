import { useState } from 'react'

function TaskCard({ task, onEdit, onToggle, onDelete }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(task.title)
  const [editDescription, setEditDescription] = useState(task.description)
  const [loading, setLoading] = useState(false)

  const handleSaveEdit = async () => {
    if (!editTitle.trim()) {
      alert('Title cannot be empty')
      return
    }

    setLoading(true)
    try {
      await onEdit(task._id, {
        title: editTitle.trim(),
        description: editDescription.trim(),
      })
      setIsEditing(false)
    } finally {
      setLoading(false)
    }
  }

  const handleToggle = async () => {
    setLoading(true)
    try {
      await onToggle(task._id)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setLoading(true)
      try {
        await onDelete(task._id)
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <div className={`task-card ${task.completed ? 'completed' : ''}`}>
      <div className="task-checkbox">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={handleToggle}
          disabled={loading}
        />
      </div>

      {isEditing ? (
        <div className="task-edit">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            disabled={loading}
            className="edit-input"
          />
          <textarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            disabled={loading}
            className="edit-textarea"
            rows="2"
          />
          <div className="edit-buttons">
            <button onClick={handleSaveEdit} disabled={loading}>
              {loading ? 'Saving...' : 'Save'}
            </button>
            <button onClick={() => setIsEditing(false)} disabled={loading}>
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="task-content">
          <h3 className="task-title">{task.title}</h3>
          {task.description && <p className="task-description">{task.description}</p>}
          <div className="task-buttons">
            <button
              className="edit-btn"
              onClick={() => setIsEditing(true)}
              disabled={loading}
            >
              Edit
            </button>
            <button
              className="delete-btn"
              onClick={handleDelete}
              disabled={loading}
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default TaskCard
