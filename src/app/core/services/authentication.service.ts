import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IActionResponse } from '../models/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  authenticateURL = environment.baseURI + '/Authentication/AuthenticateUser';

  constructor(private http: HttpClient) { }

  tokenAuthorization(userId: string): Observable<IActionResponse> {
    const payload = {
      userId
    };

    return this.http.post<IActionResponse>(this.authenticateURL, payload);
  }

}
