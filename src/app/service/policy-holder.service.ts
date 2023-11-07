import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PolicyHolderService {
  private apiUrl = 'http://localhost:3001';

  constructor(private http: HttpClient) { }

  getPolicyholder(code: string): Observable<unknown> {
    return this.http.get(`${this.apiUrl}/api/policyholders`, { params: { code } });
  }
}
