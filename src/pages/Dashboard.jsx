import styles from '../styles/dashboard.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { addTodo, updateTodo, removeTodo } from '../features/todo/todoSlice'
import { Plus, SquarePen, Trash2, Circle, CircleAlert, ArrowUp, X } from 'lucide-react'
import { useEffect, useState } from 'react'

const StatCard = ({ title, amount }) => {
  return (
    <div className={styles.statCard}>
      <h3 className={styles.statTitle}>{title}</h3>
      <p className={`${styles.statAmount} ${styles[title.split(" ").join("_").toLowerCase()]}`}>
        {amount}{title === "Completion Rate" && "%"}
      </p>
    </div>
  )
}

const TodoCard = ({ todo, openEditBox }) => {
  const dispatch = useDispatch()

  const CircleIcon = <Circle size="0.9rem" className={`${styles.priorityIcon} ${styles[todo.priority]}`} />
  const ArrowIcon = <ArrowUp size="0.9rem" className={`${styles.priorityIcon} ${styles[todo.priority]}`} />
  const ExclamationIcon = <CircleAlert size="0.9rem" className={`${styles.priorityIcon} ${styles[todo.priority]}`} />

  const handleDelete = () => {
    dispatch(removeTodo({ id: todo.id }))
  }

  return (
    <div className={styles.todoContainer}>
      <div className={styles.todoHeaderContainer}>
        <h4 className={styles.todoTitle}>{todo.title}</h4>
        <div className={styles.todoIconsContainer}>
          <button type="button" onClick={(e) => { e.preventDefault(); openEditBox(todo) }}>
            <SquarePen className={styles.editIcon} size="1rem" />
          </button>
          <button type="button" onClick={handleDelete}>
            <Trash2 className={styles.trashIcon} size="1rem" />
          </button>
        </div>
      </div>

      <div className={styles.todoDataContainer}>
        <p className={styles.todoDescription}>{todo.description}</p>
        <div className={styles.todoFooterContainer}>
          <div className={`${styles.todoPriorityContainer} ${styles[todo.priority]}`}>
            {todo.priority === "Low" && CircleIcon}
            {todo.priority === "Medium" && ArrowIcon}
            {todo.priority === "High" && ExclamationIcon}
            <span className={`${styles.priorityText} ${styles[todo.priority]}`}>{todo.priority}</span>
          </div>
          <p className={styles.todoDate}>{todo.date}</p>
        </div>
      </div>
    </div>
  )
}

const TodosWrapper = ({ title, openAddBox, openEditBox }) => {
  const theme = useSelector((state) => state.theme)

  const availableColors = {
    "To Do": {
      borderColor: theme === "light" ? "#bedbff" : "#193cb8",
      textColor: theme === "light" ? "#115dfc" : "#5196d3",
      backgroundColor: theme === "light" ? "#eff6ff" : "#162456"
    },
    "In Progress": {
      borderColor: theme === "light" ? "#fff085" : "#894b00",
      textColor: theme === "light" ? "#d98700" : "#fdc700",
      backgroundColor: theme === "light" ? "#fefce8" : "#432004"
    },
    "Done": {
      borderColor: theme === "light" ? "#b9f8cf" : "#016630",
      textColor: theme === "light" ? "#00a63e" : "#05df72",
      backgroundColor: theme === "light" ? "#f0fdf4" : "#032e15"
    }
  }

  const toDoTasks = useSelector((state) => state.todo.todos.filter((todo) => todo.status === "To Do"))
  const inProgressTasks = useSelector((state) => state.todo.todos.filter((todo) => todo.status === "In Progress"))
  const completedTasks = useSelector((state) => state.todo.todos.filter((todo) => todo.status === "Done"))

  const taskMap = {
    "To Do": toDoTasks,
    "In Progress": inProgressTasks,
    "Done": completedTasks
  }

  const selectedTask = taskMap[title]

  return (
    <div className={styles.todosWrapper} style={{ borderColor: availableColors[title].borderColor, backgroundColor: availableColors[title].backgroundColor }}>
      <header className={styles.todosWrapperHeader}>
        <h2 style={{ color: availableColors[title].textColor }}>
          {title}<span className={styles.amount}>{selectedTask.length}</span>
        </h2>
        <button
          type="button"
          className={styles.plusBtn}
          onClick={(e) => { e.preventDefault(); openAddBox(title) }}
        >
          <Plus size="1.05rem" />
        </button>
      </header>
      <div className={styles.content}>
        {selectedTask.length === 0 ? (
          <div className={styles.todoPlaceholder}>
            <p>No tasks yet</p>
            <p>Drop tasks here or click + to add</p>
          </div>
        ) : (
          selectedTask.map((todo) => (
            <TodoCard
              key={todo.id}
              todo={todo}
              openEditBox={openEditBox}
            />
          ))
        )}
      </div>
    </div>
  )
}

const AddOrEditTaskBox = ({ visibleTaskBox, setVisibleTaskBox, defaultStatus, editingTask }) => {
  const [title, setTitle] = useState(editingTask?.title || "")
  const [description, setDescription] = useState(editingTask?.description || "")
  const [status, setStatus] = useState(editingTask?.status || defaultStatus || "To Do")
  const [priority, setPriority] = useState(editingTask?.priority || "Medium")

  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
    setVisibleTaskBox(false)
    if (editingTask) {
      dispatch(updateTodo({ id: editingTask.id, title, description, status, priority }));
    } else {
      dispatch(addTodo({ title, description, status, priority }));
    }
  }

  useEffect(() => {
    if (visibleTaskBox) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }

    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [visibleTaskBox])

  return (
    <>
      <div className={styles.boxContainer}>
        <header className={styles.boxContainerHeader}>
          <p className={styles.boxTitle}>{editingTask ? "Edit Task" : "Create New Task"}</p>
          <button type="button" className={styles.xBtn} onClick={() => setVisibleTaskBox(false)}>
            <X className={styles.xIcon} />
          </button>
        </header>
        <form onSubmit={handleSubmit} className={styles.boxContainerForm}>
          <div className={styles.inputsContainer}>
            <fieldset className={styles.boxTodoTitleContainer}>
              <label htmlFor="title" className={styles.boxTodoLabel}>Title</label>
              <input type="text" id="title" className={styles.boxTodoInput} value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter task title..." required autoFocus />
            </fieldset>

            <fieldset className={styles.boxTodoDescriptionContainer}>
              <label htmlFor="description" className={styles.boxTodoLabel}>Description</label>
              <textarea id="description" className={styles.boxTodoInput} rows={3} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Enter task description..." required />
            </fieldset>

            <div className={styles.dropMenuContainer}>
              <fieldset className={styles.boxTodoStatusContainer}>
                <p className={styles.boxTodoLabel}>Status</p>
                <select name="status" value={status} onChange={e => setStatus(e.target.value)}>
                  <option value="To Do">To Do</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Done">Done</option>
                </select>
              </fieldset>

              <fieldset className={styles.boxTodoPriorityContainer}>
                <p className={styles.boxTodoLabel}>Priority</p>
                <select name="priority" value={priority} onChange={e => setPriority(e.target.value)}>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </fieldset>
            </div>
          </div>

          <fieldset className={styles.btnsContainer}>
            <button type="button" onClick={() => setVisibleTaskBox(false)} className={styles.cancelBtn}>Cancel</button>
            <button type="submit" className={styles.createBtn}>{editingTask ? "Update Task" : "Create Task"}</button>
          </fieldset>
        </form>
      </div>
      <div className={styles.overlayer} onClick={() => setVisibleTaskBox(false)}></div>
    </>
  )
}

const Dashboard = () => {
  const theme = useSelector(state => state.theme)
  const username = useSelector(state => state.auth.username)

  const totalTasksAmount = useSelector(state => state.todo.total)
  const inProgressTasksAmount = useSelector(state => state.todo.inProgress)
  const completedTasksAmount = useSelector(state => state.todo.completed)
  const completionRate = useSelector(state => state.todo.completionRate)

  const [visibleTaskBox, setVisibleTaskBox] = useState(false)
  const [defaultStatus, setDefaultStatus] = useState("To Do")
  const [editingTask, setEditingTask] = useState(null)

  const openAddBox = (status) => {
    setDefaultStatus(status)
    setEditingTask(null)
    setVisibleTaskBox(true)
  }

  const openEditBox = (task) => {
    setEditingTask(task)
    setVisibleTaskBox(true)
  }

  return (
    <main className={`${styles.page} ${theme === "dark" ? styles.darkPage : ""}`}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.pageTitle}>Welcome back, {username}!</h1>
          <p className={styles.subtitle}>Here's an overview of your tasks and projects.</p>
        </div>
        <div>
          <button
            type="button"
            className={styles.addTaskBtn}
            onClick={() => openAddBox("To Do")}
          >
            <Plus size="1.05rem" />
            Add Task
          </button>
        </div>
      </header>
      <section className={styles.contentContainer}>
        <section className={styles.statsContainer}>
          <StatCard title="Total Tasks" amount={totalTasksAmount} />
          <StatCard title="In Progress" amount={inProgressTasksAmount} />
          <StatCard title="Completed" amount={completedTasksAmount} />
          <StatCard title="Completion Rate" amount={completionRate} />
        </section>
        <section className={styles.todosContainer}>
          <TodosWrapper title="To Do" openAddBox={openAddBox} openEditBox={openEditBox} />
          <TodosWrapper title="In Progress" openAddBox={openAddBox} openEditBox={openEditBox} />
          <TodosWrapper title="Done" openAddBox={openAddBox} openEditBox={openEditBox} />
        </section>
      </section>
      {visibleTaskBox && <AddOrEditTaskBox visibleTaskBox={visibleTaskBox} setVisibleTaskBox={setVisibleTaskBox} defaultStatus={defaultStatus} editingTask={editingTask} />}
    </main>
  )
}

export default Dashboard
