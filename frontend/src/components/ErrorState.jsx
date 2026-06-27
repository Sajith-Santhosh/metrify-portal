const ErrorState = ({ message }) => {
  return (
    <div className="state-container error">
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10"/>
        <line x1="12" y1="8" x2="12" y2="12"/>
        <line x1="12" y1="16" x2="12.01" y2="16"/>
      </svg>
      <h2>Unable to load meter data</h2>
      <p>There was a problem connecting to the API. Please try refreshing the page.</p>
      <span className="error-detail">{message}</span>
    </div>
  )
}

export default ErrorState