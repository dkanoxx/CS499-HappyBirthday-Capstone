import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TripData } from '../services/trip-data';
import { Trip } from '../models/trip';

@Component({ selector: 'app-trip-form', imports: [FormsModule], templateUrl: './trip-form.html', styleUrl: './trip-form.css' })
export class TripForm {
  @Output() tripAdded = new EventEmitter<void>();
  private tripService = inject(TripData);
  message = ''; errorMessage = '';
  trip: Trip = this.emptyTrip();
  addTrip(): void {
    this.tripService.addTrip(this.trip).subscribe({
      next: () => { this.message = 'Trip added successfully.'; this.errorMessage = ''; this.trip = this.emptyTrip(); this.tripAdded.emit(); },
      error: (err) => { console.error(err); this.errorMessage = err.error?.message || 'Unable to add the trip.'; this.message = ''; }
    });
  }
  private emptyTrip(): Trip { return { code: '', name: '', length: '', start: '', resort: '', perPerson: '', image: 'images/reef1.jpg', description: '' }; }
}
