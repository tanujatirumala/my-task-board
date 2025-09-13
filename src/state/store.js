import { create } from "zustand";
import doneIcon from "../assets/Done_round_duotone.svg";
import closeIcon from "../assets/close_ring_duotone.svg";
import progressIcon from "../assets/Time_atack_duotone.svg";
import todoIcon from "../assets/to-do-icon.svg";
import { jwtDecode } from "jwt-decode";


// 🔧 Helper to assign right icon based on status
export const getRightIcon = (status) => {
  switch (status) {
    case "completed":
      return doneIcon;
    case "wont-do":
      return closeIcon;
    case "in-progress":
      return progressIcon;
    case "todo":
      return todoIcon;
    default:
      return progressIcon;
  }
};

function isExpired(token) {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const now = Math.floor(Date.now() / 1000);
    return payload.exp && payload.exp < now;
  } catch (e) {
    console.error("Invalid token format", e);
    return true; // treat invalid token as expired
  }
}


/* ------------------ Auth Store ------------------ */
export const useAuthStore = create((set) => ({
  // token: localStorage.getItem("token"),
  // userId: localStorage.getItem("userId"),
  // isAuthenticated: !!localStorage.getItem("token"),
  token: null,
  userId: null,
  userName: null,
  isAuthenticated: false,

  // login → store token + userId
  login: (token) => {
    try {
      // decode payload { id, email, name? }
      const decoded = jwtDecode(token);

      const userId = decoded.id;
      const userName = decoded.name || "User";

      set({ token, userId, userName, isAuthenticated: true });

      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);
      localStorage.setItem("userName", userName);

      console.log("Login successful:", userId, userName);
    } catch (error) {
      console.error("Invalid token:", error);
    }
  },


  // logout → clear state
  logout: () => {
    set({ token: null, userId: null, userName: null, isAuthenticated: false });
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
  },

  // restore state on refresh
  initialize: () => {
  const token = localStorage.getItem("token");
  if (token && !isExpired(token)) {
    set({ token, isAuthenticated: true });
  } else {
    localStorage.removeItem("token");
    set({ token: null, isAuthenticated: false });
  }
}

  // initialize: () => {
  //   const token = localStorage.getItem("token");
  //   const userId = localStorage.getItem("userId");
  //   if (token && userId) {
  //     set({ token, userId, isAuthenticated: true });
  //   }
  // },
}));

/* ------------------ Helper for API ------------------ */
export async function apiFetch(url, options = {}) {
  const token = useAuthStore.getState().token;

  const headers = {
    ...(options.headers || {}),
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const response = await fetch(url, { ...options, headers });
  if (!response.ok) {
    throw new Error("API error: " + response.statusText);
  }
  return response.json();
}

// ----------------- Simulated user ID -----------------
// let simulatedUserId = "abd6b716-d7d8-4eba-8b77-10a1306c3078"; // fixed ID for simplicity



// ----------------- Zustand Store -----------------
export const useTaskStore = create((set, get) => ({
  boardName: "My Task Board",
  description: "Tasks to keep organised",
  tasks: [],
  
  // ----------------- Form State -----------------
  formData: {
    name: "",
    description: "",
    status: "todo",
    leftIcon: "🐞",
    rightIcon: "todo",
  },

  setFormField: (field, value) =>
    set((state) => ({
      formData: {
        ...state.formData,
        [field]: value,
        rightIcon: field === "status" ? value : state.formData.rightIcon,
      },
    })),

  setFormData: (newData) =>
  set(() => ({
    formData: {
      ...newData,
      rightIcon: getRightIcon(newData.status || "in-progress"), // auto-update icon
    },
  })),

  resetForm: () =>
    set({
      formData: {
        name: "New Task",
        description: "",
        status: "todo",
        leftIcon: "📘",
        rightIcon: "todo",
      },
    }),

  loadTaskIntoForm: (id) => {
    const task = get().tasks.find((t) => t.id.toString() === id.toString());
    if (task) get().setFormData(task);
  },

  // ----------------- User Handling -----------------
  setUserId: (id) => set({ userId: id }),

  // ----------------- API Methods -----------------
  fetchTasks: async () => {
    const data = await apiFetch("http://localhost:5000/tasks");
    set({ tasks: data });
  },

  addTask: async () => {
    const { formData, tasks } = get();
    const newTask = await apiFetch("http://localhost:5000/tasks", {
      method: "POST",
      body: JSON.stringify(formData),
    });
    set({ tasks: [...tasks, newTask] });
  },

  updateTask: async (id, updatedTask) => {
    const { tasks } = get();
    const updated = await apiFetch(`http://localhost:5000/tasks/${id}`, {
      method: "PUT",
      body: JSON.stringify(updatedTask),
    });
    set({ tasks: tasks.map((t) => (t.id === id ? updated : t)) });
  },

  deleteTask: async (id) => {
    await apiFetch(`http://localhost:5000/tasks/${id}`, { method: "DELETE" });
    set((state) => ({
      tasks: state.tasks.filter((t) => t.id !== id),
    }));
  },

  // ----------------- Task Page State -----------------
  selectedTask: null,
  isTaskPageOpen: false,

  setSelectedTask: (task) => set({ selectedTask: task, isTaskPageOpen: true }),
  clearSelectedTask: () => set({ selectedTask: null, isTaskPageOpen: false }),
}));


/* ------------------ Auth API ------------------ */
export async function registerUser(email, password, name) {
  const res = await fetch("http://localhost:5000/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, name }),
  });

  if (!res.ok) {
    throw new Error("Registration failed");
  } else{
    useAuthStore.getState().logout();
  }
  return res.json();
}

export async function loginUser(email, password) {
  const res = await fetch("http://localhost:5000/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) throw new Error("Login failed");
  const data = await res.json();

  // store token + userId in Zustand
  useAuthStore.getState().login(data.token, data.user.id);
  return data;
}

