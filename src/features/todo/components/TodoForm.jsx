import { useState } from 'react'

export function TodoForm({ onAdd }) {
  const [value, setValue] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    const trimmed = value.trim()

    if (!trimmed) return

    onAdd(trimmed)
    setValue('')
  }

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Tambah tugas baru"
        aria-label="Tambah tugas baru"
      />
      <button type="submit">Tambah</button>
    </form>
  )
}
