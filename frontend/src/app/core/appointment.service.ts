import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../enviroments/enviroments';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private api = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getUserAppointments(userId?: string) {
    let params = new HttpParams();
    if (userId) {
      params = params.set('userId', userId);
    }

    return this.http.get(`${this.api}/appointment`, { params });
  }

  getAppointmentById(id: string) {
    return this.http.get(`${this.api}/appointment/${id}`);
  }

  createAppointment(data: any) {
    return this.http.post(`${this.api}/appointment`, data);
  }

  updateAppointment(id: string, data: any) {
    return this.http.patch(`${this.api}/appointment/${id}`, data);
  }

  deleteAppointment(id: string) {
    return this.http.delete(`${this.api}/appointment/${id}`);
  }
}
