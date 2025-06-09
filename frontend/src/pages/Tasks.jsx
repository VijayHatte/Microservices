import React, { useEffect, useState } from 'react';
import {
  fetchTasks,
  createTask,
  updateTask,
  deleteTask,
} from '../api/taskApi';
import { searchTask } from '../api/searchApi';
import './Tasks.css';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [editTaskId, setEditTaskId] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [query, setquery] = useState('');
  const [results, setResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    fetchTasks()
      .then((res) => setTasks(res.data))
      .catch((error) => console.error('Fetch error:', error));
  }, []);

  const handleAdd = () => {
    if (!newTitle.trim()) return;
    createTask({ title: newTitle })
      .then((res) => {
        setTasks([...tasks, res.data]);
        setNewTitle('');
      })
      .catch((error) => console.error('Add task failed:', error));
  };

  const handleDelete = (id) => {
    deleteTask(id)
      .then(() => setTasks(tasks.filter((task) => task.id !== id)))
      .catch((error) => console.error('Delete failed:', error));
  };

  const handleEdit = (task) => {
    setEditTaskId(task.id);
    setEditedTitle(task.title);
  };

  const handleUpdate = (id) => {
    if (!editedTitle.trim()) return;
    updateTask(id, { title: editedTitle })
      .then((res) => {
        setTasks(tasks.map((task) => (task.id === id ? res.data : task)));
        setEditTaskId(null);
        setEditedTitle('');
      })
      .catch((error) => console.error('Update failed:', error));
  };

  const handleSearch = async () => {
    if (!query.trim()) return;
    setHasSearched(true); // mark that search was triggered
    try {
      const res = await searchTask(query);
      setResults(res);
    } catch (error) {
      console.error('Search failed:', error);
      setResults([]); // reset on failure
    }
  };
  

  

  return (
    <div className="tasks-container">
  <h2 className="heading">Task Manager</h2>

  <div className="search-section">
    <input
      type="text"
      placeholder="Search tasks..."
      value={query}
      onChange={(e) => setquery(e.target.value)}
      className="input-field"
    />
    <button onClick={handleSearch} className="button search-button">Search</button>
  </div>

  {hasSearched && Array.isArray(results) && (
  <div className="search-results">
    <p className="font-medium mb-2">Search Results:</p>
    {results.length > 0 ? (
      <ul>
        {results.map((task) => (
          <li key={task.id} className="result-item">{task.title}</li>
        ))}
      </ul>
    ) : (
      <p className="text-gray-500">No match found.</p>
    )}
  </div>
)}


  <div className="add-section">
    <input
      type="text"
      value={newTitle}
      onChange={(e) => setNewTitle(e.target.value)}
      placeholder="New Task Title"
      className="input-field"
    />
    <button onClick={handleAdd} className="button add-button">Add</button>
  </div>

  <ul className="task-list">
    {tasks.map((task) => (
      <li key={task.id} className="task-item">
        {editTaskId === task.id ? (
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="edit-input"
          />
        ) : (
          <span className="task-title">{task.title}</span>
        )}
        <div className="button-group">
          {editTaskId === task.id ? (
            <button
              onClick={() => handleUpdate(task.id)}
              className="button save-button"
            >
              Save
            </button>
          ) : (
            <button
              onClick={() => handleEdit(task)}
              className="button edit-button"
            >
              Edit
            </button>
          )}
          <button
            onClick={() => handleDelete(task.id)}
            className="button delete-button"
          >
            Delete
          </button>
        </div>
      </li>
    ))}
  </ul>
</div>

  );
};

export default Tasks;
