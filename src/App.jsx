import React from "react";
import Board from "./components/Board";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import TaskDetailPage from "./components/TaskDetail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Board />} />
        <Route path="/task/new" element={<TaskDetailPage isNew={true} />} />
        <Route path="/task/:id" element={<TaskDetailPage isNew={false}/>} />
      </Routes>
    </Router>
  );
}


export default App;
