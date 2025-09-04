import { useParams, useNavigate } from "react-router-dom";
import { useTaskStore } from "../state/store";
import { useEffect, useState } from "react";
import { getRightIcon } from "../state/store"; // if exported
import closeButton from "../assets/close_ring_duotone-1.svg"
import trashIcon from "../assets/Trash.svg"

const TaskDetailPage = ({ isNew }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getTaskById,  
          formData,
          setFormField,
          resetForm,
          loadTaskIntoForm,
          addTask,
          updateTask,
          deleteTask, } = useTaskStore();

  // const [formData, setFormData] = useState({
  //   name: "",
  //   description: "",
  //   status: "in-progress",
  //   leftIcon: "📘",
  //   rightIcon: getRightIcon("in-progress"),
  // });

   useEffect(() => {
    if (isNew) {
      resetForm(); // new → start fresh defaults
    } else if (id) {
      loadTaskIntoForm(id); // editing existing task
    }
  }, [id, isNew, resetForm, loadTaskIntoForm]);

  const handleCancel = () => {
    navigate("/");
  };

  const handleSave = () => {
    if (isNew) {
      addTask();
    } else {
      updateTask(formData.id, formData);
    }
    navigate("/");
  };

  const handleDelete = () => {
    deleteTask(formData.id);
    navigate("/");
  };

  const handleChange = (field, value) => {
  setFormField(field, value);
  };

  // useEffect(() => {
  //   if (!isNew && id) {
  //     const task = getTaskById(id);
  //     if (task) setFormData(task);
  //   }
  // }, [id, isNew, getTaskById]);

  // const handleChange = (field, value) => {
  //   setFormData((prev) => ({
  //     ...prev,
  //     [field]: value,
  //     rightIcon: field === "status" ? getRightIcon(value) : prev.rightIcon,
  //   }));
  // };

  
  //   const handleCancel = () => {
  //   navigate("/");
  //   };


  // const handleSave = () => {
  //   if (isNew) {
  //     addTask(); // uses default logic
  //   } else {
  //     updateTask(formData.id, formData);
  //   }
  //   navigate("/");
  // };

  // const handleDelete = () => {
  //   deleteTask(formData.id);
  //   navigate("/");
  // };

  return (
  <div className="task-detail-panel">
    <div className="task-header">
        <h2>Task Details</h2>
        <img
        src={closeButton} 
        alt="Close"
        className="close-icon"
        onClick={handleCancel}
        />
    </div>


    <div className="form-group full-width">
      <label htmlFor="taskName">Task Name</label>
      <input
        type="text"
        id="taskName"
        placeholder="Task Name"
        value={formData.name}
        onChange={(e) => handleChange("name", e.target.value)}
      />
    </div>

    <div className="form-group full-width">
      <label htmlFor="taskDesc">Description</label>
      <textarea
        id="taskDesc"
        placeholder="Enter a short description"
        value={formData.description}
        onChange={(e) => handleChange("description", e.target.value)}
      />
    </div>

    <div className="form-group">
      <label>Icon</label>
      <div className="icon-row">
        {["📋", "🏆", "🔧", "✅", "🐞", "🗡", "⚙", "🛒"].map((icon) => (
          <button
            key={icon}
            className={formData.leftIcon === icon ? "selected" : ""}
            onClick={() => handleChange("leftIcon", icon)}
          >
            {icon}
          </button>
        ))}
      </div>
    </div>

    <div className="form-group">
      <label>Status</label>
      <div className="status-row">
        {[
          { label: "In Progress", value: "in-progress", icon: getRightIcon("in-progress") },
          { label: "Completed", value: "completed", icon: getRightIcon("completed") },
          { label: "Won’t do", value: "wont-do", icon: getRightIcon("wont-do") },
          { label: "To Do", value: "todo", icon: getRightIcon("todo") },
        ].map(({ label, value, icon }) => (
          <button
            key={value}
            className={formData.status === value ? "active" : ""}
            onClick={() => handleChange("status", value)}
          >
            <div className={`task-status-icon ${value}`}>
                <img src={icon} alt="Add" className="task-status-svg" />
            </div>
            {label}
          </button>
        ))}
      </div>
    </div>

    <div className="actions bottom-right">
      <button className="save-btn" onClick={handleSave}>Save</button>
      <button className="delete-btn" onClick={handleDelete} disabled={isNew}>
        <span>Delete</span>
        <img src={trashIcon} alt="Delete" className="delete-icon"/>
      </button>
    </div>
  </div>
);
};

export default TaskDetailPage;