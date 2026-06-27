import { useState } from 'react'
import useMeterData from './hooks/useMeterData'
import useFilters from './hooks/useFilters'
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
  const [darkMode, setDarkMode] = useState(false)

  const {
    search, setSearch,
    searchField, setSearchField,
    actionFilter, setActionFilter,
    selectedProperty, handlePropertyChange,
    visibleColumns, toggleColumn,
    sortConfig, handleSort,
    filtered,
  } = useFilters(meterExchanges)

  if (loading) return <LoadingState />
  if (error) return <ErrorState message={error} />

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
        onPropertyChange={handlePropertyChange}
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