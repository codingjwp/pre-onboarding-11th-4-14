import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import SearchProvider from './api/SearchInterface.tsx'
import httpClient from './api/useHttpClient.tsx'


ReactDOM.createRoot(document.getElementById('root')!).render(
    <SearchProvider httpClient={httpClient}>
      <App />
    </SearchProvider>
)
