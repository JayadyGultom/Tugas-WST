import { useEffect, useMemo, useState } from 'react'

const STORAGE_KEY = 'tugas-wst-todos'

const STORAGE_KEY = 'tugas-wst.todos'
const initialTodos = [
  { id: 1, text: 'Membuat struktur fitur React', done: true },
  { id: 2, text: 'Menyusun komponen feature', done: false },
  { id: 3, text: 'Menjalankan build verifikasi', done: false },
]

export function useTodos() {
  const [todos, setTodos] = useState(() => {
    const storedTodos = localStorage.getItem(STORAGE_KEY)

    if (!storedTodos) return initialTodos

    try {
      const parsedTodos = JSON.parse(storedTodos)
      return Array.isArray(parsedTodos) ? parsedTodos : initialTodos
    } catch {
      return initialTodos
    }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  const stats = useMemo(
    () => ({
      total: todos.length,
      completed: todos.filter((todo) => todo.done).length,
      active: todos.filter((todo) => !todo.done).length,
    }),
    [todos],
  )

  const addTodo = (text) => {
    const trimmed = text.trim()
    if (!trimmed) return

    setTodos((prev) => [
      ...prev,
      {
        id: Date.now(),
        text: trimmed,
        done: false,
      },
    ])
  }

  const toggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo,
      ),
    )
  }

  const removeTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }

  const clearCompleted = () => {
    setTodos((prev) => prev.filter((todo) => !todo.done))
  }

  return { todos, stats, addTodo, toggleTodo, removeTodo, clearCompleted }
}
