import { useRef, useState } from 'react'

const MAX_FILE_SIZE_BYTES = 1.5 * 1024 * 1024 // 1.5 MB limit for localStorage safety

function formatFileSize(bytes) {
  if (!bytes) return '0 B'
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export function TodoForm({ onAdd }) {
  const [value, setValue] = useState('')
  const [file, setFile] = useState(null)
  const [fileError, setFileError] = useState('')
  const fileInputRef = useRef(null)

  const handleFileChange = (event) => {
    const selectedFile = event.target.files?.[0]
    setFileError('')

    if (!selectedFile) {
      setFile(null)
      return
    }

    if (selectedFile.size > MAX_FILE_SIZE_BYTES) {
      setFileError('Ukuran file maksimal 1.5 MB.')
      if (fileInputRef.current) fileInputRef.current.value = ''
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      setFile({
        name: selectedFile.name,
        size: selectedFile.size,
        type: selectedFile.type,
        dataUrl: reader.result,
      })
    }
    reader.onerror = () => {
      setFileError('Gagal membaca file.')
    }
    reader.readAsDataURL(selectedFile)
  }

  const handleRemoveFile = () => {
    setFile(null)
    setFileError('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const trimmed = value.trim()

    if (!trimmed) return

    onAdd(trimmed, file)
    setValue('')
    setFile(null)
    setFileError('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <div className="todo-form-inputs">
        <input
          type="text"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder="Tambah tugas baru..."
          aria-label="Tambah tugas baru"
          className="todo-input"
        />

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: 'none' }}
          id="todo-file-input"
        />

        <button
          type="button"
          className={`file-btn ${file ? 'has-file' : ''}`}
          onClick={() => fileInputRef.current?.click()}
          title="Sisipkan file"
          aria-label="Sisipkan file"
        >
          <span className="file-icon" aria-hidden="true">📎</span>
          <span className="file-label">{file ? 'Ganti File' : 'Sisipkan File'}</span>
        </button>

        <button type="submit" className="submit-btn">Tambah</button>
      </div>

      {file && (
        <div className="file-chip">
          <span className="file-chip-info">
            <span className="file-chip-icon" aria-hidden="true">📄</span>
            <span className="file-chip-name">{file.name}</span>
            <span className="file-chip-size">({formatFileSize(file.size)})</span>
          </span>
          <button
            type="button"
            className="file-chip-remove"
            onClick={handleRemoveFile}
            title="Hapus lampiran"
            aria-label="Hapus lampiran file"
          >
            ✕
          </button>
        </div>
      )}

      {fileError && <p className="file-error">{fileError}</p>}
    </form>
  )
}
