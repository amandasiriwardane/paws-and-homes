const isLocal = window.location.hostname ==='localhost';

export const API_BASE_URL = isLocal
    ? 'http://localhost:3000/api'
    :'https://e8deb82d-b8c4-4eb5-8c75-4d01f7194495-dev.e1-eu-west-cdp.choreoapis.dev/paws-and-homes/paws-and-homes-backend/v1.0/api'