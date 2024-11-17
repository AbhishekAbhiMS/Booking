import React from "react";

const TaskItem = ({ task, deleteTask, toggleTaskCompletion }) => {
  return (
    <div className={`task-item ${task.completed ? "completed" : ""}`}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => toggleTaskCompletion(task.id)}
      />
      <span className={`task-title priority-${task.priority.toLowerCase()}`}>
        {task.title} ({task.priority})
      </span>
      <button onClick={() => deleteTask(task.id)}>Delete</button>
    </div>
  );
};

export default TaskItem;
