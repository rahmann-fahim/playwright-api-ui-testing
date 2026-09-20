import {
  HttpInterceptorFn
} from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const token = localStorage.getItem('token');

  // Public authentication endpoints
  const publicUrls = [
    '/api/auth/register',
    '/api/auth/verify-otp',
    '/api/auth/login'
  ];

  const isPublicRequest = publicUrls.some(
    url => req.url.includes(url)
  );

  // Do not send JWT for public requests
  if (isPublicRequest) {
    return next(req);
  }

  // Send JWT for protected requests
  if (token) {

    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });

    return next(authReq);
  }

  return next(req);
};