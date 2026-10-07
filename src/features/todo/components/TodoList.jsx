import {
  ensureCorrectDataUrl,
  formatFileSize,
  isImageFile,
} from '../utils/fileUtils'

export function TodoList({ todos, onToggle, onRemove, onPreview }) {
  return (
    <ul className="todo-list">
      {todos.length === 0 ? (
        <li className="todo-empty">Belum ada tugas yang dibuat.</li>
      ) : (
        todos.map((todo) => {
          const file = todo.file
            ? {
                ...todo.file,
                dataUrl: ensureCorrectDataUrl(
                  todo.file.dataUrl,
                  todo.file.name,
                  todo.file.type,
                ),
              }
            : null

          const isImage = isImageFile(file)

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

                {file && (
                  <div className="todo-attachment">
                    {isImage ? (
                      <div className="attachment-image-card">
                        <div
                          className="attachment-thumb-wrapper"
                          onClick={() => onPreview && onPreview(file)}
                          title="Klik untuk memperbesar gambar"
                        >
                          <img
                            src={file.dataUrl}
                            alt={file.name}
                            className="attachment-thumb"
                          />
                          <span className="thumb-zoom-hint" aria-hidden="true">
                            🔍
                          </span>
                        </div>

                        <div className="attachment-meta">
                          <div className="attachment-title-row">
                            <span
                              className="attachment-name clickable"
                              title={file.name}
                              onClick={() => onPreview && onPreview(file)}
                            >
                              {file.name}
                            </span>
                            <span className="file-type-tag image-tag">Gambar</span>
                          </div>
                          <span className="attachment-size">
                            {formatFileSize(file.size)}
                          </span>
                        </div>

                        <div className="attachment-actions-group">
                          {onPreview && (
                            <button
                              type="button"
                              className="attachment-action preview-btn"
                              onClick={() => onPreview(file)}
                              title="Lihat gambar penuh"
                            >
                              👁 Lihat
                            </button>
                          )}
                          <a
                            href={file.dataUrl}
                            download={file.name}
                            className="attachment-action download-btn"
                            title="Unduh gambar"
                          >
                            ⬇ Unduh
                          </a>
                        </div>
                      </div>
                    ) : (
                      <div className="attachment-doc-card">
                        <span
                          className="attachment-icon clickable"
                          aria-hidden="true"
                          onClick={() => onPreview && onPreview(file)}
                          title="Klik untuk pratinjau dokumen"
                        >
                          📄
                        </span>

                        <div className="attachment-meta">
                          <div className="attachment-title-row">
                            <span
                              className="attachment-name clickable"
                              title={file.name}
                              onClick={() => onPreview && onPreview(file)}
                            >
                              {file.name}
                            </span>
                            <span className="file-type-tag doc-tag">Dokumen</span>
                          </div>
                          <span className="attachment-size">
                            {formatFileSize(file.size)}
                          </span>
                        </div>

                        <div className="attachment-actions-group">
                          {onPreview && (
                            <button
                              type="button"
                              className="attachment-action preview-btn"
                              onClick={() => onPreview(file)}
                              title="Lihat dokumen"
                            >
                              👁 Lihat
                            </button>
                          )}
                          <a
                            href={file.dataUrl}
                            download={file.name}
                            className="attachment-action download-btn"
                            title="Unduh file"
                          >
                            ⬇ Unduh
                          </a>
                        </div>
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
