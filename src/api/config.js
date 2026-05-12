const choreoApiUrl = window?.configs?.apiUrl;

export const API_BASE_URL = (choreoApiUrl && window.location.hostname !== 'localhost')
    ? `${choreoApiUrl}/api` 
    : 'http://localhost:3000/api';