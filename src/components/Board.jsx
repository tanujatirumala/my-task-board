import React from "react";
import { useTaskStore } from "../state/store";
import Task from "./Task";
import BoardHeader from "./BoardHeader";
import addIcon from "../assets/Add_round_duotone.svg";
import { Link } from "react-router-dom";

const Board = () => {
  const tasks = useTaskStore((state) => state.tasks);
  if (!tasks || tasks.length === 0) return <div>Loading tasks...</div>;
  return (
    <div className="board">
      <BoardHeader />

      <div className="task-list">
        {tasks.map((task) => (
          <Task key={task.id} task={task} />
        ))}
      </div>

      <Link to="/task/new" className="task-link">
        <button className="task-card add-task-card">
          <div className="add-icon-container">
            <img src={addIcon} alt="Add" className="task-status-svg" />
          </div>
          <span className="add-new-task">Add New Task</span>
        </button>
      </Link>
    </div>
  );
};

export default Board;
