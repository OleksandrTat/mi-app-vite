// functions/api.js
// Esta es una Cloudflare Worker Function que:
// 1. Se ejecuta en el edge (cerca del usuario)
// 2. Llama a una API externa pública (Random User API)
// 3. Procesa los datos
// 4. Los devuelve con información adicional del worker
//
// Accesible en: https://tu-sitio.pages.dev/api

export async function onRequest(context) {
  const { request } = context;
  
  // Manejar CORS preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  }

  try {
    // ¡Esta función llama a una API REAL externa!
    // Usamos la Random User API (https://randomuser.me)
    const apiResponse = await fetch('https://randomuser.me/api/');
    
    if (!apiResponse.ok) {
      throw new Error('Error al llamar a la API externa');
    }
    
    const userData = await apiResponse.json();
    const user = userData.results[0];
    
    // Obtener información del worker
    const url = new URL(request.url);
    const userAgent = request.headers.get('user-agent') || 'Desconocido';
    const cfRay = request.headers.get('cf-ray') || 'N/A';
    const cfCountry = request.headers.get('cf-ipcountry') || 'Desconocido';
    
    // Procesar y formatear los datos
    const responseData = {
      mensaje: "¡Worker Function funcionando! 🚀",
      timestamp: new Date().toISOString(),
      proyecto: "M614A3 - CI/CD con GitHub Actions y Cloudflare",
      
      // Datos obtenidos de la API externa
      usuarioAleatorio: {
        nombre: `${user.name.first} ${user.name.last}`,
        email: user.email,
        pais: user.location.country,
        ciudad: user.location.city,
        foto: user.picture.medium,
        edad: user.dob.age
      },
      
      // Información del Worker
      workerInfo: {
        metodo: request.method,
        ruta: url.pathname,
        navegador: userAgent.substring(0, 50) + '...',
        cloudflareRay: cfRay,
        paisUsuario: cfCountry,
        servidor: "Cloudflare Edge Network - 300+ ubicaciones globales"
      },
      
      caracteristicas: [
        "✅ Llama a API externa (randomuser.me)",
        "✅ Ejecutado en el edge (baja latencia)",
        "✅ Sin servidor que gestionar (serverless)",
        "✅ Escalado automático global",
        "✅ CORS habilitado para uso desde el frontend"
      ],
      
      nota: "Esta función demuestra un Worker real que consulta una API externa, procesa datos, y añade información del edge computing de Cloudflare."
    };

    // Retornar respuesta con CORS
    return new Response(
      JSON.stringify(responseData, null, 2),
      {
        headers: {
          "content-type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
          "Cache-Control": "no-cache", // No cachear para ver datos frescos
        },
      }
    );
    
  } catch (error) {
    // Manejo de errores
    return new Response(
      JSON.stringify({
        error: "Error en el Worker",
        mensaje: error.message,
        timestamp: new Date().toISOString()
      }, null, 2),
      {
        status: 500,
        headers: {
          "content-type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  }
}