import { HttpEvent, HttpEventType, HttpHandlerFn, HttpInterceptorFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { CacheService } from '../services/cache.service';
import { Observable, of, tap } from 'rxjs';
import { ApiResponse } from '../types/apiresponse';

export const httpCacheInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
  if (req.method !== 'GET') {
    return next(req);
  }
  const cacheSer = inject(CacheService);
  const cacheResponse = cacheSer.get(req.url);

  if (cacheResponse) {
    return of(new HttpResponse({
      status: 200,
      body: cacheResponse
    }));
  }
  else {
    return next(req).pipe(
      tap((event: HttpEvent<any>) => {
        if (event.type === HttpEventType.Response) {
          cacheSer.put(req.url, event.body);
        }
      }),
    );
  }

}

