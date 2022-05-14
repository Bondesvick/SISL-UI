import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SpoolService {
url ="https://localhost:44328/api/SpoolRequest/SpoolRequest";
apiBaseUrl: string;

constructor(private http: HttpClient) {
  this.apiBaseUrl = environment.baseURI;
 }


  spoolSearch(data: any){
    return this.http.post(`${this.apiBaseUrl}/SpoolRequest/SpoolRequest`, data).pipe(
      map(
        response => response
      )
    )
  }
}


