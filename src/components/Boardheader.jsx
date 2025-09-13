
import React, { useState } from "react";
import { useAuthStore } from "../state/store";
import logo from "../assets/logo.svg";
import editIcon from "../assets/Edit_duotone.svg";
import userIcon from "../assets/user-icon.svg"; // 👤 profile avatar/icon

const BoardHeader = () => {
  const { logout, isAuthenticated } = useAuthStore();
  const userName = localStorage.getItem("userName") || "User";
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="board-header">
      {/* First row: logo, title, edit, and profile */}
      <div className="header-top">
        <div className="header-left">
          <img src={logo} alt="Logo" className="logo" />
          <h1 className="board-title">
            My Task Board
            <img src={editIcon} alt="Edit Icon" className="board-icon" />
          </h1>
        </div>

        {isAuthenticated && (
          <div className="header-right">
            <div
              className="profile-container"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <img src={userIcon} alt="User" className="profile-icon" />
              <span className="profile-name">{userName}</span>
            </div>

            {menuOpen && (
              <div className="dropdown-menu">
                <button className="dropdown-item">Profile</button>
                <button
                  className="dropdown-item"
                  onClick={() => {
                    logout();
                    window.location.href = "/login";
                  }}
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Second row: subtitle */}
      <div className="header-bottom">
        <p>Tasks to keep Organised</p>
      </div>
    </div>
  );
};

export default BoardHeader;
