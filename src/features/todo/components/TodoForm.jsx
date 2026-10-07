import { useRef, useState } from 'react'
import {
  ensureCorrectDataUrl,
  formatFileSize,
  getMimeType,
  isImageFile,
} from '../utils/fileUtils'

const MAX_FILE_SIZE_BYTES = 1.5 * 1024 * 1024 // 1.5 MB limit for localStorage safety

export function TodoForm({ onAdd, onPreview }) {
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

    const resolvedType = getMimeType(selectedFile)
    const reader = new FileReader()

    reader.onload = () => {
      const fixedDataUrl = ensureCorrectDataUrl(
        reader.result,
        selectedFile.name,
        resolvedType,
      )

      setFile({
        name: selectedFile.name,
        size: selectedFile.size,
        type: resolvedType,
        dataUrl: fixedDataUrl,
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

  const isImage = isImageFile(file)

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
          accept="image/*,.pdf,.doc,.docx,.txt"
        />

        <button
          type="button"
          className={`file-btn ${file ? 'has-file' : ''}`}
          onClick={() => fileInputRef.current?.click()}
          title="Sisipkan file atau gambar"
          aria-label="Sisipkan file"
        >
          <span className="file-icon" aria-hidden="true">📎</span>
          <span className="file-label">{file ? 'Ganti File' : 'Sisipkan File'}</span>
        </button>

        <button type="submit" className="submit-btn">Tambah</button>
      </div>

      {file && (
        <div className="form-preview-card">
          <div className="form-preview-media">
            {isImage ? (
              <div className="form-preview-thumb-box">
                <img
                  src={file.dataUrl}
                  alt={file.name}
                  className="form-preview-thumb"
                  onClick={() => onPreview && onPreview(file)}
                  title="Klik untuk memperbesar gambar"
                />
              </div>
            ) : (
              <div className="form-preview-doc-box">
                <span className="form-preview-doc-icon" aria-hidden="true">
                  📄
                </span>
              </div>
            )}

            <div className="form-preview-details">
              <div className="form-preview-title-row">
                <span className="form-preview-name" title={file.name}>
                  {file.name}
                </span>
                <span className={`file-type-tag ${isImage ? 'image-tag' : 'doc-tag'}`}>
                  {isImage ? 'Gambar' : 'Dokumen'}
                </span>
              </div>
              <span className="form-preview-size">
                {formatFileSize(file.size)}
              </span>
            </div>
          </div>

          <div className="form-preview-actions">
            {onPreview && (
              <button
                type="button"
                className="form-preview-view-btn"
                onClick={() => onPreview(file)}
                title="Lihat pratinjau penuh"
              >
                👁 Lihat
              </button>
            )}
            <button
              type="button"
              className="form-preview-remove-btn"
              onClick={handleRemoveFile}
              title="Hapus lampiran"
              aria-label="Hapus lampiran file"
            >
              ✕ Hapus
            </button>
          </div>
        </div>
      )}

      {fileError && <p className="file-error">{fileError}</p>}
    </form>
  )
}
