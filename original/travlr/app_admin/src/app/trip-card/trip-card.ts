import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TripData } from '../services/trip-data';
import { Trip } from '../models/trip';

@Component({ selector: 'app-trip-card', imports: [FormsModule], templateUrl: './trip-card.html', styleUrl: './trip-card.css' })
export class TripCard {
  @Input() trip!: Trip;
  @Output() tripUpdated = new EventEmitter<void>();
  @Output() tripDeleted = new EventEmitter<void>();
  editing = false; editTrip!: Trip; message = ''; errorMessage = '';
  private tripService = inject(TripData);
  startEdit(): void { this.editTrip = { ...this.trip }; this.message = ''; this.errorMessage = ''; this.editing = true; }
  cancelEdit(): void { this.editing = false; }
  save(): void {
    this.tripService.updateTrip(this.trip.code, this.editTrip).subscribe({
      next: (updatedTrip: Trip) => { Object.assign(this.trip, updatedTrip); this.editing = false; this.message = 'Trip updated successfully.'; this.errorMessage = ''; this.tripUpdated.emit(); },
      error: (err) => { console.error(err); this.errorMessage = err.error?.message || 'Unable to update the trip.'; this.message = ''; }
    });
  }
  deleteTrip(): void {
    if (!confirm(`Delete trip ${this.trip.name}?`)) return;
    this.tripService.deleteTrip(this.trip.code).subscribe({
      next: () => this.tripDeleted.emit(),
      error: (err) => { console.error(err); this.errorMessage = err.error?.message || 'Unable to delete the trip.'; this.message = ''; }
    });
  }
}
