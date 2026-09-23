import { useMemo, useState } from 'react'
import { useTodos } from './hooks/useTodos'
import { TodoForm } from './components/TodoForm'
import { TodoFilters } from './components/TodoFilters'
import { TodoList } from './components/TodoList'
import './TodoFeature.css'

export function TodoFeature() {
  const [activeFilter, setActiveFilter] = useState('all')
  const { todos, stats, addTodo, toggleTodo, removeTodo, clearCompleted } = useTodos()
  const visibleTodos = useMemo(() => {
    if (activeFilter === 'active') return todos.filter((todo) => !todo.done)
    if (activeFilter === 'completed') return todos.filter((todo) => todo.done)
    return todos
  }, [activeFilter, todos])

  return (
    <main className="todo-feature">
      <section className="todo-card">
        <div className="todo-header">
          <div>
            <p className="feature-label">Todo Feature</p>
            <h2>Daftar tugas</h2>
          </div>

          <div className="stats">
            <span>{stats.completed}/{stats.total} selesai</span>
          </div>
        </div>

        <TodoForm onAdd={addTodo} />

        <div className="summary">
          <span>Total: {stats.total}</span>
          <span>Aktif: {stats.active}</span>
          <span>Selesai: {stats.completed}</span>
        </div>

        <div className="todo-toolbar">
          <TodoFilters activeFilter={activeFilter} onChange={setActiveFilter} />
          <button
            type="button"
            className="clear-completed"
            onClick={clearCompleted}
            disabled={stats.completed === 0}
          >
            Bersihkan selesai
          </button>
        </div>

        <TodoList todos={visibleTodos} onToggle={toggleTodo} onRemove={removeTodo} />
      </section>
    </main>
  )
}
