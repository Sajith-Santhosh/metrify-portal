import { useState } from 'react'
import useMeterData from './hooks/useMeterData'
import Header from './components/Header'
import Summary from './components/Summary'
import SearchBar from './components/SearchBar'
import MeterTable from './components/MeterTable'
import LoadingState from './components/LoadingState'
import EmptyState from './components/EmptyState'
import ErrorState from './components/ErrorState'
import './App.css'

const App = () => {
  const { loading, error, customer, meterExchanges } = useMeterData()
  const [search, setSearch] = useState('')
  const [searchField, setSearchField] = useState('meterId')
  const [actionFilter, setActionFilter] = useState(false)
  const [selectedProperty, setSelectedProperty] = useState(
    () => localStorage.getItem('selectedProperty') || 'all'
  )  
  const [darkMode, setDarkMode] = useState(false)
  const [visibleColumns, setVisibleColumns] = useState({
    location: true,
    meterId: true,
    status: true,
    actionRequired: true,
  })
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' })

  if (loading) return <LoadingState />
  if (error) return <ErrorState message={error} />

  // filter by selected property
  let filtered = selectedProperty === 'all'
    ? meterExchanges
    : meterExchanges.filter((mx) => mx.propertyId === selectedProperty)

  // filter by action required
  if (actionFilter) {
    filtered = filtered.filter((mx) => mx.status === 'Customer Data Awaiting')
  }

  // filter by search field
  if (search.trim()) {
    const q = search.toLowerCase()
    filtered = filtered.filter((mx) =>
      String(mx[searchField]).toLowerCase().includes(q)
    )
  }

  // sort
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

  const properties = customer.properties.map((p) => ({
    propertyId: p.propertyId,
    address: p.address,
  }))

  return (
    <div className={`app ${darkMode ? 'dark' : ''}`}>
      <Header
        customerName={customer.customer.name}
        properties={properties}
        selectedProperty={selectedProperty}
        onPropertyChange={(val) => {
          setSelectedProperty(val)
          localStorage.setItem('selectedProperty', val)
          setSearch('')
          setActionFilter(false)
        }}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode((prev) => !prev)}
      />
      <main className="main">
        <Summary
          meterExchanges={filtered}
          actionFilter={actionFilter}
          onActionFilterToggle={() => setActionFilter((prev) => !prev)}
        />
        <div className="search-row">
          <SearchBar
            value={search}
            onChange={setSearch}
            field={searchField}
            onFieldChange={(f) => { setSearchField(f); setSearch('') }}
          />
          <select
            className="column-visibility-select"
            value=""
            onChange={(e) => toggleColumn(e.target.value)}
          >
            <option value="" disabled>Show / Hide Columns</option>
            {['location', 'status', 'actionRequired'].map((col) => (
              <option key={col} value={col}>
                {visibleColumns[col] ? '● ' : '○ '}
                {col === 'actionRequired' ? 'Action Required' : col.charAt(0).toUpperCase() + col.slice(1)}
              </option>
            ))}
          </select>
        </div>
        {filtered.length === 0 ? (
          <EmptyState />
        ) : (
          <MeterTable
            meterExchanges={filtered}
            visibleColumns={visibleColumns}
            sortConfig={sortConfig}
            onSort={handleSort}
          />
        )}
      </main>
    </div>
  )
}

export default App