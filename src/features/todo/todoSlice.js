import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
  name: "todo",
  initialState: {
    todos: [],
    total: 0,
    toDo: 0,
    inProgress: 0,
    completed: 0,
    completionRate: 0,
  },
  reducers: {
    addTodo: (state, action) => {
      const newTodo = {
        title: action.payload.title,
        description : action.payload.description,
        status: action.payload.status,
        priority: action.payload.priority,
        date: new Date().toLocaleDateString("de-DE"),
        id: Date.now() + Math.random(),
      };
      state.todos.push(newTodo);

      state.total++;
      if (newTodo.status === "To Do") {
        state.toDo++;
      } else if (newTodo.status === "In Progress") {
        state.inProgress++;
      } else if (newTodo.status === "Done") {
        state.completed++;
      }

      if (state.total > 0) {
        state.completionRate = Math.round(
          (state.completed / state.total) * 100
        );
      }
    },
    removeTodo: (state, action) => {
      const todoToRemove = state.todos.find(
        (todo) => todo.id === action.payload.id
      );

      if (!todoToRemove) return;

      state.total--;
      if (todoToRemove.status === "To Do") {
        state.toDo--;
      } else if (todoToRemove.status === "In Progress") {
        state.inProgress--;
      } else if (todoToRemove.status === "Done") {
        state.completed--;
      }

      state.todos = state.todos.filter((todo) => todo.id !== action.payload.id);

      if (state.total > 0) {
        state.completionRate = Math.round(
          (state.completed / state.total) * 100
        );
      } else {
        state.completionRate = 0;
      }
    },
    updateTodo: (state, action) => {
      const { id, title, description, status, priority } = action.payload;
      const todoToUpdate = state.todos.find((todo) => todo.id === id);

      if (!todoToUpdate) return;

      if (todoToUpdate.status !== status) {
        if (todoToUpdate.status === "To Do") state.toDo--;
        else if (todoToUpdate.status === "In Progress") state.inProgress--;
        else if (todoToUpdate.status === "Done") state.completed--;

        if (status === "To Do") state.toDo++;
        else if (status === "In Progress") state.inProgress++;
        else if (status === "Done") state.completed++;
      }

      todoToUpdate.title = title;
      todoToUpdate.description = description;
      todoToUpdate.status = status;
      todoToUpdate.priority = priority;

      if (state.total > 0) {
        state.completionRate = Math.round(
          (state.completed / state.total) * 100
        );
      }
    },
  },
});

export const { addTodo, removeTodo, updateTodo } = todoSlice.actions;
export default todoSlice.reducer;
