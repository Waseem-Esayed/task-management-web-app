const initialState = {
  todos: [],
  total: 0,
  toDo: 0,
  inProgress: 0,
  completed: 0,
  completionRate: 0,
};

const newCompletionRate = ({ total, completed }) => {
  if (total > 0 && completed > 0) {
    return ((completed / total) * 100).toFixed(0);
  } else {
    return 0;
  }
};

export const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case "todo/addTodo": {
      const { title, description, status, priority } = action.payload;

      const toDo = status === "To Do" ? state.toDo + 1 : state.toDo;
      const inProgress =
        status === "In Progress" ? state.inProgress + 1 : state.inProgress;
      const completed =
        status === "Done" ? state.completed + 1 : state.completed;

      return {
        ...state,
        todos: [
          ...state.todos,
          {
            title,
            description,
            status,
            priority,
            date: (() => {
              const d = new Date();
              return `${d.getDate()}.${d.getMonth() + 1}.${d.getFullYear()}`;
            })(),
            id: Date.now() + Math.random(),
          },
        ],
        total: state.total + 1,
        toDo,
        inProgress,
        completed,
        completionRate: newCompletionRate({
          total: state.total + 1,
          completed,
        }),
      };
    }

    case "todo/removeTodo": {
      const { id } = action.payload;

      const todoToRemove = state.todos.find((todo) => todo.id === id);

      const updatedTodos = state.todos.filter((todo) => todo.id !== id);

      const toDo =
        todoToRemove?.status === "To Do" ? state.toDo - 1 : state.toDo;
      const inProgress =
        todoToRemove?.status === "In Progress"
          ? state.inProgress - 1
          : state.inProgress;
      const completed =
        todoToRemove?.status === "Done" ? state.completed - 1 : state.completed;

      const total = state.total - 1;

      return {
        ...state,
        todos: updatedTodos,
        total,
        toDo,
        inProgress,
        completed,
        completionRate: newCompletionRate({ total, completed }),
      };
    }

    case "todo/updateTodo": {
      const { id, title, description, status, priority } = action.payload;

      const todoToUpdate = state.todos.find((todo) => todo.id === id);
      if (!todoToUpdate) return state;

      // Zähler anpassen, falls Status geändert wurde
      let toDo = state.toDo;
      let inProgress = state.inProgress;
      let completed = state.completed;

      if (todoToUpdate.status !== status) {
        if (todoToUpdate.status === "To Do") toDo--;
        if (todoToUpdate.status === "In Progress") inProgress--;
        if (todoToUpdate.status === "Done") completed--;

        if (status === "To Do") toDo++;
        if (status === "In Progress") inProgress++;
        if (status === "Done") completed++;
      }

      const updatedTodos = state.todos.map((todo) =>
        todo.id === id
          ? { ...todo, title, description, status, priority }
          : todo
      );

      return {
        ...state,
        todos: updatedTodos,
        toDo,
        inProgress,
        completed,
        completionRate: newCompletionRate({
          total: state.total,
          completed,
        }),
      };
    }

    default:
      return state;
  }
};

// Action Creators
export const addTodo = (title, description, status, priority) => ({
  type: "todo/addTodo",
  payload: { title, description, status, priority },
});

export const removeTodo = ({ id }) => ({
  type: "todo/removeTodo",
  payload: { id },
});

export const updateTodo = ({ id, title, description, status, priority }) => ({
  type: "todo/updateTodo",
  payload: { id, title, description, status, priority },
});
