import { create } from "zustand";
import doneIcon from "../assets/Done_round_duotone.svg";
import closeIcon from "../assets/close_ring_duotone.svg";
import progressIcon from "../assets/Time_atack_duotone.svg";



// 🔧 Helper to assign right icon based on status
const getRightIcon = (status) => {
  switch (status) {
    case "completed":
      return doneIcon;
    case "wont-do":
      return closeIcon;
    case "in-progress":
      return progressIcon;
    default:
      return progressIcon;
  }
};

export const useTaskStore = create((set) => ({
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
  ],

  addTask: () =>
    set((state) => {
      const newTask = {
        id: Date.now(),
        name: "New Task",
        status: "todo",
        description: "",
        leftIcon: "📘", // 🔧 new left icon
        rightIcon: getRightIcon("won't-do"), // 🔧 new right icon
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

  updateBoard: (name, desc) => set({ boardName: name, description: desc }),
}));


