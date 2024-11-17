import React, { useState, useEffect } from 'react';
import './App.css';
import TaskItem from './components/TaskItem';
import SearchBar from './components/SearchBar';
import { saveTasksToLocalStorage, getTasksFromLocalStorage } from './utils/localStorage';

interface Task {
  id: number;
  title: string;
  completed: boolean;
  priority: string;
}

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const storedTasks = getTasksFromLocalStorage();
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);

  useEffect(() => {
    saveTasksToLocalStorage(tasks);
  }, [tasks]);

  const addTask = (title: string, priority: string) => {
    const newTask: Task = {
      id: Date.now(),
      title,
      completed: false,
      priority,
    };
    setTasks([...tasks, newTask]);
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleTaskCompletion = (id: number) => {
    setTasks(
      tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app">
      <h1>Task Manager</h1>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div className="task-input">
        <input
          id="task-title"
          type="text"
          placeholder="Enter task title"
        />
        <select id="task-priority">
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <button
          onClick={() =>
            addTask(
              (document.getElementById('task-title') as HTMLInputElement).value,
              (document.getElementById('task-priority') as HTMLSelectElement)
                .value
            )
          }
        >
          Add Task
        </button>
      </div>
      <div className="task-list">
        {filteredTasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            deleteTask={deleteTask}
            toggleTaskCompletion={toggleTaskCompletion}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
