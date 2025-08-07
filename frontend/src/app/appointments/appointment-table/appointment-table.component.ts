import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../../core/appointment.service';

import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-appointment-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule, ReactiveFormsModule, MatButtonModule, MatCardModule
  ],
  templateUrl: './appointment-table.component.html',
  styleUrl: './appointment-table.component.css'
})
export class AppointmentTableComponent implements OnInit {
  appointments: any = [];
  displayedColumns: string[] = ['date', 'time', 'client', 'actions'];

  constructor(private appointmentService: AppointmentService) { }

  ngOnInit(): void {
    this.loadAppointments();
  }

  loadAppointments() {
    const userId = '54b4c442-95a1-4906-b6d7-9ac52ae92e24'; // ← puedes obtenerlo del AuthService, Firebase, etc.
    this.appointmentService.getUserAppointments(userId).subscribe({
      next: (data) => (this.appointments = data),
      error: (err) => console.error(err),
    });
  }

  deleteAppointment(id: string) {
    this.appointmentService.deleteAppointment(id).subscribe({
      next: () => this.loadAppointments(),
      error: (err) => console.error(err),
    });
  }
}
