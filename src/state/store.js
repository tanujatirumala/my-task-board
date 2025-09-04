import { create } from "zustand";
import doneIcon from "../assets/Done_round_duotone.svg";
import closeIcon from "../assets/close_ring_duotone.svg";
import progressIcon from "../assets/Time_atack_duotone.svg";
import todoIcon from "../assets/to-do-icon.svg";


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

export const useTaskStore = create((set, get) => ({
  boardName: "My Task Board",
  description: "Tasks to keep organised",
  tasks: [
    {
      id: 1,
      name: "Task in Progress",
      status: "in-progress",
      description: "",
      leftIcon: "🕒", //  changed from icon to leftIcon
      rightIcon: getRightIcon("in-progress"), //  added rightIcon
    },
    {
      id: 2,
      name: "Task Completed",
      status: "completed",
      description: "",
      leftIcon: "✅",
      rightIcon: getRightIcon("completed"),
    },
    {
      id: 3,
      name: "Task Won’t Do",
      status: "wont-do",
      description: "",
      leftIcon: "☕",
      rightIcon: getRightIcon("wont-do"),
    },
    {
      id: 4,
      name: "Task To Do",
      status: "todo",
      description: "",
      leftIcon: "📝",
      rightIcon: getRightIcon("todo"),
    },
  ],

  addTask: () =>
  set((state) => {
    const { formData } = state;
    const newTask = {
      ...formData,
      id: Date.now(), // ensure unique ID
      rightIcon: getRightIcon(formData.status || "todo"), // recalculate icon
    };
    return { tasks: [...state.tasks, newTask] };
  }),

  updateTask: (id, updatedTask) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              ...updatedTask,
              rightIcon: getRightIcon(updatedTask.status || task.status), // 🔧 auto-update rightIcon
            }
          : task
      ),
    })),

  deleteTask: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    })),

    // 🔍 Get Task by ID
  getTaskById: (id) => {
    return get().tasks.find(task => task.id.toString() === id.toString());
  },

  // 🔹 Form State
  formData: {
    name: "",
    description: "",
    status: "in-progress",
    leftIcon: "📘",
    rightIcon: getRightIcon("in-progress"),
  },

  setFormField: (field, value) =>
    set((state) => ({
      formData: {
        ...state.formData,
        [field]: value,
        rightIcon: field === "status" ? getRightIcon(value) : state.formData.rightIcon,
      },
    })),

  setFormData: (newData) =>
  set(() => ({
    formData: {
      ...newData,
      rightIcon: getRightIcon(newData.status || "in-progress"), // auto-update icon
    },
  })),

  loadTaskIntoForm: (id) => {
  const task = get().getTaskById(id);     // ✅ Accessing another store method
  if (task) {
    get().setFormData(task);              // ✅ Calling the form setter correctly
    }
  },

  resetForm: () =>
    set({
      formData: {
        name: "New Task",
        description: "",
        status: "in-progress",
        leftIcon: "📘",
        rightIcon: getRightIcon("in-progress"),
      },
    }),

  // 🧭 Task Page State
  selectedTask: null,
  isTaskPageOpen: false,

  setSelectedTask: (task) =>
    set({ selectedTask: task, isTaskPageOpen: true }),

  clearSelectedTask: () =>
    set({ selectedTask: null, isTaskPageOpen: false }),
}));


