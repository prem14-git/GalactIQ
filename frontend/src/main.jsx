import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import axios from 'axios'

// Configure axios base URL for API calls
// In dev, leave blank to use Vite proxy with explicit /api paths
// In prod (Firebase), set VITE_API_BASE_URL to your Render backend origin, e.g. https://your-backend.onrender.com
axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL || ''

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
