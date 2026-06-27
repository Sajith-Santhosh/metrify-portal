const SEARCH_FIELDS = [
  { value: 'meterId', label: 'Meter ID', placeholder: 'Enter Meter ID...' },
  { value: 'location', label: 'Location', placeholder: 'Enter floor location (e.g. Ground floor right)...' },
  { value: 'status', label: 'Status', placeholder: 'Enter status...' },
]

const SearchBar = ({ value, onChange, field, onFieldChange }) => {
  const selected = SEARCH_FIELDS.find((f) => f.value === field) || SEARCH_FIELDS[0]

  return (
    <div className="search-bar">
      <select value={field} onChange={(e) => onFieldChange(e.target.value)}>
        {SEARCH_FIELDS.map((f) => (
          <option key={f.value} value={f.value}>
            {f.label}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder={selected.placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}

export default SearchBar