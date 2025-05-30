import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		const token = environment.staticToken;

		const clonedRequest = req.clone({
			setHeaders: {
				Authorization: `Bearer ${token}`
			}
		});

		return next.handle(clonedRequest);
	}
}
