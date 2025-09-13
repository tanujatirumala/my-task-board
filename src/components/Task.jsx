import React from "react";
import { useTaskStore } from "../state/store";
import { Link } from "react-router-dom";
import { getRightIcon } from "../state/store"; // if exported

const Task = ({ task }) => {
  // const { deleteTask, updateTask } = useTaskStore();

  const handleEdit = () => {
    const newName = prompt("Edit task name:", task.name);
    if (newName) {
      updateTask(task.id, { name: newName });
    }
  };

  return (
    <Link to={`/task/${task.id}`} className="task-link">
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
      <div className="task-content">
        <span className="task-name">{task.name}</span>
        {task.description && (
          <span className="task-desc">{task.description}</span>
        )}
      </div>


      {/* Right icon */}
      <div className={`task-status-icon ${task.status}`}>
        {task.rightIcon &&
        typeof task.rightIcon === "string" &&
        (getRightIcon(task.rightIcon).startsWith("data:image") || getRightIcon(task.rightIcon).endsWith(".svg")) ? (
          <img src={getRightIcon(task.rightIcon)} alt="" className="task-status-svg" />
        ) : (
          <span className="task-status-svg">{getRightIcon(task.rightIcon)}</span>
        )}
      </div>
      </div>
    </Link>
  );
};

export default Task;