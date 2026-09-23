import { useTodos } from './hooks/useTodos'
import { TodoForm } from './components/TodoForm'
import { TodoList } from './components/TodoList'
import './TodoFeature.css'

export function TodoFeature() {
  const { todos, stats, addTodo, toggleTodo, removeTodo } = useTodos()

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

        <TodoList todos={todos} onToggle={toggleTodo} onRemove={removeTodo} />
      </section>
    </main>
  )
}
