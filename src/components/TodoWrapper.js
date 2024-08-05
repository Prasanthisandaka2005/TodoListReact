import React, { useState, useEffect } from "react"
import { Todo } from "./Todo"
import { TodoForm } from "./TodoForm"
import { v4 as uuidv4 } from "uuid"
import { EditTodoForm } from "./EditTodoForm"

export const TodoWrapper = () => {
  const [todos, setTodos] = useState([])

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem('todos')) || []
    setTodos(savedTodos)
  }, [])

  const addTodo = (todo) => {
    const newTodos = [
      ...todos,
      { id: uuidv4(), task: todo, completed: false, isEditing: false },
    ]
    setTodos(newTodos)
    localStorage.setItem('todos', JSON.stringify(newTodos))
  }

  const deleteTodo = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id)
    setTodos(newTodos)
    localStorage.setItem('todos', JSON.stringify(newTodos))
  }

  const toggleComplete = (id) => {
    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    )
    setTodos(newTodos)
    localStorage.setItem('todos', JSON.stringify(newTodos))
  }

  const editTodo = (id) => {
    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
    )
    setTodos(newTodos)
    localStorage.setItem('todos', JSON.stringify(newTodos))
  }

  const editTask = (task, id) => {
    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo
    )
    setTodos(newTodos)
    localStorage.setItem('todos', JSON.stringify(newTodos))
  }

  return (
    <div className="TodoWrapper">
      <h1>Get Things Done !</h1>
      <TodoForm addTodo={addTodo} />
      {todos.map((todo) =>
        todo.isEditing ? (
          <EditTodoForm editTodo={editTask} task={todo} key={todo.id} />
        ) : (
          <Todo
            key={todo.id}
            task={todo}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
            toggleComplete={toggleComplete}
          />
        )
      )}
    </div>
  )
}
