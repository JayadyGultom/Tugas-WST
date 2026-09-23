export function TodoList({ todos, onToggle, onRemove }) {
  return (
    <ul className="todo-list">
      {todos.length === 0 ? (
        <li className="todo-empty">Belum ada tugas yang dibuat.</li>
      ) : (
        todos.map((todo) => (
          <li key={todo.id} className={`todo-item ${todo.done ? 'done' : ''}`}>
            <label className="todo-check">
              <input
                type="checkbox"
                checked={todo.done}
                onChange={() => onToggle(todo.id)}
              />
              <span>{todo.text}</span>
            </label>

            <button type="button" className="remove-btn" onClick={() => onRemove(todo.id)}>
              Hapus
            </button>
          </li>
        ))
      )}
    </ul>
  )
}
