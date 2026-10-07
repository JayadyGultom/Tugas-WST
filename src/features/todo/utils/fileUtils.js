const IMAGE_EXTENSIONS = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'bmp', 'ico', 'avif']

const MIME_MAP = {
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  png: 'image/png',
  gif: 'image/gif',
  webp: 'image/webp',
  svg: 'image/svg+xml',
  bmp: 'image/bmp',
  ico: 'image/x-icon',
  avif: 'image/avif',
  pdf: 'application/pdf',
  txt: 'text/plain',
}

export function getFileExtension(filename = '') {
  if (!filename) return ''
  const parts = filename.split('.')
  return parts.length > 1 ? parts.pop().toLowerCase() : ''
}

export function getMimeType(file) {
  if (file?.type && file.type.trim() !== '' && file.type !== 'application/octet-stream') {
    return file.type.toLowerCase()
  }
  const ext = getFileExtension(file?.name)
  return MIME_MAP[ext] || file?.type || 'application/octet-stream'
}

export function isImageFile(file) {
  if (!file) return false
  const type = (file.type || '').toLowerCase()
  if (type.startsWith('image/')) return true
  const ext = getFileExtension(file.name)
  if (IMAGE_EXTENSIONS.includes(ext)) return true
  if (typeof file.dataUrl === 'string' && file.dataUrl.startsWith('data:image/')) return true
  return false
}

export function isPdfFile(file) {
  if (!file) return false
  const type = (file.type || '').toLowerCase()
  if (type === 'application/pdf') return true
  const ext = getFileExtension(file.name)
  if (ext === 'pdf') return true
  if (typeof file.dataUrl === 'string' && file.dataUrl.startsWith('data:application/pdf')) return true
  return false
}

export function formatFileSize(bytes) {
  if (!bytes) return '0 B'
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export function ensureCorrectDataUrl(dataUrl, filename, mimeType) {
  if (!dataUrl || typeof dataUrl !== 'string') return dataUrl
  const ext = getFileExtension(filename)
  const resolvedMime = mimeType || MIME_MAP[ext]

  if (
    resolvedMime &&
    (dataUrl.startsWith('data:;') ||
      dataUrl.startsWith('data:application/octet-stream;') ||
      dataUrl.startsWith('data:,') ||
      (resolvedMime.startsWith('image/') && !dataUrl.startsWith('data:image/')))
  ) {
    return dataUrl.replace(/^data:[^;]*/, `data:${resolvedMime}`)
  }
  return dataUrl
}
