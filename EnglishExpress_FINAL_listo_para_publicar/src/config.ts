// ============================================================
// CONFIGURACIÓN DE LA URL DEL SERVIDOR (BACKEND)
// ============================================================
// Cuando pruebas la app en tu computadora (npm run dev), esto
// se queda vacío ('') y funciona automáticamente.
//
// Cuando publiques la app en Play Store / App Store, DEBES
// cambiar el valor de abajo por la URL de tu servidor ya
// desplegado en internet (por ejemplo, en Render.com).
//
// Ejemplo: 'https://englishexpress-backend.onrender.com'
// ============================================================

export const API_BASE_URL: string = "https://englishexpress.onrender.com";

// Ayudante: arma la URL completa para cualquier llamada a /api/...
export function apiUrl(path: string): string {
  return `${API_BASE_URL}${path}`;
}
