function formatFileSize(bytes) {
  if (!bytes) return '0 B'
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export function TodoList({ todos, onToggle, onRemove }) {
  return (
    <ul className="todo-list">
      {todos.length === 0 ? (
        <li className="todo-empty">Belum ada tugas yang dibuat.</li>
      ) : (
        todos.map((todo) => {
          const isImage = todo.file?.type?.startsWith('image/')

          return (
            <li key={todo.id} className={`todo-item ${todo.done ? 'done' : ''}`}>
              <div className="todo-item-content">
                <label className="todo-check">
                  <input
                    type="checkbox"
                    checked={todo.done}
                    onChange={() => onToggle(todo.id)}
                  />
                  <span>{todo.text}</span>
                </label>

                {todo.file && (
                  <div className="todo-attachment">
                    {isImage ? (
                      <div className="attachment-image-card">
                        <img
                          src={todo.file.dataUrl}
                          alt={todo.file.name}
                          className="attachment-thumb"
                        />
                        <div className="attachment-meta">
                          <span className="attachment-name" title={todo.file.name}>
                            {todo.file.name}
                          </span>
                          <span className="attachment-size">
                            {formatFileSize(todo.file.size)}
                          </span>
                          <a
                            href={todo.file.dataUrl}
                            download={todo.file.name}
                            className="attachment-action"
                            title="Unduh gambar"
                          >
                            ⬇ Unduh
                          </a>
                        </div>
                      </div>
                    ) : (
                      <div className="attachment-doc-card">
                        <span className="attachment-icon" aria-hidden="true">
                          📄
                        </span>
                        <div className="attachment-meta">
                          <span className="attachment-name" title={todo.file.name}>
                            {todo.file.name}
                          </span>
                          <span className="attachment-size">
                            {formatFileSize(todo.file.size)}
                          </span>
                        </div>
                        <a
                          href={todo.file.dataUrl}
                          download={todo.file.name}
                          className="attachment-action"
                          title="Unduh file"
                        >
                          ⬇ Unduh
                        </a>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <button
                type="button"
                className="remove-btn"
                onClick={() => onRemove(todo.id)}
              >
                Hapus
              </button>
            </li>
          )
        })
      )}
    </ul>
  )
}
