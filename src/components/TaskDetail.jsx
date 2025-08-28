import { useParams, useNavigate } from "react-router-dom";
import { useTaskStore } from "../store";
import { useEffect, useState } from "react";
import { getRightIcon } from "../store"; // if exported

const TaskDetailPage = ({ isNew }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getTaskById, addTask, updateTask, deleteTask } = useTaskStore();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    status: "in-progress",
    leftIcon: "📘",
    rightIcon: getRightIcon("in-progress"),
  });

  useEffect(() => {
    if (!isNew && id) {
      const task = getTaskById(id);
      if (task) setFormData(task);
    }
  }, [id, isNew, getTaskById]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
      rightIcon: field === "status" ? getRightIcon(value) : prev.rightIcon,
    }));
  };

  const handleSave = () => {
    if (isNew) {
      addTask(); // uses default logic
    } else {
      updateTask(formData.id, formData);
    }
    navigate("/");
  };

  const handleDelete = () => {
    deleteTask(formData.id);
    navigate("/");
  };

  return (
    <div className="task-detail-page">
      <input
        type="text"
        placeholder="Task Name"
        value={formData.name}
        onChange={(e) => handleChange("name", e.target.value)}
      />
      <textarea
        placeholder="Enter a short description"
        value={formData.description}
        onChange={(e) => handleChange("description", e.target.value)}
      />

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

      <div className="status-row">
        {["in-progress", "completed", "wont-do"].map((status) => (
          <button
            key={status}
            className={formData.status === status ? "active" : ""}
            onClick={() => handleChange("status", status)}
          >
            {status}
          </button>
        ))}
      </div>

      <div className="actions">
        <button onClick={handleSave}>Save</button>
        {!isNew && <button onClick={handleDelete}>Delete</button>}
        <button onClick={() => navigate("/")}>Cancel</button>
      </div>
    </div>
  );
};

export default TaskDetailPage;