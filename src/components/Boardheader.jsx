import React from "react";
import logo from "../assets/logo.svg";
import editIcon from "../assets/Edit_duotone.svg";

const BoardHeader = () => {
  return (
    <div className="board-header">
      <h1>
        <img src={logo} alt="Logo" className="logo" />
        My Task Board
        <img src={editIcon} alt="Edit Icon" className="board-icon"/>
      </h1>
      <p>Tasks to keep Organised</p>
    </div>
  );
};

export default BoardHeader;
