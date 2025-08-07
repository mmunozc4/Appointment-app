import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../enviroments/enviroments';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private api = environment.apiUrl;

  constructor(private http: HttpClient) { }

  createProfessionalProfile(data: any) {
    return this.http.post(`${this.api}/users/profile`, data);
  }
}


