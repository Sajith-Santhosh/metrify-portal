const Summary = ({ meterExchanges, actionFilter, onActionFilterToggle }) => {
  const total = meterExchanges.length
  const actionRequired = meterExchanges.filter(
    (mx) => mx.status === 'Customer Data Awaiting'
  ).length

  return (
    <div className="summary">
      <div className="summary-card">
        <span className="summary-number">{total}</span>
        <span className="summary-label">Total Meters</span>
      </div>
      <div
        className={`summary-card action ${actionFilter ? 'active-filter' : ''}`}
        onClick={onActionFilterToggle}
        title="Click to filter by action required"
      >
        <span className="summary-number">{actionRequired}</span>
        <span className="summary-label">Action Required</span>
        <span className="filter-hint">{actionFilter ? '✕ Clear' : 'Click to filter'}</span>
      </div>
    </div>
  )
}

export default Summary