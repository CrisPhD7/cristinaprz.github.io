export const config = {
  matcher: ['/alumnos/', '/alumnos/:path*'],
};

export default function middleware(request) {
  const authorizationHeader = request.headers.get('authorization');

  if (authorizationHeader) {
    const basicAuth = authorizationHeader.split(' ')[1];
    const [user, password] = atob(basicAuth).split(':');

    if (user === 'GIB-USJ' && password === 'ExtraPr0jects2026') {
      // Allow the request to continue
      return; 
    }
  }

  // Require basic auth
  return new Response('Auth required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Secure Area"',
    },
  });
}
