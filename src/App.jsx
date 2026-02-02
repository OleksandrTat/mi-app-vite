import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [apiData, setApiData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Función para probar el Cloudflare Worker
  const testWorkerFunction = async () => {
    setLoading(true)
    setError(null)
    
    try {
      // Llama al worker en /api
      const response = await fetch('/api')
      
      if (!response.ok) {
        throw new Error('Error al llamar al Worker')
      }
      
      const data = await response.json()
      setApiData(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

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

      {/* SECCIÓN EXTRA: Demo del Cloudflare Worker */}
      <div className="worker-section">
        <h2>🔥 Cloudflare Worker Function (EXTRA)</h2>
        <p>Esta función serverless:</p>
        <ul>
          <li>✨ Se ejecuta en el edge (cerca del usuario)</li>
          <li>🌐 Llama a una API externa (Random User API)</li>
          <li>⚡ Procesa datos en tiempo real</li>
          <li>🚀 Sin servidor que gestionar</li>
        </ul>
        
        <button 
          onClick={testWorkerFunction} 
          disabled={loading}
          className="worker-button"
        >
          {loading ? 'Cargando...' : '🎲 Probar Worker Function'}
        </button>

        {error && (
          <div className="error-box">
            ❌ Error: {error}
          </div>
        )}

        {apiData && (
          <div className="api-result">
            <h3>Resultado del Worker:</h3>
            <div className="user-card">
              <img src={apiData.usuarioAleatorio.foto} alt="Usuario aleatorio" />
              <div>
                <p><strong>Nombre:</strong> {apiData.usuarioAleatorio.nombre}</p>
                <p><strong>Email:</strong> {apiData.usuarioAleatorio.email}</p>
                <p><strong>País:</strong> {apiData.usuarioAleatorio.pais}</p>
                <p><strong>Ciudad:</strong> {apiData.usuarioAleatorio.ciudad}</p>
                <p><strong>Edad:</strong> {apiData.usuarioAleatorio.edad} años</p>
              </div>
            </div>
            
            <div className="worker-info">
              <h4>📊 Info del Edge Computing:</h4>
              <p><strong>País del usuario:</strong> {apiData.workerInfo.paisUsuario}</p>
              <p><strong>Cloudflare Ray ID:</strong> {apiData.workerInfo.cloudflareRay}</p>
              <p><strong>Servidor:</strong> {apiData.workerInfo.servidor}</p>
            </div>
            
            <details className="full-response">
              <summary>Ver respuesta completa del Worker</summary>
              <pre>{JSON.stringify(apiData, null, 2)}</pre>
            </details>
          </div>
        )}
      </div>
      
      <footer>
        <p>Proyecto creado con Vite + React</p>
        <p>Desplegado con CI/CD pipeline</p>
        <p>Worker Function disponible en: <code>/api</code></p>
      </footer>
    </>
  )
}

export default App