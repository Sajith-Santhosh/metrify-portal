import { useState } from 'react'

const useFilters = (meterExchanges) => {
  const [search, setSearch] = useState('')
  const [searchField, setSearchField] = useState('meterId')
  const [actionFilter, setActionFilter] = useState(false)
  const [selectedProperty, setSelectedProperty] = useState(
    () => localStorage.getItem('selectedProperty') || 'all'
  )
  const [visibleColumns, setVisibleColumns] = useState({
    location: true,
    meterId: true,
    status: true,
    actionRequired: true,
  })
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' })

  let filtered = selectedProperty === 'all'
    ? meterExchanges
    : meterExchanges.filter((mx) => mx.propertyId === selectedProperty)

  if (actionFilter) {
    filtered = filtered.filter((mx) => mx.status === 'Customer Data Awaiting')
  }

  if (search.trim()) {
    const q = search.toLowerCase()
    filtered = filtered.filter((mx) =>
      String(mx[searchField]).toLowerCase().includes(q)
    )
  }

  if (sortConfig.key) {
    filtered = [...filtered].sort((a, b) => {
      const aVal = String(a[sortConfig.key] ?? '').toLowerCase()
      const bVal = String(b[sortConfig.key] ?? '').toLowerCase()
      if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1
      if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1
      return 0
    })
  }

  const handleSort = (key) => {
    setSortConfig((prev) =>
      prev.key === key
        ? { key, direction: prev.direction === 'asc' ? 'desc' : 'asc' }
        : { key, direction: 'asc' }
    )
  }

  const toggleColumn = (col) => {
    if (col === 'meterId') return
    setVisibleColumns((prev) => ({ ...prev, [col]: !prev[col] }))
  }

  const handlePropertyChange = (val) => {
    setSelectedProperty(val)
    localStorage.setItem('selectedProperty', val)
    setSearch('')
    setActionFilter(false)
  }

  return {
    search, setSearch,
    searchField, setSearchField,
    actionFilter, setActionFilter,
    selectedProperty, handlePropertyChange,
    visibleColumns, toggleColumn,
    sortConfig, handleSort,
    filtered,
  }
}

export default useFilters