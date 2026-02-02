// functions/api.js
// Esta es una Cloudflare Function que se ejecuta en el edge
// Accesible en: https://tu-sitio.pages.dev/api

export async function onRequest(context) {
  // Obtener información del contexto
  const { request, env } = context;
  
  // Obtener información de la solicitud
  const url = new URL(request.url);
  const userAgent = request.headers.get('user-agent') || 'Desconocido';
  
  // Crear respuesta JSON
  const responseData = {
    mensaje: "¡Hola desde Cloudflare Workers! 🚀",
    timestamp: new Date().toISOString(),
    proyecto: "M614A3 - CI/CD con GitHub Actions y Cloudflare",
    info: {
      metodo: request.method,
      ruta: url.pathname,
      navegador: userAgent,
      servidor: "Cloudflare Edge Network"
    },
    caracteristicas: [
      "Ejecución en el edge (cerca del usuario)",
      "Latencia ultra-baja",
      "Escalado automático",
      "Sin gestión de servidores"
    ]
  };

  // Retornar respuesta JSON con CORS headers
  return new Response(
    JSON.stringify(responseData, null, 2),
    {
      headers: {
        "content-type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    }
  );
}