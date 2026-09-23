const filters = [
  { value: 'all', label: 'Semua' },
  { value: 'active', label: 'Aktif' },
  { value: 'completed', label: 'Selesai' },
]

export function TodoFilters({ activeFilter, onChange }) {
  return (
    <div className="todo-filters" aria-label="Filter tugas">
      {filters.map((filter) => (
        <button
          key={filter.value}
          type="button"
          className={activeFilter === filter.value ? 'active' : ''}
          onClick={() => onChange(filter.value)}
          aria-pressed={activeFilter === filter.value}
        >
          {filter.label}
        </button>
      ))}
    </div>
  )
}