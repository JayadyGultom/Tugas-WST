import { useEffect } from 'react'
import {
  ensureCorrectDataUrl,
  formatFileSize,
  isImageFile,
  isPdfFile,
} from '../utils/fileUtils'

export function FilePreviewModal({ file, onClose }) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  if (!file) return null

  const normalizedDataUrl = ensureCorrectDataUrl(
    file.dataUrl,
    file.name,
    file.type,
  )
  const isImage = isImageFile(file)
  const isPdf = isPdfFile(file)

  return (
    <div
      className="modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="preview-modal-title"
    >
      <div
        className="modal-container"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="modal-header">
          <div className="modal-header-info">
            <h3 id="preview-modal-title" className="modal-title">
              {file.name}
            </h3>
            <span className="modal-subtitle">
              {formatFileSize(file.size)} &bull; {isImage ? 'Gambar' : (file.type || 'Dokumen')}
            </span>
          </div>
          <button
            type="button"
            className="modal-close-icon"
            onClick={onClose}
            aria-label="Tutup preview"
          >
            ✕
          </button>
        </div>

        <div className="modal-body">
          {isImage && (
            <div className="modal-image-wrapper">
              <img
                src={normalizedDataUrl}
                alt={file.name}
                className="modal-image"
              />
            </div>
          )}

          {isPdf && (
            <div className="modal-pdf-wrapper">
              <iframe
                src={file.dataUrl}
                title={file.name}
                className="modal-pdf-frame"
              />
            </div>
          )}

          {!isImage && !isPdf && (
            <div className="modal-fallback">
              <span className="modal-fallback-icon" aria-hidden="true">
                📄
              </span>
              <p className="modal-fallback-name">{file.name}</p>
              <p className="modal-fallback-hint">
                Pratinjau langsung tidak tersedia untuk format ini. Anda dapat mengunduh file untuk membukanya.
              </p>
            </div>
          )}
        </div>

        <div className="modal-footer">
          <a
            href={file.dataUrl}
            download={file.name}
            className="modal-action-download"
          >
            ⬇ Unduh File
          </a>
          <button
            type="button"
            className="modal-action-close"
            onClick={onClose}
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  )
}
