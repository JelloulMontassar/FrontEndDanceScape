import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FacebookServiceService {

  constructor(private http: HttpClient) { }

  publishToFacebookPage(message: string, pageId: string, accessToken: string, image: string): Observable<any> {
    const url = `https://graph.facebook.com/v12.0/${pageId}/photos`;

    const formData: FormData = new FormData();
    formData.append('message', message);
    formData.append('access_token', accessToken);
    formData.append('url', image);

    return this.http.post(url, formData).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'Unknown error occurred';
        if (error.error instanceof ErrorEvent) {
          // Client-side error
          errorMessage = `Error: ${error.error.message}`;
        } else {
          // Server-side error
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        console.error(errorMessage);
        return throwError(errorMessage);
      })
    );
  }
}
