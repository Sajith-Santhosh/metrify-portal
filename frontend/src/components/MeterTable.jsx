const STATUS_ORDER = [
  'Customer Data Awaiting',
  'Customer Data Submitted',
  'Installation Scheduled',
  'Installation Completed',
  'First Measurement Received',
]

const SortIcon = ({ column, sortConfig }) => {
  if (sortConfig.key !== column) return <span className="sort-icon">↕</span>
  return <span className="sort-icon">{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
}

const MeterTable = ({ meterExchanges, visibleColumns, sortConfig, onSort }) => {
  return (
    <div className="table-wrapper">
      <table className="meter-table">
        <thead>
          <tr>
            <th onClick={() => onSort('meterId')} className="sortable">
              Meter ID <SortIcon column="meterId" sortConfig={sortConfig} />
            </th>
            {visibleColumns.status && (
              <th onClick={() => onSort('status')} className="sortable">
                Status <SortIcon column="status" sortConfig={sortConfig} />
              </th>
            )}
            {visibleColumns.location && <th>Location</th>}
            {visibleColumns.actionRequired && <th>Action Required</th>}
          </tr>
        </thead>
        <tbody>
          {meterExchanges.map((mx) => {
            const needsAction = mx.status === 'Customer Data Awaiting'
            return (
              <tr key={mx.id} className={needsAction ? 'row-action' : ''}>
                <td>{mx.meterId}</td>
                {visibleColumns.status && (
                  <td>
                    <span className={`status-badge status-${STATUS_ORDER.indexOf(mx.status)}`}>
                      {mx.status}
                    </span>
                  </td>
                )}
                {visibleColumns.location && <td>{mx.location}</td>}
                {visibleColumns.actionRequired && (
                  <td>
                    <span className={`action-badge ${needsAction ? 'action-yes' : 'action-no'}`}>
                      {needsAction ? 'Yes' : 'No'}
                    </span>
                  </td>
                )}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default MeterTable