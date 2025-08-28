import React from "react";
import { useTaskStore } from "../state/store";
import Task from "./Task";
import BoardHeader from "./BoardHeader";
import addIcon from "../assets/Add_round_duotone.svg";

const Board = () => {
  const { tasks, addTask } = useTaskStore();

  return (
    <div className="board">
      <BoardHeader />

      <div className="task-list">
        {tasks.map((task) => (
          <Task key={task.id} task={task} />
        ))}
      </div>

      <button className="task-card add-task-card" onClick={addTask}>
        <div className="add-icon-container">
          <img src={addIcon} alt="Add" className="task-status-svg" />
        </div>
        <span className="add-new-task">Add New Task</span>
      </button>
    </div>
  );
};

export default Board;
