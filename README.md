
# Metrify MFH - Meter Exchange Portal

A React-based customer portal for tracking meter exchange statuses across properties.

## About This Project

This is a **case study submission** for a Fullstack SWE Intern position. The application helps customers (Metrify MFH) understand the status of their meter exchanges (meter replacements) across multiple properties.

**Development Environment:** GitHub Codespaces (cloud-based)

## Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool
- **CSS Variables** - Dark mode theming
- **Docker** - Containerization
- **Mock API** - Simulated REST endpoints with local JSON

## Quick Start

### Prerequisites
- Node.js 18+ 
- Git 
- Docker (optional) 

### Option 1: Run Locally (npm)

```bash
cd metrify-portal/frontend
npm install
npm run dev
```

Open http://localhost:5173

### Option 2: Run with Docker

```bash
cd metrify-portal
docker compose up --build
```

Open http://localhost:8080

### Option 3: GitHub Codespaces (Cloud)

1. Go to your repo on GitHub
2. Click **<> Code** → **Codespaces** → **Create codespace on main**
3. Wait for environment to load
4. Run:
```bash
   cd frontend
   npm install
   npm run dev
```
5. Click **"Open in Browser"** when prompted
6. Make port visibility **Public** if testing with others

## Features

- 🔍 **Search** by Meter ID, Location, or Status
- 📍 **Filter** by property or action required
- ⬆️ **Sort** by Meter ID, Status, or Property
- 👁️ **Column Visibility** toggle
- 🌙 **Dark Mode**
- 📱 **Responsive Design**
- ⚡ **State Management** - Loading, empty, error states
- 💾 **Persistent Selection** - Property choice saved to localStorage

## Project Structure
metrify-portal/

├── README.md

├── docker-compose.yml

├── frontend/

│   ├── Dockerfile

│   ├── package.json

│   └── src/

│       ├── components/       # UI components

│       ├── hooks/            # Custom React hooks

│       ├── services/         # Mock API layer

│       ├── styles/           # Modular CSS

│       ├── data/             # Mock JSON data

│       └── App.jsx

## Usage

### Search
1. Select search field (Meter ID, Location, or Status)
2. Type to filter results

### Filter by Property
Click property dropdown in header to view specific property data

### Filter by Action Required
Click the "Action Required" summary card to show only meters awaiting customer action

### Dark Mode
Click the moon/sun icon in the top right corner

### Show/Hide Columns
Use the "Show / Hide Columns" dropdown to toggle column visibility (Meter ID cannot be hidden)

### Sort
Click column headers to sort. Click again to reverse sort order.

## How It Works

This app uses a **mock API** with local JSON files instead of a real backend. The `mockApi.js` service layer simulates real REST endpoints:

- `getCustomer(customerId)` → simulates GET /customers/{customerId}/properties
- `getMeterExchanges(propertyId)` → simulates GET /properties/{propertyId}/meter-exchanges

To swap to a real backend, only `src/services/mockApi.js` needs to change. All components remain identical.

## Testing

The app includes built-in states for testing:

- **Loading state** - Shows briefly on page load (500ms artificial delay)
- **Empty state** - Search for non-existent data to see empty state
- **Error state** - Temporarily break mockApi.js to test error handling

## Development Notes

- Developed in GitHub Codespaces
- Not yet tested on local machine
- All instructions should work identically for local setup and Codespaces
- Mock data includes 3 properties with ~35 total meters


## Future Improvements

- Real backend integration
- Unit tests (Jest)
- Advanced search (fuzzy matching)
- CSV/PDF export
- Pagination
- Analytics

## Author

Sajith Santhosh

## License

MIT
