import React from "react";
import { useTaskStore } from "../state/store";

const Task = ({ task }) => {
  const { deleteTask, updateTask } = useTaskStore();

  const handleEdit = () => {
    const newName = prompt("Edit task name:", task.name);
    if (newName) {
      updateTask(task.id, { name: newName });
    }
  };

  return (
    <div className={`task-card ${task.status}`}>
      {/*  Left icon */}
      <div className="task-icon-bg">
        {typeof task.leftIcon === "string" &&
        (task.leftIcon.startsWith("data:image") || task.leftIcon.endsWith(".svg")) ? (
          <img src={task.leftIcon} alt="" className="task-icon" />
        ) : (
          <span className="task-icon">{task.leftIcon}</span>
        )}
      </div>

      {/* Task name */}
      <span className="task-name">{task.name}</span>

      {/* Right icon */}
      <div className={`task-status-icon ${task.status}`}>
        {task.rightIcon &&
        typeof task.rightIcon === "string" &&
        (task.rightIcon.startsWith("data:image") || task.rightIcon.endsWith(".svg")) ? (
          <img src={task.rightIcon} alt="" className="task-status-svg" />
        ) : (
          <span className="task-status-svg">{task.rightIcon}</span>
        )}
      </div>
    </div>
  );
};

export default Task;