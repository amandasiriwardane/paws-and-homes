const choreoApiUrl = window?.configs?.apiUrl;

export const API_BASE_URL = choreoApiUrl 
    ? `${choreoApiUrl}/api`         
    : 'http://localhost:3000/api';