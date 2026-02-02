import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="header">
        <h1>🚀 Mi Proyecto de Despliegue CI/CD</h1>
        <h2>M614A3 - Desarrollo de Aplicaciones Web</h2>
        <p className="subtitle">Despliegue automatizado con GitHub Actions y Cloudflare Pages</p>
      </div>
      
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          Contador de clicks: {count}
        </button>
        <p>
          Edita <code>src/App.jsx</code> y guarda para recargar automáticamente.
        </p>
      </div>
      
      <div className="features">
        <div className="feature-card">
          <h3>✅ GitHub Actions</h3>
          <p>Build y deploy automático</p>
        </div>
        <div className="feature-card">
          <h3>🌍 Cloudflare CDN</h3>
          <p>Distribuido globalmente</p>
        </div>
        <div className="feature-card">
          <h3>⚡ Vite + React</h3>
          <p>Desarrollo ultrarrápido</p>
        </div>
      </div>
      
      <footer>
        <p>Proyecto creado con Vite + React</p>
        <p>Desplegado con CI/CD pipeline</p>
      </footer>
    </>
  )
}

export default App