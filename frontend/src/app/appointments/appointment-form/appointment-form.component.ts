import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppointmentService } from '../../core/appointment.service';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-appointment-form',
  standalone: true,
  providers: [
    MatDatepickerModule,
    MatNativeDateModule
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule
  ],
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.css']
})
export class AppointmentFormComponent implements OnInit {
  appointmentForm!: FormGroup;
  isEdit = false;
  appointmentId!: string;

  constructor(
    private fb: FormBuilder,
    private appointmentService: AppointmentService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.appointmentForm = this.fb.group({
      clientName: [, Validators.required],
      date: [null, Validators.required],
      time: ['', [Validators.required, Validators.pattern(/^([0-1]\d|2[0-3]):([0-5]\d)$/)]],
      service: [, Validators.required],
      notes: ['']
    });

    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.isEdit = true;
        this.appointmentId = id;
        this.loadAppointment(id);
      }
    });
  }

  loadAppointment(id: string) {
    this.appointmentService.getAppointmentById(id).subscribe({
      next: (data: any) => this.appointmentForm.patchValue(data),
      error: (err) => console.error(err)
    });
  }

  onSubmit() {
    if (this.appointmentForm.invalid) return;

    const formData = this.appointmentForm.value;

    if (this.isEdit) {
      this.appointmentService.updateAppointment(this.appointmentId, formData).subscribe({
        next: () => this.router.navigate(['/appointments']),
        error: (err) => console.error(err)
      });
    } else {
      this.appointmentService.createAppointment(formData).subscribe({
        next: () => this.router.navigate(['/appointments']),
        error: (err) => console.error(err)
      });
    }
  }
}
