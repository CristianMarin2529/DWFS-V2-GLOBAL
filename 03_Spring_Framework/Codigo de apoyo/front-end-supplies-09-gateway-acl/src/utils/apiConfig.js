// Configuración centralizada para las URLs del gateway
export const GATEWAY_URL = import.meta.env.VITE_GATEWAY_URL || 'http://localhost:8762';

// Rutas específicas del gateway ACL
export const API_ROUTES = {
  // Para peticiones de catálogo (productos)
  CATALOGUE: `${GATEWAY_URL}/supplies-catalogue`,

  // Para peticiones de órdenes
  ORDERS: `${GATEWAY_URL}/supplies-orders`
};

// Función helper para construir URLs completas para el ACL
export const buildApiUrl = (service) => {
  const baseUrl = API_ROUTES[service];
  if (!baseUrl) {
    throw new Error(`Unknown service: ${service}`);
  }

  return baseUrl;
};

// Función para realizar peticiones GET a través del ACL
export const aclGet = async (service, endpoint, queryParams = {}) => {
  const baseUrl = buildApiUrl(service);
  const url = `${baseUrl}${endpoint}`;

  const requestBody = {
    targetMethod: "GET",
    queryParams: queryParams
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody)
  });

  return response;
};

// Función para realizar peticiones POST a través del ACL
export const aclPost = async (service, endpoint, body) => {
  const baseUrl = buildApiUrl(service);
  const url = `${baseUrl}${endpoint}`;

  const requestBody = {
    targetMethod: "POST",
    body: body
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody)
  });

  return response;
};
